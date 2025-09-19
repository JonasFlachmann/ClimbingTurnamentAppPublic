import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  MobileStepper,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";

function BoulderAddPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const maxSteps = 3; // Beispiel: 3 Fotos pro Route

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleTagChange = (
    event: React.MouseEvent<HTMLElement>,
    newTags: string[]
  ) => {
    setTags(newTags);
  };

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

  return (
    <Box sx={{ p: 2 }}>
      {/* Name der Route */}
      <Typography variant="h6" gutterBottom>
        Neue Route
      </Typography>

      {/* Foto-Swipe-Box */}
      <Paper
        sx={{
          position: "relative",
          mb: 2,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <SwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {[1, 2, 3].map((step) => (
            <Box
              key={step}
              component="img"
              src={`https://picsum.photos/400/300?random=${step}`}
              alt={`Route Foto ${step}`}
              sx={{
                display: "block",
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          ))}
        </SwipeableViews>
        {/* Foto-Indikator */}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ justifyContent: "center", bgcolor: "transparent" }}
          nextButton={null}
          backButton={null}
        />
      </Paper>

      {/* Eingabefelder */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Grifffarbe"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Schwierigkeit"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Routenbezeichnung"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ort / Wand"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Paper>

      {/* Tags */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Tags
        </Typography>
        <ToggleButtonGroup
          value={tags}
          onChange={handleTagChange}
          aria-label="Routen-Tags"
          color="success"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
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
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
      </Paper>

      {/* Route festlegen Button */}
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ bgcolor: "darkgreen", "&:hover": { bgcolor: "green" } }}
        >
          Route festlegen
        </Button>
      </Box>
    </Box>
  );
}

// 👇 Titel für den Header
BoulderAddPage.title = "Neue Route";

export default BoulderAddPage;
