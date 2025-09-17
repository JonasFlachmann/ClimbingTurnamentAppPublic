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

// Dummy-Routen
const dummyRoutes = [
  {
    id: 1,
    name: "Überhang",
    color: "Rot",
    difficulty: "6b",
    image: "/route1.jpg",
    height: "4,5m",
    setter: "Max Mustermann",
    special: "Sprung am Ende",
  },
  {
    id: 2,
    name: "Platte",
    color: "Gelb",
    difficulty: "5c",
    image: "/route2.jpg",
    height: "3,8m",
    setter: "Anna Beispiel",
    special: "Technisch, kleine Tritte",
  },
  {
    id: 3,
    name: "Dachkante",
    color: "Blau",
    difficulty: "7a",
    image: "/route3.jpg",
    height: "5,0m",
    setter: "Chris Schrauber",
    special: "Sehr kraftvoll",
  },
];

const TournamentFillPage: React.FC = () => {
  const [openRoutes, setOpenRoutes] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const currentPath = router.pathname;

  const toggleRoute = (id: number) =>
    setOpenRoutes((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Box sx={{ maxWidth: "95%", mx: "auto", pt: 5 }}>
        {/* Turniername */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Sommer Cup Bochum
        </Typography>

        {/* Upload Hallenplan */}
        <Button variant="outlined" component="label" sx={{ mb: 3 }}>
          Hallenplan hochladen
          <input type="file" hidden accept="image/*,.pdf" />
        </Button>

        {/* Routenliste */}
        <Stack spacing={2}>
          {dummyRoutes.map((route) => (
            <Box key={route.id}>
              {/* Eingeklappt */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 8, bgcolor: "action.hover" },
                }}
                onClick={() => toggleRoute(route.id)}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Miniaturbild */}
                  <Box
                    component="img"
                    src={route.image}
                    alt={route.name}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      objectFit: "cover",
                      bgcolor: "grey.200",
                    }}
                  />
                  <Stack>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {route.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {route.color} – {route.difficulty}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>

              {/* Aufgeklappt */}
              <Collapse in={openRoutes[route.id] || false}>
                <Paper
                  elevation={0}
                  sx={{ bgcolor: "background.default", p: 2, mt: 1, mb: 1 }}
                >
                  <Divider sx={{ mb: 2 }} />
                  <Typography>Höhe: {route.height}</Typography>
                  <Typography>Schrauber: {route.setter}</Typography>
                  <Typography>Besonderheit: {route.special}</Typography>
                </Paper>
              </Collapse>
            </Box>
          ))}
        </Stack>

        {/* Add-Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => router.push("/boulder-add")}
          >
            Neue Route hinzufügen
          </Button>
        </Box>
      </Box>

      {/* Footer */}
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

export default TournamentFillPage;