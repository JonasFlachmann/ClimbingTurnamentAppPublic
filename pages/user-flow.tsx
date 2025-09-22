"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import "reactflow/dist/style.css";

// ReactFlow nur clientseitig laden (keine SSR)
const ReactFlow = dynamic(() => import("reactflow").then(m => m.default), { ssr: false });
const Background = dynamic(() => import("reactflow").then(m => m.Background), { ssr: false });
const Controls = dynamic(() => import("reactflow").then(m => m.Controls), { ssr: false });
const MiniMap = dynamic(() => import("reactflow").then(m => m.MiniMap), { ssr: false });

// ---------- Types ----------
type FlowNodeIn = { route: string; file: string };
type FlowEdgeIn = { from: string; to: string };

type Props = {
  pages: FlowNodeIn[];
  links: FlowEdgeIn[];
};

// ---------- Helpers (Client) ----------
function gridPosition(index: number, perRow = 3, xGap = 300, yGap = 200) {
  return {
    x: (index % perRow) * xGap,
    y: Math.floor(index / perRow) * yGap,
  };
}

function prettyLabel(route: string, file: string) {
  // Anzeige wie gewohnt in zwei Zeilen: Titel (Datei) + (Route)
  const base = file.replace(/^pages\//, "");
  return `${base}\n(${route})`;
}

// ---------- Page Component ----------
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

// Kein globales Layout (Header/Footer) auf dieser Seite:
;(UserFlowPage as any).noLayout = true;
(UserFlowPage as any).title = "User Flow";

// ============================================================================
// Build-time: Alle Pages & Links auslesen (nur Inhalt, kein Styling geändert)
// ============================================================================

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectRoot = process.cwd();
  const pagesDir = path.join(projectRoot, "pages");

  // 1) Alle Page-Dateien einsammeln (ohne /api und ohne _app/_document/_error)
  const allFiles: string[] = [];
  const isPageFile = (f: string) =>
    /\.(tsx|ts|jsx|js)$/.test(f) &&
    !/[\\/]api[\\/]/.test(f) &&
    !/[\\/]_app\.(tsx|ts|jsx|js)$/.test(f) &&
    !/[\\/]_document\.(tsx|ts|jsx|js)$/.test(f) &&
    !/[\\/]_error\.(tsx|ts|jsx|js)$/.test(f);

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        // api ausschließen
        if (path.basename(full) === "api") continue;
        walk(full);
      } else if (e.isFile() && isPageFile(full)) {
        allFiles.push(full);
      }
    }
  }
  walk(pagesDir);

  // 2) Dateipfad -> Route (Next.js pages-Konvention)
  function toRoute(fileAbsPath: string) {
    const rel = path.relative(pagesDir, fileAbsPath).replace(/\\/g, "/"); // windows-safe
    const noExt = rel.replace(/\.(tsx|ts|jsx|js)$/, "");
    if (noExt === "index") return "/";
    return "/" + noExt.replace(/\/index$/, ""); // /foo/index -> /foo
  }

  // 3) Links aus dem Seiteninhalt parsen
  //    - <Link href="/foo">  oder  <Link href={"/foo"}>
  //    - router.push("/foo") / router.replace("/foo")
  const linkHrefRe = /<Link\s+[^>]*href\s*=\s*(?:\{["'`]([^"'`]+)["'`]\}|\s*["'`]([^"'`]+)["'`])/g;
  const routerNavRe = /router\.(?:push|replace)\(\s*["'`]([^"'`]+)["'`]/g;

  const pagesOut: FlowNodeIn[] = [];
  const edgesOut: FlowEdgeIn[] = [];

  for (const abs of allFiles) {
    const route = toRoute(abs);
    const relFile = path.relative(projectRoot, abs).replace(/\\/g, "/"); // z. B. pages/login.tsx
    pagesOut.push({ route, file: relFile });

    let content = "";
    try {
      content = fs.readFileSync(abs, "utf8");
    } catch {
      // wenn Datei nicht lesbar ist, einfach überspringen
      continue;
    }

    // Links via <Link href="...">
    for (const m of content.matchAll(linkHrefRe)) {
      const target = (m[1] || m[2] || "").trim();
      if (target.startsWith("/")) edgesOut.push({ from: route, to: target });
    }

    // Links via router.push/replace("...")
    for (const m of content.matchAll(routerNavRe)) {
      const target = (m[1] || "").trim();
      if (target.startsWith("/")) edgesOut.push({ from: route, to: target });
    }
  }

  // 4) Deduplizieren
  const seenNode = new Set<string>();
  const uniquePages = pagesOut.filter((p) => {
    if (seenNode.has(p.route)) return false;
    seenNode.add(p.route);
    return true;
  });

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