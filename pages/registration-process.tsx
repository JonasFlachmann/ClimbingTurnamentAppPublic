"use client";

import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const stepsDesktop = ["Persönliche Daten", "E-Mail bestätigen", "Teilnahmebedingungen"];
const stepsMobile = ["Persönliche\nDaten", "Bestätigung\nE-Mail", "AGB"];

function RegistrationStepper({ activeStep }: { activeStep: number }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = isMobile ? stepsMobile : stepsDesktop;

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        mb: 3,
        "& .MuiStepConnector-line": { borderTopWidth: 2 },
        "& .MuiStepLabel-label": {
          typography: "subtitle2",
          whiteSpace: "pre-line", // 👉 Zeilenumbruch für mobile Labels
          textAlign: "center",
        },
        "& .MuiStepIcon-root": {
          color: "rgba(0,0,0,0.2)",
          "&.Mui-active": { color: "success.main" },
          "&.Mui-completed": { color: "success.main" },
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default function RegistrationProcess() {
  const router = useRouter();

  // 👉 Step aus URL übernehmen (z. B. /registration-process?step=2)
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (router.query.step) {
      const stepIndex = parseInt(router.query.step as string, 10);
      if (!isNaN(stepIndex) && stepIndex >= 0 && stepIndex <= 2) {
        setActiveStep(stepIndex);
      }
    }
  }, [router.query.step]);

  // Step 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // Step 2
  const [code, setCode] = useState("");

  // Step 3
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const next = () => setActiveStep((s) => Math.min(s + 1, stepsDesktop.length - 1));
  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  const canGoNext = () => {
    if (activeStep === 0) {
      return (
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        username.trim() &&
        password.trim() &&
        passwordRepeat.trim() &&
        password === passwordRepeat
      );
    }
    if (activeStep === 1) return code.trim().length >= 4;
    if (activeStep === 2) return acceptedTerms;
    return true;
  };

  const sendVerificationCode = () => {
    console.log(`Bestätigungscode an ${email} gesendet.`);
  };

  const finish = () => {
    alert("Registrierung erfolgreich abgeschlossen! Bitte melde dich nun an.");
    router.push("/"); // 👉 Weiterleitung zur Login/Startseite
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
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 720, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          Registrierung
        </Typography>

        <RegistrationStepper activeStep={activeStep} />

        {/* Step 1 */}
        {activeStep === 0 && (
          <>
            <TextField
              fullWidth
              label="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="email"
              label="E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Passwort wiederholen"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  sendVerificationCode();
                  next();
                }}
                variant="contained"
                disabled={!canGoNext()}
              >
                Weiter
              </Button>
            </Box>
          </>
        )}

        {/* Step 2 */}
        {activeStep === 1 && (
          <>
            <Typography sx={{ mb: 2 }}>
              Wir haben dir einen Bestätigungscode an <b>{email || "deine E-Mail"}</b> gesendet.
              Bitte gib den Code hier ein.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
              <TextField
                fullWidth
                label="Bestätigungscode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "\\d*" }}
              />
              <Button variant="outlined" onClick={sendVerificationCode}>
                Code erneut senden
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={back} variant="outlined">
                Zurück
              </Button>
              <Button onClick={next} variant="contained" disabled={!canGoNext()}>
                Weiter
              </Button>
            </Box>
          </>
        )}

        {/* Step 3 */}
        {activeStep === 2 && (
          <>
            <Typography sx={{ mb: 2 }}>
              Bitte akzeptiere die Bedingungen, um fortzufahren.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
              }
              label={
                <span>
                  Ich akzeptiere die{" "}
                  <Link href="/agb" style={{ color: "#16a34a", textDecoration: "underline" }}>
                    Allgemeinen Geschäftsbedingungen und Teilnahmebedingungen
                  </Link>
                </span>
              }
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={back} variant="outlined">
                Zurück
              </Button>
              <Button onClick={finish} variant="contained" disabled={!canGoNext()}>
                Fertigstellen
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

;(RegistrationProcess as any).noLayout = true;
(RegistrationProcess as any).title = "Registrierung";
