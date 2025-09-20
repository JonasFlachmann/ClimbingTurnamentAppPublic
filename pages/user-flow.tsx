"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { Node, Edge } from "reactflow";
import { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

import { allPages, flow, type PageId } from "../lib/pageMap";

const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });

function prettyLabel(id: string) {
  if (id === "index") return "🏁 Index (Start)";
  return id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function UserFlowPage() {
  const router = useRouter();

  const { nodes, edges, unusedPages } = useMemo(() => {
    const used = new Set<PageId>();
    flow.forEach((e) => {
      used.add(e.source);
      used.add(e.target);
    });

    const colWidth = 240;
    const rowHeight = 160;
    const cols = 4;

    const nodes: Node[] = allPages.map((id, index) => {
      const isUsed = used.has(id);
      const x = (index % cols) * colWidth;
      const y = Math.floor(index / cols) * rowHeight;

      return {
        id,
        data: { label: prettyLabel(id) },
        position: { x, y },
        style: {
          padding: 10,
          borderRadius: 12,
          border: isUsed ? "2px solid #16a34a" : "2px solid #ef4444",
          backgroundColor: "white",
          fontWeight: "bold",
          textAlign: "center" as const,
          width: 200
        }
      };
    });

    const edges: Edge[] = flow.map((e, i) => ({
      id: `${e.source}-${e.target}-${i}`,
      source: e.source,
      target: e.target,
      label: e.label,
      animated: true,
      style: { stroke: "#16a34a" }
    }));

    const unusedPages = (allPages as readonly string[]).filter((p) => !used.has(p as PageId));

    return { nodes, edges, unusedPages };
  }, []);

  const onNodeClick = (_: unknown, node: Node) => {
    const id = node.id;
    const href = id === "index" ? "/" : `/${id}`;
    router.push(href);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="p-4">
        <h1 className="text-2xl font-bold">User-Flow & Seiten-Übersicht</h1>
        <p className="text-gray-600 mt-1">
          <span className="inline-block w-3 h-3 rounded-full border-2 border-green-600 mr-1 align-middle" /> im Flow&nbsp;
          <span className="inline-block w-3 h-3 rounded-full border-2 border-red-500 mx-2 align-middle" /> (noch) nicht verknüpft
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 pb-4 flex-1">
        {/* Diagramm */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden border h-[80vh]">
          <div style={{ width: "100%", height: "100%" }}>
            <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={onNodeClick}>
              <Background />
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        {/* Seitenliste & Status */}
        <aside className="lg:col-span-1 rounded-xl border p-4 space-y-4 bg-white h-[80vh] overflow-y-auto">
          <div>
            <h2 className="font-semibold mb-2">Statistik</h2>
            <ul className="text-sm space-y-1">
              <li>Gesamt: {allPages.length} Seiten</li>
              <li>Im Flow verknüpft: {allPages.length - unusedPages.length}</li>
              <li>Nicht verknüpft: {unusedPages.length}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Nicht verknüpfte Seiten</h2>
            {unusedPages.length === 0 ? (
              <p className="text-sm text-gray-600">Alle Seiten sind im Flow enthalten 🎉</p>
            ) : (
              <ul className="text-sm list-disc ml-5 space-y-1">
                {unusedPages.map((p) => (
                  <li key={p}>{prettyLabel(p)}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Alle Seiten</h2>
            <ul className="text-sm list-disc ml-5 space-y-1">
              {(allPages as readonly string[]).map((p) => (
                <li key={p}>{prettyLabel(p)}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
