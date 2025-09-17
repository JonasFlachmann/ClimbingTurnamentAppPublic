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
    <Box
      sx={{
        minHeight: "100vh",
        pb: 10,
        backgroundImage: "url('/background-plants.jpg')", // hier dein Bild ins public/ legen
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "95%",
          mx: "auto",
          pt: 5,
        }}
      >
        {/* Button: Neues Turnier */}
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          sx={{
            mb: 4,
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderRadius: 3,
            boxShadow: 4,
          }}
          onClick={() => router.push("/tournament-create")}
        >
          Neues Turnier erstellen
        </Button>

        {/* News-Box */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            mb: 3,
            bgcolor: "rgba(189, 189, 189, 0.9)", // helleres Grau mit Transparenz
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
            News
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Dies ist eine Test-Version der App.
          </Typography>
        </Paper>

        {/* Turniere in der Nähe */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "success.dark" }}
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
                bgcolor: "rgba(224, 224, 224, 0.95)", // noch helleres Grau
                "&:hover": { boxShadow: 6, bgcolor: "rgba(200,200,200,0.95)" },
              }}
              onClick={() => router.push("/tournament-overview")}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
                {`Turnier ${index + 1}`}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Ort: {city}
              </Typography>
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
          bgcolor: "rgba(245, 245, 245, 0.95)",
          borderTop: 1,
          borderColor: "divider",
          py: 1,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100,
          backdropFilter: "blur(6px)", // leichter Glas-Effekt
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            color={currentPath === "/home" ? "success" : "inherit"}
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
            color={currentPath === "/map" ? "success" : "inherit"}
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
            color={currentPath === "/tournament-overview" ? "success" : "inherit"}
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