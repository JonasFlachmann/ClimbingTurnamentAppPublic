import React from "react";
import { Box, Typography, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Link from "next/link";

const MapPage: React.FC = () => {
  const [value, setValue] = React.useState(1);

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 2, pb: 10, pt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Karte
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          Finde Boulderhallen und Turniere in deiner Nähe auf der interaktiven Karte!
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 4, p: 2, mb: 4, minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Hier könnte eine Kartenkomponente wie Google Maps eingebunden werden */}
          <Typography variant="body2" color="text.secondary">[Kartenansicht folgt]</Typography>
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

export default MapPage;
