import React from "react";
import {
  Box,
  Typography,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Link from "next/link";

const Home: React.FC = () => {
  // Dummy-Routen für Scrollbox
  const dummyRoutes = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Route ${index + 1}`,
    color: ["Rot", "Blau", "Gelb"][index % 3],
    difficulty: ["Leicht", "Mittel", "Schwer"][index % 3],
  }));

  // Dummy-Turniere in der Nähe
  const dummyTournaments = [
    { id: 1, name: "Frühlingsturnier Berlin", date: "12.04.2025" },
    { id: 2, name: "Sommer-Cup Hamburg", date: "20.06.2025" },
    { id: 3, name: "Herbst-Boulder Köln", date: "15.09.2025" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      {/* Aktuelles Turnier */}
      <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          Aktuelles Turnier: Sommerturnier 2025
        </Typography>
        <Box
          sx={{
            maxHeight: 220,
            overflowY: "auto",
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {dummyRoutes.map((route) => (
            <Paper
              key={route.id}
              variant="outlined"
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">
                {route.name} – {route.color} – {route.difficulty}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button size="small" variant="contained">
                  Flash
                </Button>
                <Button size="small" variant="contained">
                  Top
                </Button>
                <Button size="small" variant="contained">
                  Zone
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* Button zur Turniererstellung */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/tournament-create"
        >
          Neues Turnier erstellen
        </Button>
      </Box>

      {/* Turniere in deiner Nähe */}
      <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          Turniere in deiner Nähe
        </Typography>
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          {dummyTournaments.map((tournament) => (
            <Paper key={tournament.id} variant="outlined" sx={{ p: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                {tournament.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tournament.date}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* News */}
      <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          News
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dies ist eine Test-Version der App.
        </Typography>
      </Paper>

      {/* Footer Navigation */}
      <BottomNavigation
        showLabels
        value={0}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          href="/home"
        />
        <BottomNavigationAction
          label="Karte"
          icon={<MapIcon />}
          component={Link}
          href="/map"
        />
        <BottomNavigationAction
          label="Turniere"
          icon={<SportsHandballIcon />}
          component={Link}
          href="/tournament"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Home;