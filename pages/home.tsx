import React from "react";
import { Box, Typography, Button, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Link from "next/link";

const Home: React.FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          px: 2,
          pb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ mt: 5, fontWeight: "bold", textAlign: "center" }}>
          Boulder Turnier App
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          Willkommen zur Boulder Turnier App! Hier findest du aktuelle Turniere, Kartenansichten und Rankings für alle Boulder-Begeisterten.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SportsHandballIcon />}
            component={Link}
            href="/tournament-overview"
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              minWidth: 180,
              my: 1,
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            Turniere
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<MapIcon />}
            component={Link}
            href="/map"
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              minWidth: 180,
              my: 1,
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            Karte
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            component={Link}
            href="/ranking"
            sx={{
              borderRadius: 3,
              boxShadow: 1,
              minWidth: 180,
              my: 1,
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 4,
              },
            }}
          >
            Ranking
          </Button>
        </Box>
      </Box>
      {/* Footer Navigation */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
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
            href="/tournament-overview"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default Home;
