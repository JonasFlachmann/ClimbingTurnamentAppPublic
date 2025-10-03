// pages/tournament-overview.tsx
import React from "react";
import { Box, Paper, Typography, Stack, Chip, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

type Tournament = {
  id: string;
  name: string;
  date: string;
  city: string;
  hall: string;
};

const mockTournaments: Tournament[] = [
  {
    id: "t1",
    name: "Winter Boulder Cup",
    date: "2025-12-20",
    city: "Berlin",
    hall: "Boulderhalle Ostbloc",
  },
  {
    id: "t2",
    name: "Spring Climb Open",
    date: "2026-03-15",
    city: "Hamburg",
    hall: "Nordbloc",
  },
];

export default function TournamentOverviewPage() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Box sx={{ px: 2, pb: 10, pt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
        Turniere
      </Typography>

      <Stack spacing={2}>
        {mockTournaments.map((t) => (
          <Paper key={t.id} elevation={2} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {t.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.date} • {t.city} • {t.hall}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip label="Bouldern" size="small" />
              <Chip label="Freunde" size="small" />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Chip clickable color="primary" label="Details" onClick={() => router.push("/tournament")} />
              <Chip clickable variant="outlined" label="Teilnehmen" onClick={() => router.push("/tournament")} />
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Lokalen Footer ausblenden – zentraler Footer kommt aus Layout */}
      <Box
        component="footer"
        hidden
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          py: 1,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <IconButton size="large" color={currentPath === "/home" ? "primary" : "default"} onClick={() => router.push("/home")}>
            <HomeIcon />
          </IconButton>
          <Typography variant="caption" sx={{ fontWeight: currentPath === "/home" ? "bold" : "normal" }}>
            Home
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <IconButton size="large" color={currentPath === "/map" ? "primary" : "default"} onClick={() => router.push("/map")}>
            <MapIcon />
          </IconButton>
          <Typography variant="caption" sx={{ fontWeight: currentPath === "/map" ? "bold" : "normal" }}>
            Karte
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <IconButton
            size="large"
            color={currentPath === "/tournament-overview" ? "primary" : "default"}
            onClick={() => router.push("/tournament-overview")}
          >
            <EmojiEventsIcon />
          </IconButton>
          <Typography variant="caption" sx={{ fontWeight: currentPath === "/tournament-overview" ? "bold" : "normal" }}>
            Turniere
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
