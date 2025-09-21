"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Button,
  Divider,
} from "@mui/material";

// Swiper nur Client-seitig laden
const Swiper = dynamic(() => import("swiper/react").then((m) => m.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((m) => m.SwiperSlide),
  { ssr: false }
);

// Wichtig: Bei Swiper 9 den Pagination-Import aus "swiper" selbst
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function BoulderAddPage() {
  const router = useRouter();

  // Form-State
  const [routeName, setRouteName] = useState("");
  const [gripColor, setGripColor] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [hallLabel, setHallLabel] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Tags (Mehrfachauswahl)
  const [tags, setTags] = useState<string[]>([]);
  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const tagGroups: string[][] = [
    ["Überhang", "Vertikale", "Platte", "Verschneidung"],
    ["Crimps", "Leisten", "Sloper", "Jugs", "Pocketholes"],
    ["Kraft", "Balance", "Dynamisch", "Technisch"],
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Später API-Call einbauen
    router.push("/tournament-fill");
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Neue Route hinzufügen
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Routename */}
            <Grid item xs={12}>
              <TextField
                label="Routenname"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            {/* Fotos – Swiper mit Platzhaltern */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Fotos
              </Typography>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, overflow: "hidden" }}
              >
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={8}
                  slidesPerView={1}
                  style={{ width: "100%", height: 220 }}
                >
                  {[1, 2, 3].map((i) => (
                    <SwiperSlide key={i}>
                      <Box
                        sx={{
                          width: "100%",
                          height: 220,
                          bgcolor: "grey.300",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "grey.700",
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >
                        + Foto {i}
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Paper>
            </Grid>

            {/* Grifffarbe */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Grifffarbe"
                value={gripColor}
                onChange={(e) => setGripColor(e.target.value)}
                fullWidth
                placeholder="z. B. Blau"
              />
            </Grid>

            {/* Schwierigkeit laut Halle */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Schwierigkeit (laut Halle)</InputLabel>
                <Select
                  label="Schwierigkeit (laut Halle)"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <MenuItem value={"leicht"}>Leicht</MenuItem>
                  <MenuItem value={"mittel"}>Mittel</MenuItem>
