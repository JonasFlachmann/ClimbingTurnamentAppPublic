import React from "react";
import { Box, Typography, TextField, Button, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Link from "next/link";
import { useRouter } from "next/router";

const TournamentFillPage: React.FC = () => {
  const [value, setValue] = React.useState(2);
  const router = useRouter();

  const handleAdd = () => {
    // Teilnehmer hinzufügen...
    router.push("/tournament-overview");
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 2, pb: 10, pt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Teilnehmer hinzufügen
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 4, p: 3, mb: 4, width: "100%", maxWidth: 400 }}>
          <TextField label="Name des Teilnehmers" fullWidth sx={{ mb: 2 }} />
          <TextField label="Kategorie" fullWidth sx={{ mb: 2 }} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlaylistAddCheckIcon />}
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAdd}
          >
            Hinzufügen
          </Button>
        </Paper>
      </Box>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3}>
        <BottomNavigation showLabels value={value} onChange={(_, newValue) => setValue(newValue)}>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} href="/home" />
          <BottomNavigationAction label="Karte" icon={<MapIcon />} component={Link} href="/map" />
          <BottomNavigationAction label="Turniere" icon={<SportsHandballIcon />} component={Link} href="/tournament-overview" />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default TournamentFillPage;
