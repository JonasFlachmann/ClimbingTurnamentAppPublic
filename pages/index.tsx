import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier könntest du später die Login-Logik ergänzen
    router.push("/home");
  };

  const handleRegister = () => {
    router.push("/register");
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
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Boulder Turnier App
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Logge dich ein, um Boulder-Turniere zu entdecken und teilzunehmen.
          </Typography>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              label="Benutzername"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
            <TextField
              label="Passwort"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{
                borderRadius: 3,
                py: 1,
                fontWeight: "bold",
                fontSize: "1.15rem",
                boxShadow: 3,
                mb: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.04)",
                  boxShadow: 6,
                },
              }}
            >
              Einloggen
            </Button>
          </form>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<PersonAddIcon />}
            onClick={handleRegister}
            fullWidth
            sx={{
              borderRadius: 3,
              py: 1,
              fontWeight: "bold",
              fontSize: "1.10rem",
              boxShadow: 2,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.04)",
                boxShadow: 5,
              },
            }}
          >
            Registrieren
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
