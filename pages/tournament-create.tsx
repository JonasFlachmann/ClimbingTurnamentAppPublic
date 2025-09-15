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
              {/* Turnierfeld klickbar */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 8, bgcolor: "action.hover" }
                }}
                onClick={() => handleOpenDetails(tournament.id)}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                    {tournament.name}
                  </Typography>
                  <Typography sx={{ minWidth: 140 }}>
                    {tournament.start === tournament.end
                      ? `Datum: ${tournament.start}`
                      : `Zeitraum: ${tournament.start} – ${tournament.end}`}
                  </Typography>
                  <Typography sx={{ minWidth: 120 }}>
                    Ort: {tournament.venue}
                  </Typography>
                  {/* Add-Button nur Plus, größer, rechts */}
                  <IconButton
                    size="large"
                    onClick={(e) => handleAddClick(e, tournament.id)}
                    sx={{ ml: 2, fontSize: 40 }}
                  >
                    <AddCircleIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              </Paper>
              {/* Details aufklappbar */}
              <Collapse in={openDetails[tournament.id] || false}>
                <Paper elevation={0} sx={{ bgcolor: "background.default", p: 2, mt: 1, mb: 1 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Routen:
                  </Typography>
                  <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
                    {tournament.routes.map((route, idx) => (
                      <Paper key={idx} sx={{ p: 1.5, borderRadius: 2, minWidth: 120 }}>
                        <Typography sx={{ fontWeight: "bold" }}>{route.name}</Typography>
                        <Typography sx={{ color: "text.secondary" }}>Farbe: {route.color}</Typography>
                        <Typography sx={{ color: "text.secondary" }}>Schwierigkeit: {route.difficulty}</Typography>
                      </Paper>
                    ))}
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Teilnehmeranzahl: <span style={{ fontWeight: 400 }}>{tournament.participants}</span>
                  </Typography>
                </Paper>
              </Collapse>
            </Box>
          ))}
        </Stack>
      </Box>
      {/* Footer identisch zu home.tsx */}
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

export default TournamentCreatePage;
