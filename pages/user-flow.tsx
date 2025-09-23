// pages/user-flow.tsx
import type { GetStaticProps, NextPage } from "next";
import React from "react";
import dynamic from "next/dynamic";
import "reactflow/dist/style.css";
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

// ReactFlow nur clientseitig laden (verhindert SSR-Fehler)
const ReactFlow = dynamic(() => import("reactflow").then(m => m.default), { ssr: false });
const Background = dynamic(() => import("reactflow").then(m => m.Background), { ssr: false });
const Controls = dynamic(() => import("reactflow").then(m => m.Controls), { ssr: false });
const MiniMap = dynamic(() => import("reactflow").then(m => m.MiniMap), { ssr: false });

type NodeIn = { route: string; file: string };
type EdgeIn = { from: string; to: string };

interface Props {
  pages: NodeIn[];
  links: EdgeIn[];
}

/* ----------------------------- Build-Helpers ------------------------------ */

const isPageFile = (f: string) =>
  /\.(t|j)sx?$/i.test(f) &&
  !/[\\/]api[\\/]/i.test(f) &&
  !/[\\/]_app\.(t|j)sx?$/i.test(f) &&
  !/[\\/]_document\.(t|j)sx?$/i.test(f) &&
  !/[\\/]_error\.(t|j)sx?$/i.test(f);

function walk(dir: string, out: string[]) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.toLowerCase() === "api") continue;
      walk(full, out);
    } else if (e.isFile() && isPageFile(full)) {
      out.push(full);
    }
  }
}

function toRoute(pagesDir: string, abs: string) {
  const rel = path.relative(pagesDir, abs).replace(/\\/g, "/");
  let route = "/" + rel.replace(/\.(t|j)sx?$/i, "");
  route = route.replace(/\/index$/i, ""); // /foo/index -> /foo
  route = route.replace(/\/+/g, "/");
  if (route === "") route = "/";
  return route;
}

function normalizeRoute(route: string): string {
  if (!route) return "/";
  const pure = route.split("#")[0].split("?")[0] || "/";
  const trimmed = pure !== "/" ? pure.replace(/\/+$/, "") : "/";
  return (trimmed.replace(/\/index$/i, "") || "/") as string;
}

// konservative String-Auswertung
function evalString(expr: ts.Expression | undefined): string | null {
  if (!expr) return null;
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text;
  if (ts.isParenthesizedExpression(expr)) return evalString(expr.expression);
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const l = evalString(expr.left);
    const r = evalString(expr.right);
    if (l !== null && r !== null) return l + r;
  }
  return null;
}

function routesFromExpression(expr: ts.Expression | undefined): string[] {
  if (!expr) return [];
  const s = evalString(expr);
  if (s !== null) return [s];

  // href={{ pathname: "/x", ... }}
  if (ts.isObjectLiteralExpression(expr)) {
    const pathnameProp = expr.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText() === "pathname"
    ) as ts.PropertyAssignment | undefined;
    const val = pathnameProp?.initializer as ts.Expression | undefined;
    const v = evalString(val);
    return v ? [v] : [];
  }

  // bedingt ? :
  if (ts.isConditionalExpression(expr)) {
    return [...routesFromExpression(expr.whenTrue), ...routesFromExpression(expr.whenFalse)];
  }

  return [];
}

/* --------------------------- Page Component (UI) --------------------------- */

