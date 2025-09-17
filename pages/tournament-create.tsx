import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

const dummyTournaments = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Turnier ${i + 1}`,
  start: "2025-09-20",
  end: "2025-09-21",
  venue: `SehrLangerVeranstaltungsortName ${i + 1}`,
  routes: [
    { name: "Wand 1", color: "Rot", difficulty: "5a" },
    { name: "Überhang", color: "Blau", difficulty: "6b" },
    { name: "Platte", color: "Gelb", difficulty: "6a+" },
  ],
  participants: 30 + i * 5,
  status: "Aktiv",
}));

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
        {/* Button Neues Turnier */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mb: 4, fontWeight: "bold", fontSize: "1.1rem" }}
          onClick={() => router.push("/tournament-define")}
        >
          Neues Turnier anlegen
        </Button>

        <Stack spacing={3}>
          {dummyTournaments.map((tournament) => (
            <Box key={tournament.id}>
              {/* Turnierfeld klickbar */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 8, bgcolor: "action.hover" },
                }}
                onClick={() => handleOpenDetails(tournament.id)}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography