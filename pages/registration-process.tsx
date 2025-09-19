import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import RegistrationStepper from "../components/RegistrationStepper";

function RegistrationProcessPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);

  // Felder Schritt 1
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [error, setError] = React.useState("");

  // Schritt 2 (E-Mail)
  const [emailCode, setEmailCode] = React.useState("");

  // Schritt 3 (Bedingungen)
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!firstName || !lastName || !username || !password || !passwordRepeat) {
        setError("Bitte fülle alle Felder aus.");
        return;
      }
      if (password !== passwordRepeat) {
        setError("Die Passwörter stimmen nicht überein.");
        return;
      }
      setError("");
    }
    if (activeStep === 1) {
      if (!emailCode) {
        setError("Bitte Bestätigungscode eingeben.");
        return;
      }
      setError("");
    }
    if (activeStep === 2) {
      if (!acceptedTerms) {
        setError("Bitte Teilnahmebedingungen akzeptieren.");
        return;
      }
      setError("");
    }

    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Registrierung abgeschlossen → zurück zum Login
      router.push("/");
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
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
          {/* Stepper */}
          <RegistrationStepper activeStep={activeStep} />

          {/* Step Content */}
          <Stack spacing={2} sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <>
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
                <TextField
                  label="Passwort wiederholen"
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  fullWidth
                />
              </>
            )}

            {activeStep === 1 && (
              <>
                <Typography variant="body1">
                  Bitte gib den Bestätigungscode ein, den wir dir per E-Mail
                  geschickt haben.
                </Typography>
                <TextField
                  label="Bestätigungscode"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  fullWidth
                />
              </>
            )}

            {activeStep === 2 && (
              <>
                <Typography variant="body1">
                  Bitte akzeptiere die Teilnahmebedingungen, um fortzufahren.
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                  }
                  label="Ich akzeptiere die Teilnahmebedingungen"
                />
              </>
            )}

            {activeStep === 3 && (
              <>
                <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                  🎉 Registrierung erfolgreich!
                </Typography>
                <Typography variant="body1" align="center">
                  Dein Account wurde angelegt. Du kannst dich jetzt anmelden.
                </Typography>
              </>
            )}

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                {error}
              </Typography>
            )}

            {/* Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {activeStep > 0 && activeStep < 3 && (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleBack}
                  sx={{ flex: 1 }}
                >
                  Zurück
                </Button>
              )}
              <Button
                variant="contained"
                color="success"
                onClick={handleNext}
                sx={{ flex: 1 }}
              >
                {activeStep === 3 ? "Zum Login" : "Weiter"}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

// ❌ Kein Header/Footer/Sidebar
RegistrationProcessPage.noLayout = true;

export default RegistrationProcessPage;