const UserFlowPage: NextPage<Props> = ({ pages, links }) => {
  const nodes = pages.map((p, i) => ({
    id: p.route,
    data: { label: `${p.file.replace(/^pages\//, "")}\n(${p.route})` },
    position: { x: (i % 3) * 300, y: Math.floor(i / 3) * 200 },
    style: {
      padding: 10,
      borderRadius: 12,
      border: "2px solid #16a34a",
      backgroundColor: "#f0fdf4",
      fontWeight: "bold",
      textAlign: "center" as const,
      width: 220,
      whiteSpace: "pre-line" as const,
    },
  }));

  const edges = links.map((e, idx) => ({
    id: `${e.from}__${e.to}__${idx}`,
    source: e.from,
    target: e.to,
    animated: true,
    style: { stroke: "#16a34a" },
  }));

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1 className="text-2xl font-bold p-4">User-Flow Übersicht</h1>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

// kein globales Layout auf dieser Seite
;(UserFlowPage as any).noLayout = true;
(UserFlowPage as any).title = "User Flow";

export default UserFlowPage;

/* --------------------------- Data @ Build-Time ---------------------------- */

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectRoot = process.cwd();
  const pagesDir = path.join(projectRoot, "pages");

  // 1) Alle Page-Dateien einsammeln
  const allFiles: string[] = [];
  walk(pagesDir, allFiles);

  // 2) Liste der existierenden Pages
  const pages: NodeIn[] = allFiles.map((abs) => ({
    route: toRoute(pagesDir, abs),
    file: path.relative(projectRoot, abs).replace(/\\/g, "/"),
  }));

  const pageSet = new Set(pages.map((p) => p.route));

  // 3) Roh-Kanten per AST
  const rawEdges: EdgeIn[] = [];

  for (const abs of allFiles) {
    const fromRoute = toRoute(pagesDir, abs);
    const src = fs.readFileSync(abs, "utf8");
    const sf = ts.createSourceFile(abs, src, ts.ScriptTarget.ESNext, true);

    const visit = (node: ts.Node) => {
      // (a) JSX mit href=... (egal welches Tag)
      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        const attrs = node.attributes.properties;
        const hrefAttr = attrs.find(
          (p) => ts.isJsxAttribute(p) && p.name.text === "href"
        ) as ts.JsxAttribute | undefined;

        if (hrefAttr && hrefAttr.initializer) {
          if (ts.isJsxExpression(hrefAttr.initializer)) {
            const expr = hrefAttr.initializer.expression ?? undefined;
            const routes = routesFromExpression(expr).map(normalizeRoute);
            for (const r of routes) rawEdges.push({ from: fromRoute, to: r });
          } else if (
            ts.isStringLiteral(hrefAttr.initializer) ||
            ts.isNoSubstitutionTemplateLiteral(hrefAttr.initializer)
          ) {
            rawEdges.push({
              from: fromRoute,
              to: normalizeRoute(hrefAttr.initializer.text),
            });
          }
        }
      }

      // (b) router.push/replace(...)
      if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
        const method = node.expression.name.getText(sf);
        if ((method === "push" || method === "replace") && node.arguments.length > 0) {
          const targets = routesFromExpression(node.arguments[0]).map(normalizeRoute);
          for (const t of targets) rawEdges.push({ from: fromRoute, to: t });
        }
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(sf, visit);
  }

  // 4) Filter: nur Ziele, die Pages sind + keine Selbstkanten + keine /user-flow
  const filtered = rawEdges.filter(
    (e) => pageSet.has(e.to) && e.from !== e.to && e.to !== "/user-flow"
  );

  // 5) Globale Navigationsziele erkennen & ausblenden (z. B. Home/Karte/Turniere)
  //    Heuristik: Ziel wird von >= 40% aller Pages verlinkt => globaler Nav-Link
  const sourceCountPerTarget = new Map<string, Set<string>>();
  for (const e of filtered) {
    if (!sourceCountPerTarget.has(e.to)) sourceCountPerTarget.set(e.to, new Set());
    sourceCountPerTarget.get(e.to)!.add(e.from);
  }
  const threshold = Math.max(1, Math.floor(pages.length * 0.4));
  const globalTargets = new Set(
    Array.from(sourceCountPerTarget.entries())
      .filter(([_, sources]) => sources.size >= threshold)
      .map(([t]) => t)
  );

  const edgesNoGlobal = filtered.filter((e) => !globalTargets.has(e.to));

  // 6) Deduplizieren
  const seen = new Set<string>();
  const edges = edgesNoGlobal.filter((e) => {
    const key = `${e.from}->${e.to}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 7) Seiten deduplizieren (Sicherheit)
  const uniquePages = Array.from(new Map(pages.map((p) => [p.route, p])).values());

  return { props: { pages: uniquePages, links: edges } };
};