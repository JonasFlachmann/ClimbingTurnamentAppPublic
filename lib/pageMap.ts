// lib/pageMap.ts
// Übersicht aller Pages in der App für das User-Flow-Diagramm

export const pageNodes = [
  { id: "index", label: "Startseite", path: "/" },
  { id: "login", label: "Login", path: "/login" },
  { id: "registration-process", label: "Registrierung (mehrstufig)", path: "/registration-process" },
  { id: "agb", label: "AGB", path: "/agb" },
  { id: "boulder-add", label: "Boulder hinzufügen", path: "/boulder-add" },
  { id: "tournament-fill", label: "Turnier ausfüllen", path: "/tournament-fill" },
  { id: "user-flow", label: "User-Flow Übersicht", path: "/user-flow" },
];

export const pageEdges = [
  // Startseite → Login & Registrierung
  { source: "index", target: "login" },
  { source: "index", target: "registration-process" },

  // Registrierung → AGB
  { source: "registration-process", target: "agb" },

  // Boulder → Turnier
  { source: "boulder-add", target: "tournament-fill" },

  // Übersicht
  { source: "index", target: "user-flow" },
];
