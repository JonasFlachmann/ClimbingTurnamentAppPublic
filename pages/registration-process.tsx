"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const steps = ["Persönliche Daten", "E-Mail bestätigen", "Teilnahmebedingungen"];

export default function RegistrationProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (!acceptedTerms) {
        alert("Bitte akzeptiere die Teilnahmebedingungen.");
        return;
      }
      // TODO: Registrierung finalisieren (Supabase oder API)
      alert("Registrierung erfolgreich!");
      router.push("/");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box
      component="main"
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        pb: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 600, p: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Registrierung
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Inhalt pro Schritt */}
        {activeStep === 0 && (
          <>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}

        {activeStep === 1 && (
          <Typography>
            Wir haben dir eine Bestätigungs-E-Mail gesendet. Bitte klicke auf
            den Bestätigungslink, um fortzufahren.
          </Typography>
        )}

        {activeStep === 2 && (
          <>
            <Typography sx={{ mb: 2 }}>
              Bitte akzeptiere die Teilnahmebedingungen, um fortzufahren.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  required
                />
              }
              label={
                <span>
                  Ich akzeptiere die{" "}
                  <Link
                    href="/agb"
                    style={{ color: "#16a34a", textDecoration: "underline" }}
                  >
                    Allgemeinen Geschäftsbedingungen und Teilnahmebedingungen
                  </Link>
                </span>
              }
            />
          </>
        )}

        {/* Navigation */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Zurück
          </Button>
          <Button onClick={handleNext} variant="contained" color="primary">
            {activeStep === steps.length - 1 ? "Fertigstellen" : "Weiter"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}