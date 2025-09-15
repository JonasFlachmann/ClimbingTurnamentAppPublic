import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  Stack,
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

  const handleCreate = () => {
    // TODO: Turnier-Logik einbauen
    alert("Turnier erfolgreich erstellt!");
    router.push("/tournament-overview");
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
            <FormControl fullWidth>
              <InputLabel id="indoor-outdoor-label">Halle/Outdoor</InputLabel>
              <Select
                labelId="indoor-outdoor-label"
                value={indoorOutdoor}
                label="Halle/Outdoor"
                onChange={e => setIndoorOutdoor(e.target.value)}
              >
                <MenuItem value="Halle">Halle</MenuItem>
                <MenuItem value="Outdoor">Outdoor</MenuItem>
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel id="sport-label">Sportart</InputLabel>
              <Select
                labelId="sport-label"
                value={sport}
                label="Sportart"
                onChange={e => setSport(e.target.value)}
              >
                <MenuItem value="Bouldern">Bouldern</MenuItem>
                <MenuItem value="Klettern">Klettern</MenuItem>
              </Select>
            </FormControl>
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
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  onChange={e => setIsPublic(e.target.checked)}
                  color="primary"
                />
              }
              label={isPublic ? "Öffentlich" : "Privat"}
            />
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
              onClick={handleCreate}
              fullWidth
            >
              Turnier erstellen
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
