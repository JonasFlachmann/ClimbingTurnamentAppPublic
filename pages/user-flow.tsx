"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import ts from "typescript";
import "reactflow/dist/style.css";

// ReactFlow nur clientseitig laden (kein SSR)
const ReactFlow = dynamic(() => import("reactflow").then(m => m.default), { ssr: false });
const Background = dynamic(() => import("reactflow").then(m => m.Background), { ssr: false });
const Controls = dynamic(() => import("reactflow").then(m => m.Controls), { ssr: false });
const MiniMap = dynamic(() => import("reactflow").then(m => m.MiniMap), { ssr: false });

type FlowNodeIn = { route: string; file: string };
type FlowEdgeIn = { from: string; to: string };

type Props = {
  pages: FlowNodeIn[];
  links: FlowEdgeIn[];
};

// ---------------- Client: Darstellung unverändert ----------------

function gridPosition(index: number, perRow = 3, xGap = 300, yGap = 200) {
  return {
    x: (index % perRow) * xGap,
    y: Math.floor(index / perRow) * yGap,
  };
}
function prettyLabel(route: string, file: string) {
  const base = file.replace(/^pages\//, "");
  return `${base}\n(${route})`;
}

export default function UserFlowPage({ pages, links }: Props) {
  const nodes = useMemo(
    () =>
      pages.map((p, i) => ({
        id: p.route,
        data: { label: prettyLabel(p.route, p.file) },
        position: gridPosition(i),
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
      })),
    [pages]
  );

  const edges = useMemo(
    () =>
      links.map((e, idx) => ({
        id: `${e.from}__${e.to}__${idx}`,
        source: e.from,
        target: e.to,
        animated: true,
        style: { stroke: "#16a34a" },
      })),
    [links]
  );

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
}

;(UserFlowPage as any).noLayout = true;
(UserFlowPage as any).title = "User Flow";

// ============================================================================
// Build-time: Alle Pages & Links robust per TypeScript-AST ermitteln
// ============================================================================

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectRoot = process.cwd();
  const pagesDir = path.join(projectRoot, "pages");

  // ---- 1) Dateien einsammeln (alle Pages außer /api, _app, _document, _error)
  const allFiles: string[] = [];
  const skip = [/[/\\]api[/\\]/i, /_app\.(t|j)sx?$/i, /_document\.(t|j)sx?$/i, /_error\.(t|j)sx?$/i];
  const isPageFile = (f: string) => /\.(t|j)sx?$/i.test(f) && !skip.some(re => re.test(f));

  function walk(dir: string) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name.toLowerCase() === "api") continue;
        walk(full);
      } else if (e.isFile() && isPageFile(full)) {
        allFiles.push(full);
      }
    }
  }
  walk(pagesDir);

  // ---- 2) Dateipfad -> Route
  function toRoute(abs: string) {
    const rel = path.relative(pagesDir, abs).replace(/\\/g, "/");
    const noExt = rel.replace(/\.(t|j)sx?$/i, "");
    if (noExt === "index") return "/";
    return "/" + noExt.replace(/\/index$/i, "");
  }

  // ---- 3) AST-Utilities (verlässliche Link-Erkennung)
  const pagesOut: FlowNodeIn[] = [];
  const edgesOut: FlowEdgeIn[] = [];

  const addEdgesFromRoutes = (from: string, targets: string[]) => {
    for (const t of targets) if (t && t.startsWith("/")) edgesOut.push({ from, to: t });
  };

  // statische Stringauswertung für einfache Ausdrücke
  const evalString = (expr: ts.Expression | undefined): string | null => {
    if (!expr) return null;
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text;
    if (ts.isParenthesizedExpression(expr)) return evalString(expr.expression);
    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const l = evalString(expr.left);
      const r = evalString(expr.right);
      return l !== null && r !== null ? l + r : null;
    }
    return null;
  };

  const routesFromExpression = (expr: ts.Expression | undefined): string[] => {
    if (!expr) return [];
    // direkte Strings / Backticks ohne Platzhalter
    const direct = evalString(expr);
    if (direct !== null) return [direct];

    // href={{ pathname: "/foo", ... }}
    if (ts.isObjectLiteralExpression(expr)) {
      const pathnameProp = expr.properties.find(
        (p) => ts.isPropertyAssignment(p) && (p.name as ts.Identifier).getText() === "pathname"
      ) as ts.PropertyAssignment | undefined;
      const val = pathnameProp?.initializer;
      const s = evalString(val as ts.Expression);
      return s ? [s] : [];
    }

    // bedingt: cond ? "/a" : "/b"
    if (ts.isConditionalExpression(expr)) {
      return [
        ...routesFromExpression(expr.whenTrue),
        ...routesFromExpression(expr.whenFalse),
      ];
    }

    // Template-Expressions mit Platzhaltern können nicht sicher statisch ausgewertet werden
    // -> bewusst ignorieren (keine falschen Kanten erzeugen)
    return [];
  };

  for (const abs of allFiles) {
    const route = toRoute(abs);
    const relFile = path.relative(projectRoot, abs).replace(/\\/g, "/");
    pagesOut.push({ route, file: relFile });

    const content = fs.readFileSync(abs, "utf8");
    const sf = ts.createSourceFile(abs, content, ts.ScriptTarget.ESNext, true);

    const visit = (node: ts.Node) => {
      // (a) JSX: jedes Element mit href="..." oder href={...}
      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        const attrs = node.attributes.properties;
        const hrefAttr = attrs.find(
          (p) => ts.isJsxAttribute(p) && p.name.text === "href"
        ) as ts.JsxAttribute | undefined;

        if (hrefAttr) {
          // <Tag href="...">  oder  <Tag href={"..."}>  oder  <Tag href={{ pathname:"/x" }}>
          if (
            hrefAttr.initializer &&
            (ts.isStringLiteral(hrefAttr.initializer) || ts.isJsxExpression(hrefAttr.initializer))
          ) {
            const expr = ts.isJsxExpression(hrefAttr.initializer)
              ? hrefAttr.initializer.expression ?? undefined
              : hrefAttr.initializer;
            const routes = routesFromExpression(expr);
            addEdgesFromRoutes(route, routes);
          }
        }
      }

      // (b) router.push("/x") / router.replace({ pathname: "/x" })
      if (ts.isCallExpression(node)) {
        if (ts.isPropertyAccessExpression(node.expression)) {
          const method = node.expression.name.getText(sf);
          if ((method === "push" || method === "replace") && node.arguments.length > 0) {
            const arg = node.arguments[0];
            const routes = routesFromExpression(arg);
            addEdgesFromRoutes(route, routes);
          }
        }
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(sf, visit);
  }

  // ---- 4) Deduplizieren
  const uniquePages = Array.from(new Map(pagesOut.map(p => [p.route, p])).values());
  const seen = new Set<string>();
  const uniqueEdges = edgesOut.filter(e => {
    const k = `${e.from}->${e.to}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  return { props: { pages: uniquePages, links: uniqueEdges } };
};