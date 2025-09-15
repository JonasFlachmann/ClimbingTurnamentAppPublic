import React from "react";
import { Box, Paper, Typography, Button, Stack, Chip } from "@mui/material";
import { useRouter } from "next/router";

// Dummy-Daten für Turniere
const tournaments = [
  {
    id: 1,
    name: "Boulder Masters 2025",
    status: "Aktiv", // "Ausstehend", "Abgeschlossen"
    stadt: "Berlin",
    ort: "Boulderhalle Ostbloc",
    start: "2025-09-20",
    ende: "2025-09-21",
  },
  {
    id: 2,
    name: "Climbing Open",
    status: "Ausstehend",
    stadt: "München",
    ort: "Kletterhalle Highrise",
    start: "2025-10-05",
    ende: "2025-10-05",
  },
  {
    id: 3,
    name: "Outdoor Challenge",
    status: "Abgeschlossen",
    stadt: "Stuttgart",
    ort: "Klettergebiet Felswand",
    start: "2025-08-10",
    ende: "2025-08-11",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Aktiv":
      return "success";
    case "Ausstehend":
      return "warning";
    case "Abgeschlossen":
      return "default";
    default:
      return "primary";
  }
};

const TournamentOverviewPage: React.FC = () => {
  const router = useRouter();

  const handleTournamentClick = (id: number) => {
    // Später z.B. router.push(`/tournament/${id}`);
    router.push("/tournament");
  };

  const handleHomeClick = () => {
    router.push("/home");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
      <Typography variant="h4" sx={{ p: 3, fontWeight: "bold", textAlign: "center" }}>
        Turnierübersicht
      </Typography>
      <Stack spacing={3} sx={{ px: { xs: 2, md: 8 }, maxWidth: 700, mx: "auto" }}>
        {tournaments.map((turnier) => (
          <Paper
            key={turnier.id}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              "&:hover": { boxShadow: 8 },
            }}
            onClick={() => handleTournamentClick(turnier.id)}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                {turnier.name}
              </Typography>
              <Chip
                label={turnier.status}
                color={statusColor(turnier.status)}
                sx={{ fontWeight: "bold", fontSize: "0.95rem" }}
              />
            </Stack>
            <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
              Stadt: <strong>{turnier.stadt}</strong>
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
              Veranstaltungsort: <strong>{turnier.ort}</strong>
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Zeitraum: <strong>{turnier.start} – {turnier.ende}</strong>
            </Typography>
          </Paper>
        ))}
      </Stack>

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
          py: 2,
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleHomeClick}
          sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
};

export default TournamentOverviewPage;
