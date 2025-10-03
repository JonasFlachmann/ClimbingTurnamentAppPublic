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

  const handleResultClick = (routeId: number, result: string) => {
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
    { id: 3, name: "Summer Jam", city: "Berlin", location: "Boulderwelt", date: "06/2024" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Aktuelles Turnier */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Aktuelles Turnier
        </Typography>
        <List>
          {routes.map((route) => (
            <ListItem key={route.id} divider>
              <ListItemText
                primary={route.name}
                secondary={`${route.color} - ${route.grade}`}
              />
              <ButtonGroup size="small" variant="outlined">
                <Button
                  color={selectedResults[route.id] === "Z" ? "success" : "inherit"}
                  onClick={() => handleResultClick(route.id, "Z")}
                >
                  Z
                </Button>
                <Button
                  color={selectedResults[route.id] === "T" ? "success" : "inherit"}
                  onClick={() => handleResultClick(route.id, "T")}
                >
                  T
                </Button>
                <Button
                  color={selectedResults[route.id] === "F" ? "success" : "inherit"}
                  onClick={() => handleResultClick(route.id, "F")}
                >
                  F
                </Button>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Turniere in deiner Nähe */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Turniere in deiner Nähe
        </Typography>
        <List>
          {tournaments.map((t) => (
            <React.Fragment key={t.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={t.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {t.city} – {t.location}
                      </Typography>
                      <br />
                      {t.date}
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Neues Turnier anlegen */}
      <Paper sx={{ p: 2, mb: 3, textAlign: "center" }}>
        <Button variant="contained" color="success" href="/tournament-define">
          Neues Turnier anlegen
        </Button>
      </Paper>

      {/* News */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          News
        </Typography>
        <Typography variant="body2">
          Hinweis: Dies ist eine Test-Version der App.
        </Typography>
      </Paper>
    </Box>
  );
}

// 👇 Titel für den globalen Header festlegen
HomePage.title = "Home";

export default HomePage;
