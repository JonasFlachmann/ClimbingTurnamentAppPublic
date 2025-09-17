import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Link from "next/link";
import { useRouter } from "next/router";

const BoulderAdd: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleConfirm = () => {
    // später Logik zum Speichern einfügen
    router.push("/tournament-fill");
  };

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
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Neue Route anlegen
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Routenname" variant="outlined" fullWidth />
        <TextField label="Grifffarbe" variant="outlined" fullWidth />
        <TextField label="Schwierigkeit" variant="outlined" fullWidth />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1" fontWeight="medium">
            Foto hochladen
          </Typography>
          <Button variant="contained" component="label">
            Datei auswählen
            <input type="file" hidden accept="image/*" />
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{ mt: 2 }}
        >
          Bestätigen
        </Button>
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

export default BoulderAdd;