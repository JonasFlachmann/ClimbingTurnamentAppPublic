import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import RegistrationStepper from "../components/RegistrationStepper";

function RegistrationProcessPage() {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [error, setError] = React.useState("");

  const handleNext = () => {
    // Mini-Validierung
    if (!firstName || !lastName || !username || !password || !passwordRepeat) {
      setError("Bitte fülle alle Felder aus.");
      return;
    }
    if (password !== passwordRepeat) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }
    setError("");
    // weiter zu Schritt 2 (benenne die Route so, wie sie bei dir heißt)
    router.push("/registration-email"); // z. B. E-Mail bestätigen
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 760 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 800, mb: 2 }}
        >
          Registrierung
        </Typography>

        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
          }}
        >
          {/* Stepper (Schritt 1 von 4) */}
          <RegistrationStepper activeStep={0} />

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            {/* NEU: Passwort wiederholen */}
            <TextField
              label="Passwort wiederholen"
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              fullWidth
            />

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              color="success"
              onClick={handleNext}
              sx={{ mt: 1, py: 1.2 }}
            >
              Weiter
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

// 🔒 Auth-Seite: kein Header/Sidebar/Footer
RegistrationProcessPage.noLayout = true;

export default RegistrationProcessPage;
