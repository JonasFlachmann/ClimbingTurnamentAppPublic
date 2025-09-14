import React from "react";
import { Box, Typography, Button, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Link from "next/link";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleStart = () => {
    router.push("/home");
  };

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 4,
            mt: 8,
            mb: 4,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            boxShadow: 6,
          }}
        >
          <EmojiEventsIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Boulder Turnier App
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Die moderne Plattform für Boulder-Turniere. Finde Events, Rankings und Hallen – direkt auf deinem Smartphone.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStart}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1,
              fontWeight: "bold",
              fontSize: "1.15rem",
              boxShadow: 3,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            Loslegen
          </Button>
        </Paper>
      </Box>
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

export default IndexPage;
