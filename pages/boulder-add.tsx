import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

function BoulderAddPage() {
  // Dummy: Routename (kann später per Zustand/Props kommen)
  const [routeName, setRouteName] = useState<string>("Neue Route");
  const [color, setColor] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [wall, setWall] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  // Dummy-Fotos (später echte Bilder/Uploads)
  const photos = [
    "https://picsum.photos/800/600?random=11",
    "https://picsum.photos/800/600?random=12",
    "https://picsum.photos/800/600?random=13",
  ];

  const tagOptions = [
    "Crimps",
    "Leisten",
    "Jugs",
    "Sloper",
    "Überhang",
    "Platte",
    "Kraft",
    "Balance",
    "Dynamisch",
  ];

  const handleTagsChange = (_: React.MouseEvent<HTMLElement>, newTags: string[]) => {
    setTags(newTags as string[]);
  };

  const handleSubmit = () => {
    // TODO: später Form-Validation & Persistenz
    // Workflow-Anforderung: Zurück zur Tournament-Fill-Seite
    router.push("/tournament-fill");
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Routename */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        {routeName}
      </Typography>

      {/* Fotos: Swipe + Pagination-Indikator */}
      <Paper
        sx={{
          mb: 2,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={8}
          slidesPerView={1}
          style={{ width: "100%", height: 260 }}
        >
          {photos.map((src, idx) => (
            <SwiperSlide key={idx}>
              <Box
                component="img"
                src={src}
                alt={`Route Foto ${idx + 1}`}
                sx={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>

      {/* Felder */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Grifffarbe"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
          />
          <TextField
            label="Schwierigkeit laut Route"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            fullWidth
          />
          <TextField
            label="Routenbezeichnung"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            fullWidth
          />
          <TextField
            label="Ort / Wand"
            value={wall}
            onChange={(e) => setWall(e.target.value)}
            fullWidth
          />
        </Stack>
      </Paper>

      {/* Tags */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
          Tags
        </Typography>
        <ToggleButtonGroup
          value={tags}
          onChange={handleTagsChange}
          aria-label="Routen-Tags"
          sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
        >
          {tagOptions.map((tag) => (
            <ToggleButton key={tag} value={tag} aria-label={tag} size="small">
              {tag}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      {/* Beschreibung */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </Paper>

      {/* Action */}
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ bgcolor: "success.dark", "&:hover": { bgcolor: "success.main" }, px: 3 }}
          onClick={handleSubmit}
        >
          Route festlegen
        </Button>
      </Box>
    </Box>
  );
}

BoulderAddPage.title = "Neue Route";
export default BoulderAddPage;