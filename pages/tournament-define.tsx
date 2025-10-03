import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

const TournamentDefinePage: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  // State für alle Felder
  const [name, setName] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState("Halle");
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [sport, setSport] = useState("Bouldern");
  const [difficulty, setDifficulty] = useState("");
  const [scoring, setScoring] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState("");

  const handleContinue = () => {
    // Optional: Hier könntest du die Daten speichern/übergeben
    router.push("/tournament-fill");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", pt: 5 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Turnier anlegen
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Turniername"
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              required
            />

            <Stack>
              <Typography sx={{ mb: 1 }}>Halle / Outdoor</Typography>
              <ToggleButtonGroup
                exclusive
                value={indoorOutdoor}
                onChange={(_, value) => value && setIndoorOutdoor(value)}
                sx={{ mb: 1 }}
              >
                <ToggleButton value="Halle" sx={{ px: 3 }}>Halle</ToggleButton>
                <ToggleButton value="Outdoor" sx={{ px: 3 }}>Outdoor</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <TextField
              label="Stadt"
              variant="outlined"
              value={city}
              onChange={e => setCity(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Ausrichtungsort"
              variant="outlined"
              value={venue}
              onChange={e => setVenue(e.target.value)}
              fullWidth
              required
            />

            <Stack>
              <Typography sx={{ mb: 1 }}>Sportart</Typography>
              <ToggleButtonGroup
                exclusive
                value={sport}
                onChange={(_, value) => value && setSport(value)}
                sx={{ mb: 1 }}
              >
                <ToggleButton value="Bouldern" sx={{ px: 3 }}>Bouldern</ToggleButton>
                <ToggleButton value="Klettern" sx={{ px: 3 }}>Klettern</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <TextField
              label="Schwierigkeit"
              variant="outlined"
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Wertungssystem"
              variant="outlined"
              value={scoring}
              onChange={e => setScoring(e.target.value)}
              fullWidth
              required
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Startdatum"
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ width: "50%" }}
              />
              <TextField
                label="Enddatum"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ width: "50%" }}
              />
            </Stack>

            <Stack>
              <Typography sx={{ mb: 1 }}>Öffentlich / Privat</Typography>
              <ToggleButtonGroup
                exclusive
                value={isPublic ? "Öffentlich" : "Privat"}
                onChange={(_, value) => {
                  if (value) setIsPublic(value === "Öffentlich");
                }}
                sx={{ mb: 1 }}
              >
                <ToggleButton value="Öffentlich" sx={{ px: 3 }}>Öffentlich</ToggleButton>
                <ToggleButton value="Privat" sx={{ px: 3 }}>Privat</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <TextField
              label="Turnierbeschreibung (optional)"
              variant="outlined"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: "bold", mt: 2 }}
              onClick={handleContinue}
              fullWidth
            >
              Weiter
            </Button>
          </Stack>
        </Paper>
      </Box>
      {/* Footer identisch zu home.tsx */}
      <Box
        component="footer"
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          py: 1,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color={currentPath === "/home" ? "primary" : "inherit"}
            onClick={() => router.push("/home")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column" }}
          >
            <HomeIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/home" ? "bold" : "normal" }}>
              Home
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color={currentPath === "/map" ? "primary" : "inherit"}
            onClick={() => router.push("/map")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column" }}
          >
            <MapIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/map" ? "bold" : "normal" }}>
              Karte
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color={currentPath === "/tournament-overview" ? "primary" : "inherit"}
            onClick={() => router.push("/tournament-overview")}
            sx={{ minWidth: 0, p: 0, display: "flex", flexDirection: "column" }}
          >
            <EmojiEventsIcon />
            <Typography variant="caption" sx={{ fontWeight: currentPath === "/tournament-overview" ? "bold" : "normal" }}>
              Turniere
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentDefinePage;
