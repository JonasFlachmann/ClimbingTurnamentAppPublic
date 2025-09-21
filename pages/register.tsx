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
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !passwordRepeat) {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }
    if (password !== passwordRepeat) {
      alert("Die Passwörter stimmen nicht überein.");
      return;
    }
    if (!acceptedTerms) {
      alert("Bitte akzeptiere die AGB.");
      return;
    }

    // TODO: später Registrierung mit Supabase-Auth
    alert(`Registrierung erfolgreich für ${name} (${email})`);
    router.push("/"); // Weiterleitung z. B. zur Startseite
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
        sx={{ width: "100%", maxWidth: 500, p: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Registrierung
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="E-Mail-Adresse"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Passwort bestätigen"
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            sx={{ mb: 2 }}
          />

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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              gap: 2,
            }}
          >
            <Link href="/login" passHref>
              <Button variant="outlined" fullWidth>
                Zurück zur Anmeldung
              </Button>
            </Link>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Registrieren
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}