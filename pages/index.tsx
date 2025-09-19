import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";

function IndexPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // TODO: echte Login-Logik
    router.push("/home"); // ✅ Login → home
  };

  const handleRegister = () => {
    // TODO: echte Registrierung-Logik
    router.push("/registration-process"); // ✅ Registrieren → registration-process
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        {/* Titel */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          ALLEZ-CLIMBING
        </Typography>

        <Stack spacing={2} mt={3}>
          <TextField
            label="E-Mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          {/* Login Button */}
          <Button
            variant="contained"
            color="success"
            onClick={handleLogin}
            sx={{ bgcolor: "success.dark", "&:hover": { bgcolor: "success.main" } }}
          >
            Anmelden
          </Button>

          {/* Registrieren Button */}
          <Button
            variant="outlined"
            color="success"
            onClick={handleRegister}
            sx={{ borderRadius: 2 }}
          >
            Registrieren
          </Button>

          {/* Passwort vergessen Link */}
          <Link
            href="/reset-password"
            underline="hover"
            sx={{ fontSize: "0.9rem", mt: 1 }}
          >
            Passwort vergessen?
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
}

// ❌ Kein Header/Footer/Sidebar hier
IndexPage.noLayout = true;

export default IndexPage;
