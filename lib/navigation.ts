// lib/navigation.ts
import type React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EventIcon from "@mui/icons-material/Event";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ElementType;
};

// Hauptnavigation – wird von Drawer **und** BottomNavigation genutzt
export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/home", icon: HomeIcon },
  { label: "Karte", href: "/map", icon: MapIcon },
  { label: "Turniere", href: "/tournament-overview", icon: EventIcon },
  { label: "Ranking", href: "/ranking", icon: LeaderboardIcon },
];

// Optionale Zusatz-Links (z. B. AGB)
export const AUX_NAV: NavItem[] = [
  { label: "AGB", href: "/agb", icon: InfoIcon },
];
