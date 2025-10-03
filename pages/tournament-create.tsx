// pages/tournament-create.tsx
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useRouter } from "next/router";

type Route = {
  name: string;
  grade: string;
  style?: string;
  description?: string;
};

const initialRoutes: Route[] = [
  { name: "Boulder 1", grade: "6A", style: "Sloper", description: "Technisch, balanciert" },
  { name: "Boulder 2", grade: "6B", style: "Überhang", description: "Kraftlastig" },
  { name: "Boulder 3", grade: "6A+", style: "Kante", description: "Präzise Tritte" },
];

export default function TournamentCreatePage() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addRoute = () => {
    setRoutes((prev) => [
      ...prev,
      { name: `Boulder ${prev.length + 1}`, grade: "6A", style: "", description: "" },
    ]);
  };

  const updateRoute = (index: number, patch: Partial<Route>) => {
    setRoutes((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  };

  const removeRoute = (index: number) => {
    setRoutes((prev) => prev.filter((_, i) => i !== index));
  };

  const currentPath = router.pathname;

  return (
    <Box sx={{ px: 2, pb: 10, pt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
        Turnier erstellen
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 4, p: 2, mb: 2 }}>
        <Stack spacing={2}>
          {routes.map((route, idx) => (
            <Paper key={idx} elevation={1} sx={{ p: 2, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{route.name}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => removeRoute(idx)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary">
                Grad: {route.grade} {route.style ? `• ${route.style}` : ""}
              </Typography>
              {route.description && (
                <Typography variant="body2" color="text.secondary">
                  {route.description}
                </Typography>
              )}

              <Collapse in={expandedIndex === idx} unmountOnExit>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<FolderOpenIcon />}
                    onClick={() => updateRoute(idx, { description: "Beschreibung aktualisiert" })}
                  >
                    Details bearbeiten
                  </Button>
                </Stack>
              </Collapse>
            </Paper>
          ))}

          <Button variant="contained" startIcon={<AddCircleIcon />} onClick={addRoute}>
            Boulder hinzufügen
          </Button>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push("/tournament-define")}
          >
            Weiter zur Definition
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
          <IconButton
            size="large"
            color={currentPath === "/home" ? "primary" : "default"}
            onClick={() => router.push("/home")}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="caption" sx={{ fontWeight: currentPath === "/home" ? "bold" : "normal" }}>
            Home
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <IconButton
            size="large"
            color={currentPath === "/map" ? "primary" : "default"}
            onClick={() => router.push("/map")}
          >
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
          <Typography
            variant="caption"
            sx={{ fontWeight: currentPath === "/tournament-overview" ? "bold" : "normal" }}
          >
            Turniere
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
