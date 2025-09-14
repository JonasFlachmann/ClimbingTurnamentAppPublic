import React from "react";
import { Card, CardContent, Typography, Grid, Box, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Link from "next/link";

// Mock-Daten für Turniere
const currentTournaments = [
  {
    id: 1,
    name: "Herbst Boulder Cup",
    location: "München",
    date: "2025-09-20",
    status: "Laufend",
  },
  {
    id: 2,
    name: "Nordwand Challenge",
    location: "Hamburg",
    date: "2025-09-22",
    status: "Laufend",
  },
];

const nearbyTournaments = [
  {
    id: 3,
    name: "Süddeutscher Boulder Meister",
    location: "Stuttgart",
    date: "2025-10-02",
    status: "Vorschau",
  },
  {
    id: 4,
    name: "Alpen Boulder Open",
    location: "Garmisch-Partenkirchen",
    date: "2025-10-10",
    status: "Vorschau",
  },
];

// Card-Komponente für Turnier
const TournamentCard = ({ tournament }: { tournament: any }) => (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6">{tournament.name}</Typography>
      <Typography color="text.secondary">{tournament.location}</Typography>
      <Typography color="text.secondary">{tournament.date}</Typography>
      <Typography
        sx={{
          fontWeight: "bold",
          color: tournament.status === "Laufend" ? "green" : "orange",
        }}
      >
        {tournament.status}
      </Typography>
    </CardContent>
  </Card>
);

const TournamentOverview: React.FC = () => {
  const [value, setValue] = React.useState(2);

  return (
    <>
      <Box sx={{ padding: 3, paddingBottom: 10 }}>
        <Typography variant="h4" gutterBottom>
          Turnier-Übersicht
        </Typography>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Laufende Turniere
          </Typography>
          <Grid container spacing={2}>
            {currentTournaments.map((tournament) => (
              <Grid item xs={12} sm={6} md={4} key={tournament.id}>
                <TournamentCard tournament={tournament} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginTop: 6 }}>
          <Typography variant="h5" gutterBottom>
            Turniere in deiner Nähe
          </Typography>
          <Grid container spacing={2}>
            {nearbyTournaments.map((tournament) => (
              <Grid item xs={12} sm={6} md={4} key={tournament.id}>
                <TournamentCard tournament={tournament} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Footer Navigation */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            href="/"
          />
          <BottomNavigationAction
            label="Karte"
            icon={<MapIcon />}
            component={Link}
            href="/map"
          />
          <BottomNavigationAction
            label="Turniere"
            icon={<SportsHandballIcon />}
            component={Link}
            href="/tournament-overview"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default TournamentOverview;
