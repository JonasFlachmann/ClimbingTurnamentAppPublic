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
  const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>(
    {}
  );
  const router = useRouter();
  const currentPath = router.pathname;

  const handleOpenDetails = (id: number) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push("/tournament-define");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      {/* Inhalt */}
      <Box sx={{ maxWidth: 600, mx: "auto", pt: 5 }}>
        {/* Neues Turnier */}
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
          {dummyTournaments.map((t) => (
            <Box key={t.id}>
              {/* Kopfzeile (klickbar) */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 8, bgcolor: "action.hover" },
                }}
                onClick={() => handleOpenDetails(t.id)}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                    {t.name}
                  </Typography>
                  <Typography sx={{ minWidth: 140 }}>
                    {t.start === t.end ? `Datum: ${t.start}` : `Zeitraum: ${t.start} – ${t.end}`}
                  </Typography>
                  <Typography
                    sx={{
                      minWidth: 120,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    title={`Ort: ${t.venue}`}
                  >
                    Ort: {t.venue}
                  </Typography>
                  <IconButton
                    size="large"
                    onClick={(e) => handleAddClick(e, t.id)}
                    sx={{ ml: 2, fontSize: 40 }}
                    aria-label="Turnier duplizieren/erstellen"
                  >
                    <AddCircleIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              </Paper>

              {/* Aufklapp-Details */}
              <Collapse in={openDetails[t.id] || false}>
                <Paper elevation={0} sx={{ bgcolor: "background.default", p: 2, mt: 1, mb: 1 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Routen:
                  </Typography>

                  {/* Routen untereinander & scrollbar */}
                  <Stack direction="column" spacing={1} sx={{ mb: 1, maxHeight: 150, overflowY: "auto" }}>
                    {t.routes.map((r, idx) => (
                      <Paper key={idx} sx={{ p: 1.5, borderRadius: 2, minWidth: 120 }}>
                        <Typography sx={{ fontWeight: "bold" }}>{r.name}</Typography>
                        <Typography sx={{ color: "text.secondary" }}>Farbe: {r.color}</Typography>
                        <Typography sx={{ color: "text.secondary" }}>Schwierigkeit: {r.difficulty}</Typography>
                      </Paper>
                    ))}
                  </Stack>

                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Teilnehmeranzahl: <span style={{ fontWeight: 400 }}>{t.participants}</span>
                  </Typography>
                </Paper>
              </Collapse>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Footer (wie Home) */}
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