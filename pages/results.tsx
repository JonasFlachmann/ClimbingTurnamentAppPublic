import React from "react";
import { Box, Typography, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Link from "next/link";

const ResultsPage: React.FC = () => {
  const [value, setValue] = React.useState(2);

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 2, pb: 10, pt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Ergebnisse
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          Hier findest du alle Resultate der vergangenen Boulder-Turniere.
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 4, p: 2, mb: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
            [Ergebnisliste folgt]
          </Typography>
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

export default ResultsPage;
