// lib/navigation.ts
import type React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EventIcon from "@mui/icons-material/Event";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export type NavSurface = "bottom" | "drawer";
export type NavSection = "primary" | "secondary";

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ElementType;     // wird in der BottomNav genutzt
  surfaces?: NavSurface[];      // wo soll der Eintrag erscheinen?
  section?: NavSection;         // für die Drawer-Gruppierung
};

/**
 * EINZIGE Quelle für Navigation:
 * - Wir spiegeln exakt deine aktuelle Struktur wider:
 *   Drawer (oben): Home, Turnier erstellen, Boulder hinzufügen
 *   Drawer (unten): Ergebnisse, Ranking, Karte
 *   BottomNav: Home, Karte, Turniere (/tournament-overview), Ranking
 */
export const NAV_ITEMS: NavItem[] = [
  // Bottom + Drawer (oben)
  { label: "Home", href: "/home", icon: HomeIcon, surfaces: ["bottom", "drawer"], section: "primary" },
  { label: "Turnier erstellen", href: "/tournament-create", surfaces: ["drawer"], section: "primary" },
  { label: "Boulder hinzufügen", href: "/boulder-add", surfaces: ["drawer"], section: "primary" },

  // Bottom only
  { label: "Karte", href: "/map", icon: MapIcon, surfaces: ["bottom"], section: "secondary" },
  { label: "Turniere", href: "/tournament-overview", icon: EventIcon, surfaces: ["bottom"], section: "secondary" },
  { label: "Ranking", href: "/ranking", icon: LeaderboardIcon, surfaces: ["bottom"], section: "secondary" },

  // Drawer (unten)
  { label: "Ergebnisse", href: "/results", surfaces: ["drawer"], section: "secondary" },
  { label: "Ranking", href: "/ranking", surfaces: ["drawer"], section: "secondary" },
  { label: "Karte", href: "/map", surfaces: ["drawer"], section: "secondary" },
];

// Hilfs-Selectoren
export const BOTTOM_NAV = NAV_ITEMS.filter(i => i.surfaces?.includes("bottom"));
export const DRAWER_PRIMARY = NAV_ITEMS.filter(i => i.surfaces?.includes("drawer") && i.section === "primary");
export const DRAWER_SECONDARY = NAV_ITEMS.filter(i => i.surfaces?.includes("drawer") && i.section === "secondary");
