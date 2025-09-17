import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Collapse,
  Divider,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
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
      [routeId]: prev[routeId] === field ? null : field,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 10,
        backgroundColor: "#f5f8f6",
        backgroundImage: "url('/background-plants.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          maxWidth: "100%",
          boxSizing: "border-box",
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.9),
          color: "white",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          zIndex: 120,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Home
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={() => router.push("/profile")}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => router.push("/settings")}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content Wrapper */}
      <Box sx={{ maxWidth: "95%", mx: "auto", pt: 10 }}>
        {/* Aktuelles Turnier */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5, color: "success.dark" }}>
          Aktuelles Turnier
        </Typography>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            mb: 3,
            bgcolor: "rgba(255,255,255,0.95)",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
            {currentTournament.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            {currentTournament.city} – {currentTournament.date}
          </Typography>

          {/* Scrollbare Routensammlung */}
          <Stack spacing={1} sx={{ maxHeight: 200, overflowY: "auto", pr: 0.5 }}>
            {currentTournament.routes.map((r) => (
              <Paper
                key={r.id}
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.95)",
                  mb: 0.8,
                  boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Name + Farbe */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "success.main", fontSize: "0.95rem" }}
                  >
                    {r.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                  >
                    {r.color} – {r.difficulty}
                  </Typography>
                </Box>

                {/* Buttons kompakt, rund */}
                <Stack direction="row" spacing={0.5}>
                  <Button
                    size="small"
                    variant={results[r.id] === "zone" ? "contained" : "outlined"}
                    color="success"
                    onClick={() => selectResult(r.id, "zone")}
                    sx={{
                      minWidth: 32,
                      height: 32,
                      borderRadius: "50%",
                      px: 0,
                      fontSize: "0.75rem",
                    }}
                  >
                    Z
                  </Button>
                  <Button
                    size="small"
                    variant={results[r.id] === "top" ? "contained" : "outlined"}
                    color="success"
                    onClick={() => selectResult(r.id, "top")}
                    sx={{
                      minWidth: 32,
                      height: 32,
                      borderRadius: "50%",
                      px: 0,
                      fontSize: "0.75rem",
                    }}
                  >
                    T
                  </Button>
                  <Button
                    size="small"
                    variant={results[r.id] === "flash" ? "contained" : "outlined"}
                    color="success"
                    onClick={() => selectResult(r.id, "flash")}
                    sx={{
                      minWidth: 32,
                      height: 32,
                      borderRadius: "50%",
                      px: 0,
                      fontSize: "0.75rem",
                    }}
                  >
                    F
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Paper>

        {/* Turniere in der Nähe */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5, color: "success.dark" }}>
          Turniere in deiner Nähe
        </Typography>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            mb: 3,
            bgcolor: "rgba(255,255,255,0.95)",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Stack spacing={1} sx={{ maxHeight: 220, overflowY: "auto", pr: 0.5 }}>
            {dummyTournaments.map((t) => (
              <Box key={t.id}>
                {/* Eingeklappt */}
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    cursor: "pointer",
                    bgcolor: "rgba(255,255,255,0.95)",
                    mb: 0.8,
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
                    "&:hover": { boxShadow: "0px 3px 8px rgba(0,0,0,0.15)" },
                  }}
                  onClick={() => toggleDetails(t.id)}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "success.main", fontSize: "0.95rem" }}
                  >
                    {t.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                  >
                    {t.city} – {t.date}
                  </Typography>
                </Paper>

                {/* Aufgeklappt */}
                <Collapse in={openDetails[t.id] || false}>
                  <Paper
                    sx={{
                      bgcolor: "rgba(250,250,250,0.95)",
                      p: 1.5,
                      mt: 0.5,
                      mb: 0.8,
                      borderRadius: 2,
                      boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Divider sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      Austragungsort: {t.venue}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      Datum: {t.date}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      Weitere Infos folgen…
                    </Typography>
                  </Paper>
                </Collapse>
              </Box>
            ))}
          </Stack>
        </Paper>

        {/* Neues Turnier erstellen */}
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          sx={{
            mt: 3,
            mb: 3,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 3,
            boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
          }}
          onClick={() => router.push("/tournament-create")}
        >
          Neues Turnier erstellen
        </Button>

        {/* News-Box */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            mb: 3,
            bgcolor: "rgba(255,255,255,0.9)",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
            News
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
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
          width: "100vw",
          maxWidth: "100%",
          boxSizing: "border-box",
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.85),
          borderTop: 1,
          borderColor: "divider",
          py: 0.5,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100,
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={() => router.push("/home")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column", color: "white" }}
          >
            <HomeIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/home" ? "bold" : "normal", color: "white" }}>
              Home
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={() => router.push("/map")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column", color: "white" }}
          >
            <MapIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/map" ? "bold" : "normal", color: "white" }}>
              Karte
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={() => router.push("/tournament-overview")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column", color: "white" }}
          >
            <EmojiEventsIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/tournament-overview" ? "bold" : "normal", color: "white" }}>
              Turniere
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
