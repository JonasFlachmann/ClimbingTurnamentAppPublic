import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

// Dummy Turniere
const dummyTournaments = [
  {
    id: 1,
    name: "Sommer Cup",
    start: "2025-09-01",
    end: "2025-09-07",
    city: "Bochum",
    venue: "Neoliet",
  },
  {
    id: 2,
    name: "Herbst Boulder Jam",
    start: "2025-07-17",
    end: "2025-07-17",
    city: "Dortmund",
    venue: "Bergwerk",
  },
  {
    id: 3,
    name: "Winter Masters",
    start: "2024-12-10",
    end: "2024-12-10",
    city: "Berlin",
    venue: "Boulderwelt",
  },
];

// Datumshilfe
const formatDate = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();
  const currentYear = now.getFullYear();

  const monthNames = [
    "Januar","Februar","März","April","Mai","Juni",
    "Juli","August","September","Oktober","November","Dezember",
  ];

  if (start === end) {
    if (startDate.getFullYear() === currentYear) {
      return `${startDate.getDate()}. ${monthNames[startDate.getMonth()]}`;
    } else {
      return `${String(startDate.getMonth() + 1).padStart(2, "0")}/${startDate.getFullYear()}`;
    }
  }

  if (startDate.getFullYear() !== endDate.getFullYear()) {
    return `${String(startDate.getMonth() + 1).padStart(2, "0")}/${startDate.getFullYear()} - ${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}/${endDate.getFullYear()}`;
  }

  if (startDate.getFullYear() !== currentYear) {
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${String(startDate.getMonth() + 1).padStart(2, "0")}/${startDate.getFullYear()}`;
    }
    return `${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}/${startDate.getFullYear()}`;
  }

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()}. bis ${endDate.getDate()}. ${monthNames[startDate.getMonth()]}`;
  } else {
    return `${startDate.getDate()}. ${monthNames[startDate.getMonth()]} – ${endDate.getDate()}. ${monthNames[endDate.getMonth()]}`;
  }
};

const TournamentCreatePage: React.FC = () => {
  const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const currentPath = router.pathname;

  const handleOpenDetails = (id: number) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push("/tournament-define");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Box sx={{ maxWidth: "95%", mx: "auto", pt: 5 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mb: 4, fontWeight: "bold", fontSize: "1.1rem" }}
          onClick={() => router.push("/tournament-define")}
        >
          Neues Turnier anlegen
        </Button>

        <Stack spacing={2}>
          {dummyTournaments.map((t) => (
            <Box key={t.id}>
              {/* Eingeklappt */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 8, bgcolor: "action.hover" },
                }}
                onClick={() => handleOpenDetails(t.id)}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {t.name}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography>{t.city}</Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleAddClick(e, t.id)}
                    sx={{ ml: 1 }}
                    aria-label="Turnier duplizieren/erstellen"
                  >
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </Stack>
              </Paper>

              {/* Ausgeklappt */}
              <Collapse in={openDetails[t.id] || false}>
                <Paper
                  elevation={0}
                  sx={{ bgcolor: "background.default", p: 2, mt: 1, mb: 1 }}
                >
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Turnier-Infos:
                  </Typography>
                  <Typography>Stadt: {t.city}</Typography>
                  <Typography>Austragungsort: {t.venue}</Typography>
                  <Typography>Datum: {formatDate(t.start, t.end)}</Typography>
                </Paper>
              </Collapse>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Footer */}
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

export default TournamentCreatePage;