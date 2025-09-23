import React from "react";
import dynamic from "next/dynamic";
import { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

// React Flow nur Client-seitig laden
const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });

export default function UserFlowPage() {
  const nodes = [
    // Registrierung
    { id: "index", data: { label: "index.tsx (/)" }, position: { x: 0, y: 0 } },
    { id: "registration", data: { label: "registration-process.tsx (/registration-process)" }, position: { x: 0, y: 150 } },
    { id: "agb", data: { label: "agb.tsx (/agb)" }, position: { x: -200, y: 300 } },
    { id: "home", data: { label: "home.tsx (/home)" }, position: { x: 200, y: 300 } },

    // Turniererstellung
    { id: "tournament-create", data: { label: "tournament-create.tsx (/tournament-create)" }, position: { x: 200, y: 450 } },
    { id: "tournament-define", data: { label: "tournament-define.tsx (/tournament-define)" }, position: { x: 200, y: 600 } },
    { id: "tournament-fill", data: { label: "tournament-fill.tsx (/tournament-fill)" }, position: { x: 200, y: 750 } },
    { id: "boulder-add", data: { label: "boulder-add.tsx (/boulder-add)" }, position: { x: 0, y: 900 } },
    { id: "tournament", data: { label: "tournament.tsx (/tournament)" }, position: { x: 200, y: 900 } },

    // Turnierzugang
    { id: "tournament-overview", data: { label: "tournament-overview.tsx (/tournament-overview)" }, position: { x: 400, y: 450 } },

    // Sonstige Seiten (noch nicht eingebunden)
    { id: "map", data: { label: "map.tsx (/map)" }, position: { x: 600, y: 150 } },
    { id: "ranking", data: { label: "ranking.tsx (/ranking)" }, position: { x: 600, y: 300 } },
    { id: "results", data: { label: "results.tsx (/results)" }, position: { x: 600, y: 450 } },
    { id: "user-flow", data: { label: "user-flow.tsx (/user-flow)" }, position: { x: 600, y: 600 } },
  ];

  const edges = [
    // Registrierung
    { id: "e1", source: "index", target: "registration" },
    { id: "e2", source: "registration", target: "agb" },
    { id: "e3", source: "registration", target: "home" },

    // Turniererstellung
    { id: "e4", source: "home", target: "tournament-create" },
    { id: "e5", source: "tournament-create", target: "tournament-define" },
    { id: "e6", source: "tournament-define", target: "tournament-fill" },
    { id: "e7", source: "tournament-fill", target: "boulder-add" },
    { id: "e8", source: "boulder-add", target: "tournament-fill" },
    { id: "e9", source: "tournament-fill", target: "tournament" },

    // Turnierzugang
    { id: "e10", source: "home", target: "tournament-overview" },
    { id: "e11", source: "tournament-overview", target: "tournament" },
  ];

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