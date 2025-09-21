"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CheckIcon from "@mui/icons-material/Check";

// Swiper nur Client-seitig laden
const Swiper = dynamic(() => import("swiper/react").then((m) => m.Swiper), { ssr: false });
const SwiperSlide = dynamic(
  () => import("swiper/react").then((m) => m.SwiperSlide),
  { ssr: false }
);

import "swiper/css";
import { Pagination } from "swiper";

const TAG_GROUPS: string[][] = [
  ["Überhang", "Vertikale", "Platte", "Verschneidung"],
  ["Crimps", "Leisten", "Sloper", "Jugs", "Pocketholes"],
  ["Kraft", "Balance", "Dynamisch", "Technisch"],
];

const MAX_PHOTOS = 5;

export default function BoulderAddPage() {
  const router = useRouter();

  // States für Form
  const [routeName, setRouteName] = useState("");
  const [gripColor, setGripColor] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [hallLabel, setHallLabel] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // Fotos
  const [photoUrls, setPhotoUrls] = useState<(string | null)[]>(
    Array.from({ length: MAX_PHOTOS }, () => null)
  );
  const fileInputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const allTags = useMemo(() => TAG_GROUPS.flat(), []);

  // Tag-Auswahl
  const handleToggleGroup =
    (groupIndex: number) =>
    (_: React.MouseEvent<HTMLElement>, newValues: string[]) => {
      const current = new Set(tags);
      const groupTags = new Set(TAG_GROUPS[groupIndex]);

      // Entferne alle Tags dieser Gruppe
      Array.from(groupTags).forEach((gt) => current.delete(gt));
      // Füge neu ausgewählte hinzu
      newValues.forEach((nv) => current.add(nv));

      setTags(Array.from(current));
    };

  const selectedByGroup = (groupIndex: number) =>
    tags.filter((t) => TAG_GROUPS[groupIndex].includes(t));

  // Kamera-/Upload
  const handlePickPhoto = (idx: number) => {
    fileInputsRef.current[idx]?.click();
  };

  const handleFileChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrls((prev) => {
      const next = [...prev];
      next[idx] = url;
      return next;
    });
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🚧 TODO: Speichern/DB
    router.push("/tournament-fill");
  };

  return (
    <Box component="main" sx={{ p: 2, display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 800, p: 2, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Neue Route hinzufügen
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Routename */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Routenname"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
              />
            </Grid>

            {/* Fotos */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Fotos (durchblättern)
              </Typography>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={12}
              >
                {Array.from({ length: MAX_PHOTOS }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 240,
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: photoUrls[i] ? "transparent" : "grey.300",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {photoUrls[i] ? (
                        <img
                          src={photoUrls[i] as string}
                          alt={`Foto ${i + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          + Foto {i + 1}
                        </Typography>
                      )}

                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PhotoCameraIcon />}
                        onClick={() => handlePickPhoto(i)}
                        sx={{
                          position: "absolute",
                          right: 12,
                          bottom: 12,
                          borderRadius: 2,
                          textTransform: "none",
                        }}
                      >
                        Kamera
                      </Button>
                      <input
                        ref={(el) => {
                          fileInputsRef.current[i] = el;
                        }}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange(i)}
                        style={{ display: "none" }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>

            {/* Grifffarbe */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Grifffarbe"
                value={gripColor}
                onChange={(e) => setGripColor(e.target.value)}
                placeholder="z. B. Blau"
              />
            </Grid>

            {/* Schwierigkeit */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Schwierigkeit (laut Halle)"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                placeholder="z. B. 6a"
              />
            </Grid>

            {/* Bezeichnung */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bezeichnung (laut Halle)"
                value={hallLabel}
                onChange={(e) => setHallLabel(e.target.value)}
                placeholder="z. B. #42"
              />
            </Grid>

            {/* Ort/Wand */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ort / Wand"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="z. B. Sektor A"
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Tags
              </Typography>
              <Grid container spacing={1}>
                {TAG_GROUPS.map((group, gi) => (
                  <Grid item xs={12} key={`group-${gi}`}>
                    <ToggleButtonGroup
                      color="primary"
                      value={selectedByGroup(gi)}
                      onChange={handleToggleGroup(gi)}
                      exclusive={false}
                      size="small"
                      sx={{
                        flexWrap: "wrap",
                        gap: 1,
                        "& .MuiToggleButton-root": {
                          textTransform: "none",
                          fontSize: 12,
                          padding: "4px 8px",
                          borderRadius: 1.25,
                        },
                      }}
                    >
                      {group.map((tag) => (
                        <ToggleButton key={tag} value={tag} aria-label={tag}>
                          {tags.includes(tag) && (
                            <CheckIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                          )}
                          {tag}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Beschreibung */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Beschreibung"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kurze Beschreibung der Route"
                multiline
                minRows={3}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Bestätigungsbutton */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              sx={{ textTransform: "none" }}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Route festlegen
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
