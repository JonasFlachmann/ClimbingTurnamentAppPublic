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
...
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 4, p: 2, mb: 4,...play: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Hier könnte eine Kartenkomponente wie Google Maps eingebunden werden */}
          <Typography variant="body2" color="text.secondary">[Kartenansicht folgt]</Typography>
        </Paper>
      </Box>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3}>
        
      </Paper>
    </>
  );
};

export default MapPage;
