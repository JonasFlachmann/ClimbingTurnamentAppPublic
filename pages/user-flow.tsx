"use client";

import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { pageNodes, pageEdges } from "../lib/pageMap";

export default function UserFlowPage() {
  const nodes = pageNodes.map((n, i) => ({
    id: n.id,
    data: { label: `${n.label}\n(${n.path})` },
    position: { x: (i % 3) * 300, y: Math.floor(i / 3) * 200 },
    style: {
      padding: 10,
      borderRadius: 12,
      border: "2px solid #16a34a",
      backgroundColor: "#f0fdf4",
      fontWeight: "bold",
      textAlign: "center" as const,
      width: 220,
    },
  }));

  const edges = pageEdges.map((e) => ({
    id: `${e.source}-${e.target}`,
    source: e.source,
    target: e.target,
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
}

;(UserFlowPage as any).noLayout = true;
(UserFlowPage as any).title = "User Flow";
