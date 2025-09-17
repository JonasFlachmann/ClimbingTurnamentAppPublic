import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      <Box sx={{ maxWidth: "95%", mx: "auto", pt: 5 }}>
        {/* News-Box */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            mb: 3,
            bgcolor: "#bdbdbd", // helleres Grau
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            News
          </Typography>
          <Typography variant="body2">
            Dies ist eine Test-Version der App.
          </Typography>
        </Paper>

        {/* Turniere in der Nähe */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
        >
          Turniere in deiner Nähe
        </Typography>

        <Stack spacing={2}>
          {["Bochum", "Dortmund", "Berlin"].map((city, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                cursor: "pointer",
                bgcolor: "#e0e0e0", // noch helleres Grau für Karten
                "&:hover": { boxShadow: 6, bgcolor: "#d6d6d6" },
              }}
              onClick={() => router.push("/tournament-overview")}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {`Turnier ${index + 1}`}
              </Typography>
              <Typography variant="body2">Ort: {city}</Typography>
            </Paper>
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
          bgcolor: "#e0e0e0", // Footer heller gemacht
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
            <Typography
              variant="caption"
              sx={{ fontWeight: currentPath === "/tournament-overview" ? "bold" : "normal" }}
            >
              Turniere
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;