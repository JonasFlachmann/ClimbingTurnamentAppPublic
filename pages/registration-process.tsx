import React, { useState } from "react";
import { Box, Typography, Paper, BottomNavigation, BottomNavigationAction, Stepper, Step, StepLabel, Button, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Link from "next/link";
import { useRouter } from "next/router";

const steps = [
  "Persönliche Daten",
  "E-Mail bestätigen",
  "Teilnahmebedingungen",
  "Abschluss"
];

const RegistrationProcessPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    benutzername: "",
    passwort: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Registrierung abschließen
      router.push("/home");
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 2, pb: 10, pt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Registrierung
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 4, p: 3, mb: 4, width: "100%", maxWidth: 400 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 3 }}>
            {activeStep === 0 && (
              <>
                <TextField
                  label="Vorname"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  autoComplete="given-name"
                />
                <TextField
                  label="Nachname"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  autoComplete="family-name"
                />
                <TextField
                  label="Benutzername"
                  name="benutzername"
                  value={formData.benutzername}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  autoComplete="username"
                />
                <TextField
                  label="Passwort"
                  name="passwort"
                  type="password"
                  value={formData.passwort}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  autoComplete="new-password"
                />
              </>
            )}
            {activeStep === 1 && (
              <Typography sx={{ textAlign: "center", mb: 2 }}>
                Bitte bestätige deine E-Mail-Adresse.<br />
                [Feld/Bestätigung folgt]
              </Typography>
            )}
            {activeStep === 2 && (
              <Typography sx={{ textAlign: "center", mb: 2 }}>
                Bitte akzeptiere die Teilnahmebedingungen.<br />
                [Checkbox/Feld folgt]
              </Typography>
            )}
            {activeStep === 3 && (
              <Typography sx={{ textAlign: "center", mb: 2 }}>
                Registrierung abgeschlossen! Du kannst jetzt loslegen.
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleNext}
            >
              {activeStep < steps.length - 1 ? "Weiter" : "Abschließen"}
            </Button>
          </Box>
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

export default RegistrationProcessPage;
