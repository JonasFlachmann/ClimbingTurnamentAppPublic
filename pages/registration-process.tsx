import React from "react";
import { Box, Typography, Paper, BottomNavigation, BottomNavigationAction, Stepper, Step, StepLabel, Button } from "@mui/material";
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
  const [value, setValue] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
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
          <Typography sx={{ textAlign: "center", mt: 3 }}>
            {[steps[activeStep], "Formular folgt..."].join(" - ")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleNext}
          >
            {activeStep < steps.length - 1 ? "Weiter" : "Abschließen"}
          </Button>
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
