// pages/tournament-fill.tsx
import React, { useState } from "react";
import { Box, Paper, Typography, Stack, Divider, IconButton, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useRouter } from "next/router";

export default function TournamentFillPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const currentPath = router.pathname;

  return (
    <Box sx={{ px: 2, pb: 10, pt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
        Turnier befüllen
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 4, p: 2, mb: 2 }}>
        <Stack spacing={2}>
          <Button variant="outlined" startIcon={<AddPhotoAlternateIcon />}>
            Hallenplan/Bilder hochladen
          </Button>
          <Divider />
          <Button variant="contained" endIcon={<DoneAllIcon />} onClick={() => router.push("/tournament-overview")}>
            Fertigstellen
          </Button>
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
