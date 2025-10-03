// pages/tournament-define.tsx
import React, { useState } from "react";
import { Box, Paper, Typography, Stack, Divider, IconButton, Button, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";

export default function TournamentDefinePage() {
  const router = useRouter();
  const [hallName, setHallName] = useState("Kletterzentrum Mitte");
  const [date, setDate] = useState("2025-12-12");
  const [city, setCity] = useState("Berlin");

  const currentPath = router.pathname;

  return (
    <Box sx={{ px: 2, pb: 10, pt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
        Turnier definieren
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 4, p: 2, mb: 2 }}>
        <Stack spacing={2}>
          <TextField label="Hallenname" value={hallName} onChange={(e) => setHallName(e.target.value)} />
          <TextField type="date" label="Datum" value={date} onChange={(e) => setDate(e.target.value)} />
          <TextField label="Ort" value={city} onChange={(e) => setCity(e.target.value)} />
          <Stack direction="row" spacing={2}>
            <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={() => router.push("/tournament-create")}>
              Zurück
            </Button>
            <Button endIcon={<SaveIcon />} variant="contained" onClick={() => router.push("/tournament-fill")}>
              Speichern & weiter
            </Button>
          </Stack>
        </Stack>
      </Paper>

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
