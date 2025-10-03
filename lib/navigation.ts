// lib/navigation.ts
import type React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EventIcon from "@mui/icons-material/Event";

export type NavSurface = "bottom" | "drawer";
export type NavSection = "primary" | "secondary";

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ElementType;
  surfaces?: NavSurface[];
  section?: NavSection;
};

/**
 * Zentrale Navigation
 * - Footer/BottomNavigation (global): Home, Karte, Turniere
 * - Drawer: wie gehabt inkl. Ranking/Ergebnisse
 */
export const NAV_ITEMS: NavItem[] = [
  // Drawer (oben) + Bottom
  { label: "Home", href: "/home", icon: HomeIcon, surfaces: ["bottom", "drawer"], section: "primary" },
  { label: "Turnier erstellen", href: "/tournament-create", surfaces: ["drawer"], section: "primary" },
  { label: "Boulder hinzufügen", href: "/boulder-add", surfaces: ["drawer"], section: "primary" },

  // Bottom only (Footer)
  { label: "Karte", href: "/map", icon: MapIcon, surfaces: ["bottom"], section: "secondary" },
  { label: "Turniere", href: "/tournament-overview", icon: EventIcon, surfaces: ["bottom"], section: "secondary" },

  // Drawer (unten)
  { label: "Ergebnisse", href: "/results", surfaces: ["drawer"], section: "secondary" },
  { label: "Ranking", href: "/ranking", surfaces: ["drawer"], section: "secondary" },
  { label: "Karte", href: "/map", surfaces: ["drawer"], section: "secondary" },
];

// Selektoren für Layout
export const BOTTOM_NAV = NAV_ITEMS.filter((i) => i.surfaces?.includes("bottom"));
export const DRAWER_PRIMARY = NAV_ITEMS.filter((i) => i.surfaces?.includes("drawer") && i.section === "primary");
export const DRAWER_SECONDARY = NAV_ITEMS.filter((i) => i.surfaces?.includes("drawer") && i.section === "secondary");
