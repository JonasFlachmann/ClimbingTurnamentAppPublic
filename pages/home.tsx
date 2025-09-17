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
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Link from "next/link";

const Home: React.FC = () => {
  // Dummy-Routen für Scrollbox
  const dummyRoutes = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Route ${index + 1}`,
    color: ["Rot", "Blau", "Gelb"][index % 3],
    difficulty: ["Leicht", "Mittel", "Schwer"][index % 3],
  }));

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

      {/* Turniere in deiner Nähe */}
      <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          Turniere in deiner Nähe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (Hier erscheinen Turniere in der Nähe als Liste)
        </Typography>
      </Paper>

      {/* News */}
      <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          News
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (Hier können aktuelle Nachrichten oder Hinweise angezeigt werden)
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
          href="/"
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
        <BottomNavigationAction
          label="Check"
          icon={<PlaylistAddCheckIcon />}
          component={Link}
          href="/tournament-overview"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Home;