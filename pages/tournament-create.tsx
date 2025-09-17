import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Link from "next/link";

const TournamentCreate: React.FC = () => {
  const [value, setValue] = React.useState(0);

  // 6 Dummy-Turniere
  const dummyTournaments = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `Turnier ${index + 1}`,
    location: `SehrLangerVeranstaltungsortName${index + 1}`,
    date: `2025-0${index + 1}-15`,
  }));

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ pt: 4, pb: 2 }}
      >
        Turniere
      </Typography>

      {/* Button Neues Turnier */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/tournament-define"
        >
          Neues Turnier anlegen
        </Button>
      </Box>

      {/* Liste der Dummy-Turniere */}
      <Paper
        variant="outlined"
        sx={{
          m: 2,
          p: 2,
          maxHeight: 300,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {dummyTournaments.map((t) => (
          <Paper
            key={t.id}
            variant="outlined"
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              {t.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              Ort: {t.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Datum: {t.date}
            </Typography>
          </Paper>
        ))}
      </Paper>

      {/* Footer Navigation */}
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

export default TournamentCreate;