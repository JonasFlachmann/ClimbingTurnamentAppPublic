import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Collapse,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

const currentTournament = {
  id: 99,
  name: "Sommer Cup Bochum",
  city: "Bochum",
  venue: "Neoliet",
  date: "20. – 21. September",
  routes: [
    { id: 1, name: "Überhang", color: "Rot", difficulty: "6b" },
    { id: 2, name: "Platte", color: "Gelb", difficulty: "5c" },
    { id: 3, name: "Dachkante", color: "Blau", difficulty: "7a" },
    { id: 4, name: "Balance", color: "Grün", difficulty: "6a+" },
  ],
};

const dummyTournaments = [
  {
    id: 1,
    name: "Bochum Cup",
    city: "Bochum",
    venue: "Neoliet",
    date: "20. – 21. September",
  },
  {
    id: 2,
    name: "Dortmund Masters",
    city: "Dortmund",
    venue: "Bergwerk",
    date: "17. Juli",
  },
  {
    id: 3,
    name: "Berlin Open",
    city: "Berlin",
    venue: "Boulderwelt",
    date: "06/2024",
  },
];

const HomePage: React.FC = () => {
  const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>({});
  const [results, setResults] = useState<{ [key: number]: "zone" | "top" | "flash" | null }>({});
  const router = useRouter();
  const currentPath = router.pathname;

  const toggleDetails = (id: number) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectResult = (routeId: number, field: "zone" | "top" | "flash") => {
    setResults((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === field ? null : field, // wenn nochmal geklickt → abwählen
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 10,
        backgroundImage: "url('/background-plants.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ maxWidth: "95%", mx: "auto", pt: 5 }}>
        {/* Aktuelles Turnier */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "success.dark" }}>
          Aktuelles Turnier
        </Typography>
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: 3, mb: 2, bgcolor: "rgba(224, 224, 224, 0.95)" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
            {currentTournament.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            {currentTournament.city} – {currentTournament.date}
          </Typography>

          {/* Scrollbare Routensammlung */}
          <Stack spacing={1} sx={{ maxHeight: 220, overflowY: "auto", pr: 1 }}>
            {currentTournament.routes.map((r) => (
              <Paper key={r.id} sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(245,245,245,0.95)" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ fontWeight: "bold" }}>{r.name}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant={results[r.id] === "zone" ? "contained" : "outlined"}
                      color="success"
                      onClick={() => selectResult(r.id, "zone")}
                    >
                      Zone
                    </Button>
                    <Button
                      size="small"
                      variant={results[r.id] === "top" ? "contained" : "outlined"}
                      color="success"
                      onClick={() => selectResult(r.id, "top")}
                    >
                      Top
                    </Button>
                    <Button
                      size="small"
                      variant={results[r.id] === "flash" ? "contained" : "outlined"}
                      color="success"
                      onClick={() => selectResult(r.id, "flash")}
                    >
                      Flash
                    </Button>
                  </Stack>
                </Stack>
                <Typography sx={{ color: "text.secondary" }}>
                  {r.color} – {r.difficulty}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>

        {/* Turniere in der Nähe */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "success.dark" }}>
          Turniere in deiner Nähe
        </Typography>
        <Stack spacing={2}>
          {dummyTournaments.map((t) => (
            <Box key={t.id}>
              {/* Eingeklappt */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: "pointer",
                  bgcolor: "rgba(224, 224, 224, 0.95)",
                  "&:hover": { boxShadow: 6, bgcolor: "rgba(200,200,200,0.95)" },
                }}
                onClick={() => toggleDetails(t.id)}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
                  {t.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {t.city} – {t.date}
                </Typography>
              </Paper>

              {/* Aufgeklappt */}
              <Collapse in={openDetails[t.id] || false}>
                <Paper
                  elevation={0}
                  sx={{ bgcolor: "rgba(245,245,245,0.95)", p: 2, mt: 1, mb: 1 }}
                >
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="body2">Austragungsort: {t.venue}</Typography>
                  <Typography variant="body2">Datum: {t.date}</Typography>
                  <Typography variant="body2">Weitere Infos folgen…</Typography>
                </Paper>
              </Collapse>
            </Box>
          ))}
        </Stack>

        {/* Neues Turnier erstellen */}
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          sx={{
            mt: 4,
            mb: 4,
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderRadius: 3,
            boxShadow: 4,
          }}
          onClick={() => router.push("/tournament-create")}
        >
          Neues Turnier erstellen
        </Button>

        {/* News-Box */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            mb: 3,
            bgcolor: "rgba(189, 189, 189, 0.9)",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
            News
          </Typography>
          <Typography variant="body2">
            Dies ist eine Test-Version der App.
          </Typography>
        </Paper>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          bgcolor: "rgba(245, 245, 245, 0.95)",
          borderTop: 1,
          borderColor: "divider",
          py: 1,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100,
          backdropFilter: "blur(6px)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color={currentPath === "/home" ? "success" : "inherit"}
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
            color={currentPath === "/map" ? "success" : "inherit"}
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
            color={currentPath === "/tournament-overview" ? "success" : "inherit"}
            onClick={() => router.push("/tournament-overview")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column" }}
          >
            <EmojiEventsIcon />
            <Typography
              variant="caption"
              sx={{ fontWeight: currentPath === "/tournament-overview" ? "bold" : "normal" }}
            >
              Turniere
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;