import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Collapse,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

const currentTournament = {
  id: 99,
  name: "Sommer Cup Bochum",
  city: "Bochum",
  venue: "Neoliet",
  date: "20. – 21. September",
  routes: [
    { id: 1, name: "Überhang", color: "Rot", difficulty: "6b" },
    { id: 2, name: "Platte", color: "Gelb", difficulty: "5c" },
    { id: 3, name: "Dachkante", color: "Blau", difficulty: "7a" },
    { id: 4, name: "Balance", color: "Grün", difficulty: "6a+" },
  ],
};

const HomePage: React.FC = () => {
  const [results, setResults] = useState<{ [key: number]: { zone: boolean; top: boolean; flash: boolean } }>({});
  const router = useRouter();
  const currentPath = router.pathname;

  const toggleResult = (routeId: number, field: "zone" | "top" | "flash") => {
    setResults((prev) => ({
      ...prev,
      [routeId]: {
        ...prev[routeId],
        [field]: !prev[routeId]?.[field],
      },
    }));
  };

  return (
    <Box sx={{ maxWidth: "95%", mx: "auto", pt: 5 }}>
      {/* Aktuelles Turnier */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "success.dark" }}>
        Aktuelles Turnier
      </Typography>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3, mb: 2, bgcolor: "rgba(224, 224, 224, 0.95)" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
          {currentTournament.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          {currentTournament.city} – {currentTournament.date}
        </Typography>

        {/* Scrollbare Routensammlung */}
        <Stack spacing={1} sx={{ maxHeight: 220, overflowY: "auto", pr: 1 }}>
          {currentTournament.routes.map((r) => (
            <Paper key={r.id} sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(245,245,245,0.95)" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                {/* Name */}
                <Typography sx={{ fontWeight: "bold" }}>{r.name}</Typography>
                {/* Buttons */}
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant={results[r.id]?.zone ? "contained" : "outlined"}
                    color="success"
                    onClick={() => toggleResult(r.id, "zone")}
                  >
                    Zone
                  </Button>
                  <Button
                    size="small"
                    variant={results[r.id]?.top ? "contained" : "outlined"}
                    color="success"
                    onClick={() => toggleResult(r.id, "top")}
                  >
                    Top
                  </Button>
                  <Button
                    size="small"
                    variant={results[r.id]?.flash ? "contained" : "outlined"}
                    color="success"
                    onClick={() => toggleResult(r.id, "flash")}
                  >
                    Flash
                  </Button>
                </Stack>
              </Stack>
              {/* Farbe + Grad */}
              <Typography sx={{ color: "text.secondary" }}>
                {r.color} – {r.difficulty}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default HomePage;