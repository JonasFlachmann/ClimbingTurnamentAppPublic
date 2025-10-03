// pages/home.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
  Divider,
} from "@mui/material";

function HomePage() {
  // Beispielrouten für aktuelles Turnier
  const [selectedResults, setSelectedResults] = useState<{ [key: number]: string }>({});

  const toggleResult = (routeId: number, result: string) => {
    setSelectedResults((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === result ? "" : result,
    }));
  };

  const routes = [
    { id: 1, name: "Route 1", color: "Gelb", grade: "6c" },
    { id: 2, name: "Route 2", color: "Blau", grade: "7a" },
    { id: 3, name: "Route 3", color: "Rot", grade: "6b+" },
  ];

  const tournaments = [
    { id: 1, name: "Boulder Cup", city: "Bochum", location: "Neoliet", date: "1. bis 7. September" },
    { id: 2, name: "Kletter Open", city: "Dortmund", location: "Bergwerk", date: "17. Juli" },
    { id: 3, name: "Summer Jam", city: "Berlin", location: "BertaBlock", date: "3. August" },
  ];

  const newsItems = [
    { id: 1, title: "App-Update v0.1.0", date: "01. Okt" },
    { id: 2, title: "Neuer Wettbewerb online", date: "15. Okt" },
    { id: 3, title: "Sommerpause beendet", date: "01. Juli" },
  ];

  return (
    <Box sx={{ px: 2, pb: 10, pt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
        Willkommen zurück!
      </Typography>

      {/* Aktuelles Turnier */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Aktuelles Turnier
        </Typography>
        <List dense>
          {routes.map((route, index) => (
            <React.Fragment key={route.id}>
              <ListItem
                secondaryAction={
                  <ButtonGroup size="small" variant="outlined">
                    {["Top", "Zone", "DNF"].map((t) => (
                      <Button
                        key={t}
                        color={selectedResults[route.id] === t ? "success" : "inherit"}
                        onClick={() => toggleResult(route.id, t)}
                      >
                        {t}
                      </Button>
                    ))}
                  </ButtonGroup>
                }
              >
                <ListItemText primary={`${route.name} (${route.grade})`} secondary={`Farbe: ${route.color}`} />
              </ListItem>
              {index < routes.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Neues Turnier anlegen */}
      <Paper sx={{ p: 2, mb: 3, textAlign: "center" }}>
        <Button variant="contained" color="success" href="/tournament-create">
          Neues Turnier anlegen
        </Button>
      </Paper>

      {/* Turniere in deiner Nähe (Dummy) */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Turniere in deiner Nähe
        </Typography>
        <List dense>
          {tournaments.map((t, idx) => (
            <React.Fragment key={t.id}>
              <ListItem>
                <ListItemText primary={t.name} secondary={`${t.city} • ${t.location} • ${t.date}`} />
              </ListItem>
              {idx < tournaments.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* News */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          News
        </Typography>
        <List dense>
          {newsItems.map((n, idx) => (
            <React.Fragment key={n.id}>
              <ListItem>
                <ListItemText primary={n.title} secondary={n.date} />
              </ListItem>
              {idx < newsItems.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

// Titel für den globalen Header
(HomePage as any).title = "Home";

export default HomePage;
