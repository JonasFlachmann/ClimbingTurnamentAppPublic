import React, { useState } from "react";
import { Box, Paper, Typography, Stack, Divider, IconButton, Button, Collapse } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

const dummyTournaments = [
  {
    id: 1,
    name: "Boulder Masters 2025",
    start: "2025-09-20",
    end: "2025-09-21",
    venue: "Boulderhalle Ostbloc",
    routes: [
      { name: "Wand 1", color: "Rot", difficulty: "5a" },
      { name: "Überhang", color: "Blau", difficulty: "6b" },
    ],
    participants: 42,
    status: "Aktiv",
  },
  {
    id: 2,
    name: "Climbing Open",
    start: "2025-10-05",
    end: "2025-10-05",
    venue: "Kletterhalle Highrise",
    routes: [
      { name: "Platte", color: "Gelb", difficulty: "6a+" },
      { name: "Sloper", color: "Grün", difficulty: "7a" },
    ],
    participants: 35,
    status: "Ausstehend",
  },
  {
    id: 3,
    name: "Outdoor Challenge",
    start: "2025-08-10",
    end: "2025-08-11",
    venue: "Klettergebiet Felswand",
    routes: [
      { name: "Dach", color: "Schwarz", difficulty: "6c" },
      { name: "Kante", color: "Violett", difficulty: "5c" },
    ],
    participants: 28,
    status: "Abgeschlossen",
  },
];

const TournamentCreatePage: React.FC = () => {
  const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const currentPath = router.pathname;

  const handleOpenDetails = (id: number) => {
    setOpenDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push("/tournament-define");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", pt: 5 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mb: 4, fontWeight: "bold", fontSize: "1.1rem" }}
        >
          Neues Turnier erstellen
        </Button>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Turnier duplizieren
        </Typography>
        <Stack spacing={3}>
          {dummyTournaments.map((tournament) => (
            <Box key={tournament.id}>
              {/* Turnierfeld klick
