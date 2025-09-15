import React, { useState } from "react";
import { Box, Paper, Typography, Stack, Chip, Button, ToggleButton, ToggleButtonGroup, Avatar, Dialog, DialogContent, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useRouter } from "next/router";

// Dummy-Turnierdaten
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

// Dummy-Routen mit Bild-URL und Dummy-Statistik
const dummyRoutes = [
  { id: 1, name: "Wand 1", color: "Rot", difficulty: "5a", img: "/route1.jpg", results: { Zone: 2, Top: 1, Flash: 1 } },
  { id: 2, name: "Überhang", color: "Blau", difficulty: "6b", img: "/route2.jpg", results: { Zone: 1, Top: 2, Flash: 1 } },
  { id: 3, name: "Platte", color: "Gelb", difficulty: "6a+", img: "/route3.jpg", results: { Zone: 3, Top: 1, Flash: 0 } },
  { id: 4, name: "Sloper", color: "Grün", difficulty: "7a", img: "/route4.jpg", results: { Zone: 2, Top: 1, Flash: 1 } },
  { id: 5, name: "Dach", color: "Schwarz", difficulty: "6c", img: "/route5.jpg", results: { Zone: 1, Top: 1, Flash: 2 } },
  { id: 6, name: "Kante", color: "Violett", difficulty: "5c", img: "/route6.jpg", results: { Zone: 0, Top: 2, Flash: 2 } },
];

// Dummy-Teilnehmer, sortiert nach Ranking/Punkte
const dummyParticipants = [
  { rank: 1, username: "BoulderQueen", points: 560 },
  { rank: 2, username: "ClimbHero", points: 520 },
  { rank: 3, username: "JonasFlachmann", points: 470 },
  { rank: 4, username: "StoneHopper", points: 430 },
];

const TournamentPage: React.FC = () => {
  const router = useRouter();
  // Ergebnisse je Route: { [routeId]: "Zone" | "Top" | "Flash" | null }
  const [results, setResults] = useState<{ [key: number]: string | null }>({});
  // Für große Bildansicht
  const [imgOpen, setImgOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");

  const handleResultChange = (routeId: number, result: string) => {
    setResults((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === result ? null : result,
    }));
  };

  const handleImgClick = (src: string) => {
    setImgSrc(src);
    setImgOpen(true);
  };

  // Für das Footer-Highlighting
  const currentPath = router.pathname;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
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
              {/* Bild mit Klickfunktion */}
              <Box sx={{ position: "relative" }}>
                <Avatar
                  variant="rounded"
                  src={route.img}
                  alt={route.name}
                  sx={{ width: 56, height: 56, mr: 1, cursor: "pointer", border: "2px solid #eee" }}
                  onClick={() => handleImgClick(route.img)}
                />
                <IconButton
                  sx={{ position: "absolute", right: 0, bottom: 0, bgcolor: "background.paper", p: 0.5 }}
                  onClick={() => handleImgClick(route.img)}
                  size="small"
                >
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography sx={{ minWidth: 100, fontWeight: "bold" }}>{route.name}</Typography>
              <Typography sx={{ minWidth: 60 }}>{route.color}</Typography>
              <Typography sx={{ minWidth: 70 }}>{route.difficulty}</Typography>
              <ToggleButtonGroup
                exclusive
                value={results[route.id] || ""}
                onChange={(_, value) => value && handleResultChange(route.id, value)}
                sx={{ ml: 2 }}
              >
                <ToggleButton value="Zone" sx={{ px: 2, display: "flex", flexDirection: "column" }}>
                  Zone
                  <Typography variant="caption" sx={{ mt: 0.5 }}>{route.results.Zone}</Typography>
                </ToggleButton>
                <ToggleButton value="Top" sx={{ px: 2, display: "flex", flexDirection: "column" }}>
                  Top
                  <Typography variant="caption" sx={{ mt: 0.5 }}>{route.results.Top}</Typography>
                </ToggleButton>
                <ToggleButton value="Flash" sx={{ px: 2, display: "flex", flexDirection: "column" }}>
                  Flash
                  <Typography variant="caption" sx={{ mt: 0.5 }}>{route.results.Flash}</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Bild-Dialog */}
      <Dialog open={imgOpen} onClose={() => setImgOpen(false)} maxWidth="md">
        <DialogContent sx={{ textAlign: "center", background: "#222" }}>
          <img src={imgSrc} alt="Route Preview" style={{ maxWidth: "100%", maxHeight: "80vh" }} />
        </DialogContent>
      </Dialog>

      {/* Teilnehmerliste (Ranking) */}
      <Paper elevation={2} sx={{ mt: 4, mb: 10, mx: "auto", maxWidth: 700, p: 2, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Teilnehmerliste & Ranking
        </Typography>
        <Stack direction="row" sx={{ fontWeight: "bold", mb: 1, px: 1 }}>
          <Typography sx={{ flex: "0 0 50px" }}>Platz</Typography>
          <Typography sx={{ flex: "1 0 120px" }}>Benutzername</Typography>
          <Typography sx={{ flex: "0 0 90px" }}>Punkte</Typography>
        </Stack>
        {dummyParticipants.map((p) => (
          <Stack direction="row" alignItems="center" key={p.rank} sx={{ px: 1, py: 0.5 }}>
            <Typography sx={{ flex: "0 0 50px" }}>{p.rank}</Typography>
            <Typography sx={{ flex: "1 0 120px" }}>{p.username}</Typography>
            <Typography sx={{ flex: "0 0 90px" }}>{p.points}</Typography>
          </Stack>
        ))}
      </Paper>

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
