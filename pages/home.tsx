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

  const routes = [
    { id: 1, name: "Boulder A", grade: "6A", tries: ["Top", "Zone", "DNF"] },
    { id: 2, name: "Boulder B", grade: "6B", tries: ["Top", "Zone", "DNF"] },
    { id: 3, name: "Boulder C", grade: "6A+", tries: ["Top", "Zone", "DNF"] },
  ];

  const newsItems = [
    { id: 1, title: "App-Update v0.1.0", date: "01. Okt" },
    { id: 2, title: "Neuer Wettbewerb online", date: "15. Okt" },
    { id: 3, title: "Sommerpause beendet", date: "01. Juli" },
  ];

  const toggleResult = (routeId: number, result: string) => {
    setSelectedResults((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === result ? "" : result,
    }));
  };

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
                    {route.tries.map((t) => (
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
                <ListItemText primary={`${route.name} (${route.grade})`} />
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
