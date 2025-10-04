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
  Dialog,
  DialogContent,
} from "@mui/material";
import SwiperCarousel from "../components/SwiperCarousel";

function HomePage() {
  // Beispielrouten für aktuelles Turnier
  const [selectedResults, setSelectedResults] = useState<{ [key: number]: string }>({});
  // Auf-/Zuklappen der Detailsektion pro Route (Buttons bleiben immer sichtbar)
  const [detailsOpen, setDetailsOpen] = useState<{ [key: number]: boolean }>({});
  // Vollbild-Preview Zustände
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewRouteId, setPreviewRouteId] = useState<number | null>(null);

  const handleResultClick = (routeId: number, result: string) => {
    setSelectedResults((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === result ? "" : result,
    }));
  };

  const toggleDetails = (routeId: number) => {
    setDetailsOpen((prev) => ({
      ...prev,
      [routeId]: !prev[routeId],
    }));
  };

  const openPreview = (routeId: number) => {
    setPreviewRouteId(routeId);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewRouteId(null);
  };

  // Platzhalter-Grafik (graues Rechteck) als Data-URL (svg)
  const grayDataUrl = (w: number, h: number) =>
    `data:image/svg+xml;utf8,` +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#BDBDBD'/></svg>`
    );

  const routes = [
    { id: 1, name: "Route 1", color: "Gelb", grade: "6c", wall: "Wand A (Süd)", gymName: "Gelb 6c – Platte" },
    { id: 2, name: "Route 2", color: "Blau", grade: "7a", wall: "Wand B (West)", gymName: "Blau 7a – Überhang" },
    { id: 3, name: "Route 3", color: "Rot", grade: "6b+", wall: "Wand C (Nord)", gymName: "Rot 6b+ – Kante" },
  ];

  const tournaments = [
    { id: 1, name: "Boulder Cup", city: "Bochum", location: "Neoliet", date: "1. bis 7. September" },
    { id: 2, name: "Kletter Open", city: "Dortmund", location: "Bergwerk", date: "17. Juli" },
    { id: 3, name: "Summer Jam", city: "Berlin", location: "Boulderwelt", date: "06/2024" },
  ];

  // Gemeinsamer Kartenstil (Schatten + Hover)
  const cardSx = {
    p: 2,
    mb: 3,
    borderRadius: 3,
    boxShadow: 3,
    transition: "transform .15s ease, box-shadow .15s ease",
    "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
  } as const;

  // Swiper-Slides (Platzhalter-Bilder) – Nutzung der globalen Swiper-Komponente
  const placeholderSlides = [grayDataUrl(1600, 1000), grayDataUrl(1600, 1000), grayDataUrl(1600, 1000)];

  return (
    <Box sx={{ p: 2 }}>
      {/* Aktuelles Turnier */}
      <Paper sx={cardSx}>
        <Typography variant="h6" gutterBottom>
          Aktuelles Turnier
        </Typography>
        <List>
          {routes.map((route) => (
            <React.Fragment key={route.id}>
              <ListItem
                divider
                onClick={() => toggleDetails(route.id)}
                sx={{
                  borderRadius: 2,
                  transition: "background-color .15s ease",
                  "&:hover": { bgcolor: "action.hover", cursor: "pointer" },
                }}
              >
                <ListItemText primary={route.name} secondary={`${route.color} - ${route.grade}`} />
                <ButtonGroup
                  size="small"
                  variant="outlined"
                  onClick={(e) => e.stopPropagation()}
                >
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

              {/* Ausklappbare Details unterhalb der Route */}
              <Collapse in={!!detailsOpen[route.id]} timeout="auto" unmountOnExit>
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Wand/Ort: {route.wall}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Bezeichnung (Halle): {route.gymName}
                  </Typography>

                  {/* Miniatur – graues Rechteck, klickbar für Vollbild */}
                  <Box
                    role="button"
                    aria-label="Route-Foto öffnen"
                    onClick={() => openPreview(route.id)}
                    sx={{
                      width: "100%",
                      height: 160,
                      borderRadius: 2,
                      backgroundImage: `url(${grayDataUrl(800, 500)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      boxShadow: 1,
                      transition: "transform .15s ease, box-shadow .15s ease",
                      "&:hover": { transform: "translateY(-1px)", boxShadow: 3, cursor: "zoom-in" },
                    }}
                  />
                </Box>
              </Collapse>

              <Divider component="li" />
            </React.Fragment>
          ))}
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

      {/* Neues Turnier anlegen (Link unverändert lassen) */}
      <Paper sx={{ ...cardSx, textAlign: "center" }}>
        <Button variant="contained" color="success" href="/tournament-define">
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

      {/* Vollbild-Dialog mit globalem Swiper */}
      <Dialog fullScreen open={previewOpen} onClose={closePreview}>
        <DialogContent sx={{ p: 0 }}>
          {/* Wir nutzen den globalen Swiper-Wrapper; Übergabe von Platzhalter-Bildern */}
          {/* Typenflexibel, falls die Prop-Signatur abweicht */}
          {(() => {
            const AnySwiper: any = SwiperCarousel;
            return <AnySwiper images={placeholderSlides} />;
          })()}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// Titel für den globalen Header festlegen
HomePage.title = "Home";

export default HomePage;
