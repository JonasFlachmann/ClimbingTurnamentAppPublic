import React, { useState } from "react";
import { Box, Paper, Typography, Stack, Chip, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

// Dummy-Turnierdaten (erstes Turnier aus tournament-overview)
const turnier = {
  name: "Boulder Masters 2025",
  status: "Aktiv",
  stadt: "Berlin",
  ort: "Boulderhalle Ostbloc",
  start: "2025-09-20",
  ende: "2025-09-21",
};

const statusColor = (status: string) => {
  switch (status) {
    case "Aktiv":
      return "success";
    case "Ausstehend":
      return "warning";
    case "Abgeschlossen":
      return "default";
    default:
      return "primary";
  }
};

// Dummy-Routen
const dummyRoutes = [
  { id: 1, name: "Wand 1", color: "Rot", difficulty: "5a" },
  { id: 2, name: "Überhang", color: "Blau", difficulty: "6b" },
  { id: 3, name: "Platte", color: "Gelb", difficulty: "6a+" },
  { id: 4, name: "Sloper", color: "Grün", difficulty: "7a" },
  { id: 5, name: "Dach", color: "Schwarz", difficulty: "6c" },
  { id: 6, name: "Kante", color: "Violett", difficulty: "5c" },
];

const TournamentPage: React.FC = () => {
  const router = useRouter();
  // Ergebnisse je Route: { [routeId]: "Zone" | "Top" | "Flash" | null }
  const [results, setResults] = useState<{ [key: number]: string | null }>({});

  const handleResultChange = (routeId: number, result: string) => {
    setResults((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === result ? null : result, // deselect on click again
    }));
  };

  // Für das Footer-Highlighting
  const currentPath = router.pathname;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 700, mx: "auto", mt: 4, mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            {turnier.name}
          </Typography>
          <Chip
            label={turnier.status}
            color={statusColor(turnier.status)}
            sx={{ fontWeight: "bold", fontSize: "0.95rem" }}
          />
        </Stack>
        <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
          Stadt: <strong>{turnier.stadt}</strong>
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
          Veranstaltungsort: <strong>{turnier.ort}</strong>
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {turnier.start === turnier.ende
            ? (
              <>Datum: <strong>{turnier.start}</strong></>
            ) : (
              <>Zeitraum: <strong>{turnier.start} – {turnier.ende}</strong></>
            )
          }
        </Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Ergebnisse eingeben
      </Typography>
      <Stack spacing={2} sx={{ px: { xs: 1, md: 8 }, maxWidth: 700, mx: "auto" }}>
        {dummyRoutes.map((route) => (
          <Paper key={route.id} sx={{ p: 2, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
              <Typography sx={{ minWidth: 100, fontWeight: "bold" }}>{route.name}</Typography>
              <Typography sx={{ minWidth: 60 }}>{route.color}</Typography>
              <Typography sx={{ minWidth: 70 }}>{route.difficulty}</Typography>
              <ToggleButtonGroup
                exclusive
                value={results[route.id] || ""}
                onChange={(_, value) => value && handleResultChange(route.id, value)}
                sx={{ ml: 2 }}
              >
                <ToggleButton value="Zone" sx={{ px: 2 }}>Zone</ToggleButton>
                <ToggleButton value="Top" sx={{ px: 2 }}>Top</ToggleButton>
                <ToggleButton value="Flash" sx={{ px: 2 }}>Flash</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Footer wie home.tsx */}
      <Box
        component="footer"
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
          <Button
            color={currentPath === "/home" ? "primary" : "inherit"}
            onClick={() => router.push("/home")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column" }}
          >
            <HomeIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/home" ? "bold" : "normal" }}>
              Home
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color={currentPath === "/map" ? "primary" : "inherit"}
            onClick={() => router.push("/map")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column" }}
          >
            <MapIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/map" ? "bold" : "normal" }}>
              Karte
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color={currentPath === "/tournament-overview" ? "primary" : "inherit"}
            onClick={() => router.push("/tournament-overview")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column" }}
          >
            <EmojiEventsIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/tournament-overview" ? "bold" : "normal" }}>
              Turniere
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentPage;
