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
// Build-time: Pages & Links automatisch mit AST ermitteln
// ============================================================================

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectRoot = process.cwd();
  const pagesDir = path.join(projectRoot, "pages");

  // 1. Alle Dateien finden
  const allFiles: string[] = [];
  const skip = [/\/api\//, /_app\./, /_document\./, /_error\./];
  const isPageFile = (f: string) =>
    /\.(tsx|ts|jsx|js)$/.test(f) && !skip.some((re) => re.test(f));

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "api") continue;
        walk(full);
      } else if (entry.isFile() && isPageFile(full)) {
        allFiles.push(full);
      }
    }
  }
  walk(pagesDir);

  // 2. Route aus Dateipfad ableiten
  function toRoute(fileAbs: string) {
    const rel = path.relative(pagesDir, fileAbs).replace(/\\/g, "/");
    const noExt = rel.replace(/\.(tsx|ts|jsx|js)$/, "");
    if (noExt === "index") return "/";
    return "/" + noExt.replace(/\/index$/, "");
  }

  const pagesOut: FlowNodeIn[] = [];
  const edgesOut: FlowEdgeIn[] = [];

  // 3. AST-Analyse jeder Datei
  for (const abs of allFiles) {
    const route = toRoute(abs);
    const relFile = path.relative(projectRoot, abs).replace(/\\/g, "/");
    pagesOut.push({ route, file: relFile });

    const content = fs.readFileSync(abs, "utf8");
    const sourceFile = ts.createSourceFile(abs, content, ts.ScriptTarget.ESNext, true);

    function checkNode(node: ts.Node) {
      // JSX <Link href="...">
      if (
        ts.isJsxSelfClosingElement(node) ||
        ts.isJsxOpeningElement(node)
      ) {
        const tagName = node.tagName.getText(sourceFile);
        if (tagName === "Link") {
          const hrefAttr = node.attributes.properties.find(
            (p) =>
              ts.isJsxAttribute(p) && p.name.text === "href" && p.initializer
          ) as ts.JsxAttribute | undefined;

          if (hrefAttr && ts.isStringLiteral(hrefAttr.initializer)) {
            const target = hrefAttr.initializer.text;
            if (target.startsWith("/")) edgesOut.push({ from: route, to: target });
          }
        }
      }

      // router.push("/foo") oder router.replace("/foo")
      if (ts.isCallExpression(node)) {
        const expr = node.expression.getText(sourceFile);
        if (
          (expr.endsWith(".push") || expr.endsWith(".replace")) &&
          node.arguments.length > 0
        ) {
          const arg = node.arguments[0];
          if (ts.isStringLiteral(arg)) {
            const target = arg.text;
            if (target.startsWith("/")) edgesOut.push({ from: route, to: target });
          }
        }
      }

      ts.forEachChild(node, checkNode);
    }

    ts.forEachChild(sourceFile, checkNode);
  }

  // 4. Deduplizieren
  const uniquePages = Array.from(
    new Map(pagesOut.map((p) => [p.route, p])).values()
  );

  const seenEdge = new Set<string>();
  const uniqueEdges = edgesOut.filter((e) => {
    const key = `${e.from}->${e.to}`;
    if (seenEdge.has(key)) return false;
    seenEdge.add(key);
    return true;
  });

  return {
    props: {
      pages: uniquePages,
      links: uniqueEdges,
    },
  };
};
