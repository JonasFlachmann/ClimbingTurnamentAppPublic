import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Dummy-Routen
const routes = [
  { id: 1, name: "Route A – Wand Links" },
  { id: 2, name: "Route B – Überhang" },
  { id: 3, name: "Route C – Platte" },
];

// Dummy-Turniere
const tournaments = [
  { id: 1, name: "Sommer Cup 2025" },
  { id: 2, name: "Hallenmeisterschaft" },
];

export default function Home() {
  const router = useRouter();
  const [openRoute, setOpenRoute] = useState<number | null>(null);
  const [results, setResults] = useState<Record<number, string>>({});

  const handleToggle = (routeId: number, val: string | null) => {
    if (!val) return;
    setResults((prev) => ({ ...prev, [routeId]: val }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Aktuelles Turnier */}
      <Card
        sx={{ mb: 3, cursor: "pointer" }}
        onClick={() => router.push("/tournament")}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Aktuelles Turnier
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Tippe auf eine Route, um Details zu sehen. Klick in den freien
            Bereich führt zur Turnierseite.
          </Typography>

          {routes.map((route) => (
            <Card
              key={route.id}
              variant="outlined"
              sx={{
                my: 1,
                p: 1,
                "&:hover": { boxShadow: 3 },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenRoute(openRoute === route.id ? null : route.id);
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Platzhalter Mini-Foto */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "grey.300",
                    borderRadius: 1,
                    mr: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Optional: hier könnte ein Modal für Großansicht kommen
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{route.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tippe für Details
                  </Typography>
                </Box>

                {/* T/F Buttons */}
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={results[route.id] || null}
                  onChange={(e, val) => handleToggle(route.id, val)}
                  sx={{
                    "& .MuiToggleButton-root": {
                      borderRadius: "9999px",
                      border: "2px solid",
                      borderColor: "success.main",
                      px: 1.25,
                      py: 0.25,
                      fontWeight: 700,
                      textTransform: "none",
                      color: "success.main",
                      backgroundColor: "#fff",
                      "&.Mui-selected": {
                        backgroundColor: "success.main",
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ToggleButton value="top">T</ToggleButton>
                  <ToggleButton value="flash">F</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* Aufklappbereich */}
              {openRoute === route.id && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Routenbezeichnung</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Platzhaltertext zur Route – z. B. Halle, Wand, Farbe,
                    Bewertung …
                  </Typography>

                  {/* Swiper mit Platzhaltern */}
                  <Box sx={{ mt: 2 }}>
                    <Swiper
                      modules={[Pagination]}
                      pagination={{ clickable: true }}
                      spaceBetween={10}
                      slidesPerView={1}
                      style={{ borderRadius: "8px", overflow: "hidden" }}
                    >
                      {[1, 2, 3].map((n) => (
                        <SwiperSlide key={n}>
                          <Box
                            sx={{
                              width: "100%",
                              height: 180,
                              bgcolor: "grey.300",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="caption">
                              Platzhalter {n}
                            </Typography>
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                </Box>
              )}
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Turniere in der Nähe */}
      <Card
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/map")}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Turniere in deiner Nähe
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Klick in den freien Bereich öffnet die Karte.
          </Typography>

          {tournaments.map((t) => (
            <Card
              key={t.id}
              variant="outlined"
              sx={{
                my: 1,
                p: 1,
                "&:hover": { boxShadow: 3 },
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Hier könnte ein Aufklapper mit Details kommen
              }}
            >
              <Typography variant="subtitle1">{t.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                Tippe für Details
              </Typography>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}