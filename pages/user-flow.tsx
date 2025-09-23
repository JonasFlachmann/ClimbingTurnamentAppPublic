"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import ts from "typescript";
import "reactflow/dist/style.css";

// ReactFlow nur clientseitig laden
const ReactFlow = dynamic(() => import("reactflow").then(m => m.default), { ssr: false });
const Background = dynamic(() => import("reactflow").then(m => m.Background), { ssr: false });
const Controls = dynamic(() => import("reactflow").then(m => m.Controls), { ssr: false });
const MiniMap = dynamic(() => import("reactflow").then(m => m.MiniMap), { ssr: false });

type FlowNodeIn = { route: string; file: string };
type FlowEdgeIn = { from: string; to: string };

type Props = { pages: FlowNodeIn[]; links: FlowEdgeIn[] };

// ---------------- Darstellung ----------------
function gridPosition(index: number, perRow = 3, xGap = 300, yGap = 200) {
  return { x: (index % perRow) * xGap, y: Math.floor(index / perRow) * yGap };
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
(UserFlowPage as any).noLayout = true;
(UserFlowPage as any).title = "User Flow";

// ---------------- Build-time Analyse ----------------
export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectRoot = process.cwd();
  const pagesDir = path.join(projectRoot, "pages");

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

  function toRoute(abs: string) {
    const rel = path.relative(pagesDir, abs).replace(/\\/g, "/");
    const noExt = rel.replace(/\.(t|j)sx?$/i, "");
    if (noExt === "index") return "/";
    return "/" + noExt.replace(/\/index$/i, "");
  }

  const pagesOut: FlowNodeIn[] = [];
  const edgesOut: FlowEdgeIn[] = [];

  const evalString = (expr: ts.Expression | undefined): string | null => {
    if (!expr) return null;
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text;
    if (ts.isParenthesizedExpression(expr)) return evalString(expr.expression);
    return null;
  };

  const routesFromExpression = (expr: ts.Expression | undefined): string[] => {
    if (!expr) return [];
    const direct = evalString(expr);
    if (direct !== null) return [direct];
    if (ts.isObjectLiteralExpression(expr)) {
      const pathnameProp = expr.properties.find(
        p => ts.isPropertyAssignment(p) && (p.name as ts.Identifier).getText() === "pathname"
      ) as ts.PropertyAssignment | undefined;
      const val = pathnameProp?.initializer;
      const s = evalString(val as ts.Expression);
      return s ? [s] : [];
    }
    if (ts.isConditionalExpression(expr)) {
      return [...routesFromExpression(expr.whenTrue), ...routesFromExpression(expr.whenFalse)];
    }
    return [];
  };

  for (const abs of allFiles) {
    const route = toRoute(abs);
    const relFile = path.relative(projectRoot, abs).replace(/\\/g, "/");
    pagesOut.push({ route, file: relFile });

    const content = fs.readFileSync(abs, "utf8");
    const sf = ts.createSourceFile(abs, content, ts.ScriptTarget.ESNext, true);

    const visit = (node: ts.Node) => {
      // JSX mit href
      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        const attrs = node.attributes.properties;
        const hrefAttr = attrs.find(p => ts.isJsxAttribute(p) && p.name.text === "href") as ts.JsxAttribute | undefined;
        if (hrefAttr && hrefAttr.initializer && ts.isJsxExpression(hrefAttr.initializer)) {
          const expr = hrefAttr.initializer.expression ?? undefined;
          const routes = routesFromExpression(expr);
          for (const t of routes) if (t.startsWith("/")) edgesOut.push({ from: route, to: t });
        } else if (hrefAttr && ts.isStringLiteral(hrefAttr.initializer)) {
          edgesOut.push({ from: route, to: hrefAttr.initializer.text });
        }
      }

      // router.push("/x")
      if (ts.isCallExpression(node)) {
        if (ts.isPropertyAccessExpression(node.expression)) {
          const method = node.expression.name.getText(sf);
          if ((method === "push" || method === "replace") && node.arguments.length > 0) {
            const routes = routesFromExpression(node.arguments[0]);
            for (const t of routes) if (t.startsWith("/")) edgesOut.push({ from: route, to: t });
          }
        }
      }

      ts.forEachChild(node, visit);
    };
    ts.forEachChild(sf, visit);
  }

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