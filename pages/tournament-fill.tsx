import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImageIcon from "@mui/icons-material/Image";
import Link from "next/link";
import { useRouter } from "next/router";

const TournamentFillPage: React.FC = () => {
  const [value, setValue] = React.useState(2);

  // Dummy-Routen
  const dummyRoutes = [
    { id: 1, name: "Route 1", color: "Rot", difficulty: "Leicht" },
    { id: 2, name: "Route 2", color: "Blau", difficulty: "Mittel" },
    { id: 3, name: "Route 3", color: "Gelb", difficulty: "Schwer" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
        pb: 10,
        pt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Turniername */}
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Sommerturnier 2025
      </Typography>

      {/* Upload Feld */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="body1" fontWeight="medium">
          Hallenplan hochladen (PDF oder Bild)
        </Typography>
        <Button variant="contained" component="label">
          Datei auswählen
          <input type="file" hidden accept=".pdf,image/*" />
        </Button>
      </Paper>

      {/* Dummy-Routen */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {dummyRoutes.map((route) => (
          <Paper
            key={route.id}
            variant="outlined"
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Bildplatzhalter */}
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: "grey.200",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
            >
              <ImageIcon color="action" />
            </Box>

            {/* Infos */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                {route.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grifffarbe: {route.color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Schwierigkeit: {route.difficulty}
              </Typography>
            </Box>
          </Paper>
        ))}

        {/* Add-Button */}
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="outlined"
          fullWidth
          sx={{ mt: 1 }}
        >
          Weitere Route hinzufügen
        </Button>
      </Box>

      {/* Footer Navigation (wie in home.tsx) */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
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

export default TournamentFillPage;
