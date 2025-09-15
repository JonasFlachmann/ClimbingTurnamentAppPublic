import React, { useState } from "react";
import { Box, Paper, Typography, Button, Collapse, Stack, Divider } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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

  const handleOpenDetails = (id: number) => {
    setOpenDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
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
            <Paper key={tournament.id} elevation={3} sx={{ p: 2, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleOpenDetails(tournament.id)}
                  sx={{ minWidth: 0, fontWeight: "bold", fontSize: "1rem" }}
                >
                  Turnier duplizieren
                </Button>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 2 }}>
                  {tournament.name}
                </Typography>
                <Typography sx={{ ml: 2 }}>
                  {tournament.start === tournament.end
                    ? `Datum: ${tournament.start}`
                    : `Zeitraum: ${tournament.start} – ${tournament.end}`}
                </Typography>
                <Typography sx={{ ml: 2 }}>
                  Ort: {tournament.venue}
                </Typography>
              </Stack>
              <Collapse in={openDetails[tournament.id] || false}>
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
              </Collapse>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default TournamentCreatePage;
