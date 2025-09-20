// Zentrale Projekt-Übersicht für ALLEZ-CLIMBING Pages.
// -> "allPages": alle existierenden Routen (ohne _app.tsx).
// -> "flow": Verbindungen zwischen Seiten (kannst du hier leicht anpassen/erweitern).

export const allPages = [
  "index",
  "home",
  "map",
  "ranking",
  "register",
  "registration-process",
  "results",
  "tournament-create",
  "tournament-define",
  "tournament-fill",
  "tournament-overview",
  "tournament",
  "boulder-add",
  "user-flow"
] as const;

export type PageId = typeof allPages[number];

export type FlowEdge = {
  source: PageId;
  target: PageId;
  label?: string;
};

// Erste, sinnvolle Standard-Verknüpfungen (entsprechend deiner App):
export const flow: FlowEdge[] = [
  // Einstieg
  { source: "index", target: "register", label: "Start → Registrieren" },
  { source: "register", target: "registration-process", label: "Weiter" },
  { source: "registration-process", target: "home", label: "Fertig → Home" },

  // Hauptnavigation ab Home
  { source: "home", target: "tournament-overview", label: "Zu Turnieren" },
  { source: "home", target: "map", label: "Zu Karte" },
  { source: "home", target: "ranking", label: "Zu Ranking" },
  { source: "home", target: "results", label: "Zu Ergebnisse" },
  { source: "home", target: "tournament-create", label: "Turnier anlegen" },

  // Turnier anlegen – mehrstufig
  { source: "tournament-create", target: "tournament-define", label: "Schritt 1 → 2" },
  { source: "tournament-define", target: "tournament-fill", label: "Schritt 2 → 3" },
  { source: "tournament-fill", target: "tournament-overview", label: "Zur Übersicht" },

  // Übersicht → Detail
  { source: "tournament-overview", target: "tournament", label: "Details" },

  // Boulder-Workflow (falls separat)
  { source: "home", target: "boulder-add", label: "Boulder hinzufügen" },

  // Dev-Tool
  { source: "home", target: "user-flow", label: "Flow-Übersicht" }
];
