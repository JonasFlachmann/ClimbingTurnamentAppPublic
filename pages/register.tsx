import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    email: "",
    benutzername: "",
    passwort: "",
    passwortWiederholen: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Keine Validierung mehr, alles optional!
    router.push("/home");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default", px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Registrierung
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Vorname"
            name="vorname"
            value={form.vorname}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="given-name"
          />
          <TextField
            label="Nachname"
            name="nachname"
            value={form.nachname}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="family-name"
          />
          <TextField
            label="E-Mail-Adresse"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="email"
          />
          <TextField
            label="Benutzername"
            name="benutzername"
            value={form.benutzername}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="username"
          />
          <TextField
            label="Passwort"
            name="passwort"
            type="password"
            value={form.passwort}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="new-password"
          />
          <TextField
            label="Passwort wiederholen"
            name="passwortWiederholen"
            type="password"
            value={form.passwortWiederholen}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="new-password"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold", fontSize: "1.1rem", mt: 1 }}
          >
            Registrierung abschließen
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
