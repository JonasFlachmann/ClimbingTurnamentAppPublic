import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

// Definition der App-Seiten und Übergänge
const pages = [
  { id: "home", label: "🏠 Home", next: ["login", "tournaments"] },
  { id: "login", label: "🔑 Login", next: ["dashboard"] },
  { id: "dashboard", label: "📊 Dashboard", next: ["tournaments", "profile"] },
  { id: "tournaments", label: "🏆 Turniere", next: ["tournament-detail"] },
  { id: "tournament-detail", label: "📄 Turnier-Detail", next: ["dashboard"] },
  { id: "profile", label: "👤 Profil", next: ["dashboard"] },
];

// Knoten für react-flow
const nodes = pages.map((page, index) => ({
  id: page.id,
  data: { label: page.label },
  position: { x: (index % 3) * 250, y: Math.floor(index / 3) * 150 },
  style: {
    padding: 10,
    borderRadius: 12,
    border: "2px solid #4caf50",
    backgroundColor: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 180,
  },
}));

// Kanten dynamisch aus "next"
const edges = pages.flatMap((page) =>
  page.next.map((target) => ({
    id: `${page.id}-${target}`,
    source: page.id,
    target,
    animated: true,
    style: { stroke: "#4caf50" },
  }))
);

export default function UserFlowPage() {
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
