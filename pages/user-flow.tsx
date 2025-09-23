// pages/user-flow.tsx
import { GetStaticProps } from "next";
import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

interface PageFlowProps {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
}

export const getStaticProps: GetStaticProps<PageFlowProps> = async () => {
  const pagesDir = path.join(process.cwd(), "pages");
  const files = fs
    .readdirSync(pagesDir)
    .filter(f => f.endsWith(".tsx") && !f.startsWith("_"));

  const nodes: { id: string; label: string }[] = [];
  const edges: { from: string; to: string }[] = [];

  function routesFromExpression(expr: ts.Expression | undefined): string[] {
    if (!expr) return [];
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
      return [expr.text];
    }
    return [];
  }

  for (const file of files) {
    const route =
      "/" +
      file
        .replace(/\.tsx$/, "")
        .replace("index", "")
        .replace(/\/$/, "");

    nodes.push({ id: route || "/", label: `${file}\n(${route || "/"})` });

    const filePath = path.join(pagesDir, file);
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(filePath, "utf8"),
      ts.ScriptTarget.ES2015,
      true
    );

    const edgesOut: { from: string; to: string }[] = [];

    function visit(node: ts.Node) {
      // Suche nach href in JSX
      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        const attrs = node.attributes.properties;
        const hrefAttr = attrs.find(
          p => ts.isJsxAttribute(p) && p.name.text === "href"
        ) as ts.JsxAttribute | undefined;

        if (hrefAttr && hrefAttr.initializer) {
          // Fall: href={...}
          if (ts.isJsxExpression(hrefAttr.initializer)) {
            const expr = hrefAttr.initializer.expression ?? undefined;
            const routes = routesFromExpression(expr);
            for (const t of routes) {
              if (t.startsWith("/")) edgesOut.push({ from: route, to: t });
            }
          }
          // Fall: href="..."
          else if (
            ts.isStringLiteral(hrefAttr.initializer) ||
            ts.isNoSubstitutionTemplateLiteral(hrefAttr.initializer)
          ) {
            edgesOut.push({ from: route, to: hrefAttr.initializer.text });
          }
        }
      }
      ts.forEachChild(node, visit);
    }

    ts.forEachChild(source, visit);
    edges.push(...edgesOut);
  }

  return { props: { nodes, edges } };
};

const UserFlow: React.FC<PageFlowProps> = ({ nodes, edges }) => {
  const rfNodes = nodes.map((n, i) => ({
    id: n.id,
    data: { label: n.label },
    position: { x: (i % 4) * 300, y: Math.floor(i / 4) * 200 },
    style: {
      padding: 10,
      borderRadius: 8,
      border: "2px solid #16a34a",
      backgroundColor: "#f0fdf4",
      fontWeight: "bold",
      textAlign: "center" as const,
      width: 220,
    },
  }));

  const rfEdges = edges.map((e, i) => ({
    id: `e${i}`,
    source: e.from,
    target: e.to,
    animated: true,
    style: { stroke: "#16a34a" },
  }));

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1 className="text-2xl font-bold p-4">📊 User-Flow Übersicht</h1>
      <ReactFlow nodes={rfNodes} edges={rfEdges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default UserFlow;