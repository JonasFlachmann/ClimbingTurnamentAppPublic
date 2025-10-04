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
  Collapse,
} from "@mui/material";

function HomePage() {
  // Beispielrouten für aktuelles Turnier
  const [selectedResults, setSelectedResults] = useState<{ [key: number]: string }>({});
  // Auf-/Zuklappen der Button-Gruppe pro Route (standardmäßig offen)
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const handleResultClick = (routeId: number, result: string) => {
    setSelectedResults((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === result ? "" : result,
    }));
  };

  const toggleExpanded = (routeId: number) => {
    setExpanded((prev) => ({
      ...prev,
      [routeId]: prev[routeId] ?? true ? !prev[routeId] : false,
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

  // Gemeinsamer Kartenstil (Schatten + Hover), an tournament-overview angelehnt
  const cardSx = {
    p: 2,
    mb: 3,
    borderRadius: 3,
    elevation: 3 as 3,
    transition: "transform .15s ease, box-shadow .15s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: 6,
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Aktuelles Turnier */}
      <Paper sx={cardSx}>
        <Typography variant="h6" gutterBottom>
          Aktuelles Turnier
        </Typography>
        <List>
          {routes.map((route) => {
            const isOpen = expanded[route.id] ?? true;
            return (
              <ListItem
                key={route.id}
                divider
                onClick={() => toggleExpanded(route.id)}
                sx={{
                  borderRadius: 2,
                  transition: "background-color .15s ease",
                  "&:hover": { bgcolor: "action.hover", cursor: "pointer" },
                }}
              >
                <ListItemText
                  primary={route.name}
                  secondary={`${route.color} - ${route.grade}`}
                />
                <Collapse in={isOpen} orientation="horizontal" unmountOnExit={false} appear={false}>
                  <ButtonGroup size="small" variant="outlined" sx={{ ml: 2 }}>
                    <Button
                      color={selectedResults[route.id] === "Z" ? "success" : "inherit"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResultClick(route.id, "Z");
                      }}
                    >
                      Z
                    </Button>
                    <Button
                      color={selectedResults[route.id] === "T" ? "success" : "inherit"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResultClick(route.id, "T");
                      }}
                    >
                      T
                    </Button>
                    <Button
                      color={selectedResults[route.id] === "F" ? "success" : "inherit"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResultClick(route.id, "F");
                      }}
                    >
                      F
                    </Button>
                  </ButtonGroup>
                </Collapse>
              </ListItem>
            );
          })}
        </List>
      </Paper>

      {/* Turniere in deiner Nähe */}
      <Paper sx={cardSx}>
        <Typography variant="h6" gutterBottom>
          Turniere in deiner Nähe
        </Typography>
        <List>
          {tournaments.map((t) => (
            <React.Fragment key={t.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  borderRadius: 2,
                  transition: "background-color .15s ease",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
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
      <Paper sx={{ ...cardSx, textAlign: "center" }}>
        <Button variant="contained" color="success" href="/tournament-create">
          Neues Turnier anlegen
        </Button>
      </Paper>

      {/* News */}
      <Paper sx={cardSx}>
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

// Titel für den globalen Header festlegen
HomePage.title = "Home";

export default HomePage;
