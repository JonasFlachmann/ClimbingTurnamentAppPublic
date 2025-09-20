import React from "react";

const userFlow = [
  { id: "home", label: "🏠 Home", next: ["login", "tournaments"] },
  { id: "login", label: "🔑 Login", next: ["dashboard"] },
  { id: "dashboard", label: "📊 Dashboard", next: ["tournaments", "profile"] },
  { id: "tournaments", label: "🏆 Turniere", next: ["tournament-detail"] },
  { id: "tournament-detail", label: "📄 Turnier-Detail", next: ["dashboard"] },
  { id: "profile", label: "👤 Profil", next: ["dashboard"] },
];

export default function UserFlowPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User-Flow Übersicht</h1>
      <p className="text-gray-600">
        Diese Seite zeigt den aktuellen Navigationsfluss der App.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userFlow.map((node) => (
          <div
            key={node.id}
            className="rounded-2xl shadow-md bg-white p-4 flex flex-col space-y-4"
          >
            <h2 className="text-lg font-semibold">{node.label}</h2>
            <div className="flex flex-wrap gap-2">
              {node.next.map((target) => {
                const targetNode = userFlow.find((n) => n.id === target);
                return (
                  <span
                    key={target}
                    className="px-3 py-1 bg-primary text-accent rounded-full text-sm font-medium"
                  >
                    → {targetNode?.label || target}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
