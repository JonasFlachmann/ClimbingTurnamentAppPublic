"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
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
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TAG_GROUPS: string[][] = [
  ["Überhang", "Vertikale", "Platte", "Verschneidung"],
  ["Crimps", "Leisten", "Sloper", "Jugs", "Pocketholes"],
  ["Kraft", "Balance", "Dynamisch", "Technisch"],
];

const MAX_PHOTOS = 4;
// gut sichtbare Platzhalterfarben
const PLACEHOLDER_COLORS = ["#CBD5E1", "#86E3A1", "#93C5FD", "#F9A8D4"]; // slate-300, green, blue, pink

export default function BoulderAddPage() {
  const router = useRouter();

  // Form-States
  const [routeName, setRouteName] = useState("");
  const [gripColor, setGripColor] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [hallLabel, setHallLabel] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // Fotos: Blob-URLs für Preview oder null für Platzhalter
  const [photoUrls, setPhotoUrls] = useState<(string | null)[]>(
    Array.from({ length: MAX_PHOTOS }, () => null)
  );
  const fileInputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Einfaches Carousel
  const [index, setIndex] = useState(0);
  const clampIndex = (v: number) =>
    Math.max(0, Math.min(MAX_PHOTOS - 1, v));
  const goPrev = () => setIndex((i) => clampIndex(i - 1));
  const goNext = () => setIndex((i) => clampIndex(i + 1));
  const goTo = (i: number) => setIndex(clampIndex(i));

  // Drag / Swipe (Touch + Maus)
  const startXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || startXRef.current == null) return;
    // optional: live translate – hier nicht nötig
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current || startXRef.current == null) return;
    const dx = e.clientX - startXRef.current;
    draggingRef.current = false;
    startXRef.current = null;
    const THRESHOLD = 40; // Pixel
    if (dx > THRESHOLD) goPrev();
    else if (dx < -THRESHOLD) goNext();
  };
  const onPointerLeave = () => {
    draggingRef.current = false;
    startXRef.current = null;
  };

  const allTags = useMemo(() => TAG_GROUPS.flat(), []);

  const handleToggleGroup =
    (groupIndex: number) =>
    (_: React.MouseEvent<HTMLElement>, newValues: string[]) => {
      const current = new Set(tags);
      const groupTags = new Set(TAG_GROUPS[groupIndex]);
      Array.from(groupTags).forEach((gt) => current.delete(gt));
      newValues.forEach((nv) => current.add(nv));
      setTags(Array.from(current));
    };
  const selectedByGroup = (groupIndex: number) =>
    tags.filter((t) => TAG_GROUPS[groupIndex].includes(t));

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
    // springe auf dieses Bild
    setIndex(idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: später API/Supabase
    router.push("/tournament-fill");
  };

  return (
    <Box
      component="main"
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        // genug Abstand zum (globalen) Footer:
        pb: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
      }}
    >
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

            {/* Fotos – eigener, zuverlässiger Carousel */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Fotos (durchblättern)
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 260,
                  borderRadius: 2,
                  overflow: "hidden",
                  userSelect: "none",
                  touchAction: "pan-y",
                  bgcolor: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerLeave}
              >
                {/* aktuelles Bild / Platzhalter */}
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    bgcolor:
                      photoUrls[index] == null
                        ? PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]
                        : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {photoUrls[index] ? (
                    <img
                      src={photoUrls[index] as string}
                      alt={`Foto ${index + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
                      Platzhalter {index + 1}
                    </Typography>
                  )}

                  {/* Kamera/Upload */}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PhotoCameraIcon />}
                    onClick={() => handlePickPhoto(index)}
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
                      fileInputsRef.current[index] = el;
                    }}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange(index)}
                    style={{ display: "none" }}
                  />
                </Box>

                {/* Pfeile */}
                <IconButton
                  aria-label="vorheriges Foto"
                  onClick={goPrev}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 8,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  aria-label="nächstes Foto"
                  onClick={goNext}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 8,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>

                {/* Dots */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  {Array.from({ length: MAX_PHOTOS }).map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => goTo(i)}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        cursor: "pointer",
                        bgcolor: i === index ? "success.main" : "rgba(0,0,0,0.25)",
                        outline: i === index ? "2px solid rgba(0,0,0,0.15)" : "none",
                      }}
                    />
                  ))}
                </Box>
              </Box>
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
                          padding: "4px 10px",
                          borderRadius: 1.25,
                          borderColor: "divider",
                          "&.Mui-selected": {
                            bgcolor: "success.main",
                            color: "#fff",
                            borderColor: "success.main",
                            "&:hover": { bgcolor: "success.dark" },
                          },
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
            <Button variant="outlined" onClick={() => router.back()} sx={{ textTransform: "none" }}>
              Abbrechen
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
              Route festlegen
            </Button>
          </Box>

          {/* extra Abstand zum globalen Footer */}
          <Box sx={{ height: 96 }} />
        </Box>
      </Paper>
    </Box>
  );
}
