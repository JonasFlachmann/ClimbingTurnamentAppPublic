import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Swiper-Komponenten nur Client-seitig laden (SSR-sicher)
const Swiper = dynamic(() => import("swiper/react").then(m => m.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then(m => m.SwiperSlide), { ssr: false });
// ✅ Kompatibel mit Swiper v8: Module direkt aus "swiper" importieren (nicht "swiper/modules")
import { Pagination } from "swiper";

// Platzhalter-Daten (kannst du später durch echte Daten ersetzen)
type RouteItem = { id: number; name: string; thumbnail: string; photos: string[] };
type TournamentItem = { id: number; name: string; location: string; date: string };

const placeholderImg = (w: number, h: number) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
       <rect width='100%' height='100%' fill='#e5e7eb'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='14'>Platzhalter</text>
     </svg>`
  );

function HomePage() {
  const router = useRouter();

  // ------------------- Beispiel-Daten -------------------
  const currentTournamentRoutes: RouteItem[] = useMemo(
    () => [
      {
        id: 1,
        name: "Route A – Wand Links",
        thumbnail: placeholderImg(64, 48),
        photos: [placeholderImg(900, 600), placeholderImg(900, 600), placeholderImg(900, 600)],
      },
      {
        id: 2,
        name: "Route B – Überhang",
        thumbnail: placeholderImg(64, 48),
        photos: [placeholderImg(900, 600), placeholderImg(900, 600)],
      },
      {
        id: 3,
        name: "Route C – Platte",
        thumbnail: placeholderImg(64, 48),
        photos: [placeholderImg(900, 600)],
      },
    ],
    []
  );

  const nearbyTournaments: TournamentItem[] = useMemo(
    () => [
      { id: 101, name: "Boulder Night", location: "Halle Nord", date: "Fr, 20:00" },
      { id: 102, name: "Bloc Cup", location: "Kletterfabrik", date: "Sa, 15:00" },
      { id: 103, name: "Moonboard Jam", location: "Blocpark", date: "So, 12:00" },
    ],
    []
  );

  // ------------------- UI State -------------------
  const [expandedRouteIds, setExpandedRouteIds] = useState<Set<number>>(new Set());
  const [routeResult, setRouteResult] = useState<Record<number, "top" | "flash" | null>>({});
  const [photoModal, setPhotoModal] = useState<{ open: boolean; routeId: number | null; startIndex: number }>({
    open: false,
    routeId: null,
    startIndex: 0,
  });
  const [expandedTournamentIds, setExpandedTournamentIds] = useState<Set<number>>(new Set());

  // ------------------- Helpers -------------------
  const toggleRouteExpanded = (id: number) => {
    setExpandedRouteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTournamentExpanded = (id: number) => {
    setExpandedTournamentIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const setResult = (routeId: number, value: "top" | "flash" | null) => {
    setRouteResult((prev) => ({ ...prev, [routeId]: value }));
  };

  const openPhotoOverlay = (routeId: number, startIndex: number) =>
    setPhotoModal({ open: true, routeId, startIndex });

  const closePhotoOverlay = () => setPhotoModal({ open: false, routeId: null, startIndex: 0 });

  // ------------------- Gemeinsame Card-Styles (Hover) -------------------
  const cardHover = {
    transition: "box-shadow 160ms ease, transform 160ms ease",
    boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
    "&:hover": {
      boxShadow: "0px 6px 18px rgba(0,0,0,0.16)",
      transform: "translateY(-2px)",
      cursor: "pointer",
    },
  } as const;

  const innerStop = (e: React.MouseEvent) => e.stopPropagation();

  // ------------------- Render -------------------
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, display: "grid", gap: 2, maxWidth: 960, mx: "auto" }}>
      {/* Aktuelles Turnier */}
      <Paper
        elevation={0}
        sx={{ p: 2, borderRadius: 2, ...cardHover }}
        onClick={() => router.push("/tournament")}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
          Aktuelles Turnier
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Tippe auf eine Route, um Details zu sehen. Klick in den freien Bereich führt zur Turnierseite.
        </Typography>

        <List disablePadding onClick={innerStop}>
          {currentTournamentRoutes.map((route) => {
            const isOpen = expandedRouteIds.has(route.id);
            const value = routeResult[route.id] ?? null;
            return (
              <Box
                key={route.id}
                sx={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  mb: 1.25,
                  overflow: "hidden",
                  ...cardHover,
                }}
                onClick={() => toggleRouteExpanded(route.id)}
              >
                <ListItem
                  secondaryAction={
                    <ToggleButtonGroup
                      exclusive
                      size="small"
                      value={value}
                      onChange={(e, val) => setResult(route.id, val)}
                      sx={{
                        mr: 1,
                        "& .MuiToggleButton-root": {
                          borderRadius: "9999px",
                          border: "2px solid",
                          borderColor: "success.main",
                          px: 1.25,
                          py: 0.25,
                          fontWeight: 700,
                          textTransform: "none",
                          "&.Mui-selected": {
                            backgroundColor: "success.main",
                            color: "#fff",
                          },
                        },
                      }}
                      onClick={innerStop}
                    >
                      <ToggleButton value="top">Top</ToggleButton>
                      <ToggleButton value="flash">Flash</ToggleButton>
                    </ToggleButtonGroup>
                  }
                >
                  {/* Miniaturbild (Klick öffnet Overlay) */}
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      openPhotoOverlay(route.id, 0);
                    }}
                    sx={{
                      width: 64,
                      height: 48,
                      borderRadius: 1.25,
                      overflow: "hidden",
                      mr: 1.5,
                      flexShrink: 0,
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <img
                      src={route.thumbnail}
                      alt={`${route.name} Vorschaubild`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </Box>

                  <ListItemText
                    primary={route.name}
                    primaryTypographyProps={{ fontWeight: 700 }}
                    secondary={isOpen ? "Tippe erneut zum Zuklappen" : "Tippe für Details"}
                  />
                </ListItem>

                {/* Aufklappbereich */}
                {isOpen && (
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Divider sx={{ mb: 1.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Routenbezeichnung
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Platzhaltertext zur Route – z. B. Halle, Wand, Farbe, Bewertung …
                    </Typography>

                    {/* Kleines vergrößertes Bild im aufgeklappten Bereich (optional) */}
                    <Box
                      sx={{
                        mt: 1.5,
                        width: "100%",
                        height: 160,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        border: "1px solid rgba(0,0,0,0.08)",
                        backgroundColor: "#f3f4f6",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openPhotoOverlay(route.id, 0);
                      }}
                    >
                      <img
                        src={route.photos[0]}
                        alt={`${route.name} Bild`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </List>
      </Paper>

      {/* Turniere in deiner Nähe */}
      <Paper
        elevation={0}
        sx={{ p: 2, borderRadius: 2, ...cardHover }}
        onClick={() => router.push("/map")}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
          Turniere in deiner Nähe
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Klick in den freien Bereich öffnet die Karte. Ein Klick auf ein Turnier zeigt Details.
        </Typography>

        <List disablePadding onClick={innerStop}>
          {nearbyTournaments.map((t) => {
            const isOpen = expandedTournamentIds.has(t.id);
            return (
              <Box
                key={t.id}
                sx={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  mb: 1.25,
                  overflow: "hidden",
                  ...cardHover,
                }}
                onClick={() => toggleTournamentExpanded(t.id)}
              >
                <ListItem>
                  <ListItemText
                    primary={t.name}
                    secondary={`${t.location} • ${t.date}`}
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                </ListItem>

                {isOpen && (
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Divider sx={{ mb: 1.5 }} />
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                      Kurze Zusatzinfos zum Turnier. (Platzhalter)
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      component={Link}
                      href="/tournament"
                      onClick={innerStop}
                      sx={{ fontWeight: 700, borderRadius: 2 }}
                    >
                      Zum Turnier
                    </Button>
                  </Box>
                )}
              </Box>
            );
          })}
        </List>
      </Paper>

      {/* News / Hinweise */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 2, ...cardHover }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
          News
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Hinweis: Dies ist eine Test-Version der App.
        </Typography>
      </Paper>

      {/* Foto-Overlay (Swiper) */}
      <Dialog
        open={photoModal.open}
        onClose={closePhotoOverlay}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 2, overflow: "hidden" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={closePhotoOverlay} aria-label="Schließen">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ pt: 0 }}>
          {photoModal.routeId != null && (
            <Box sx={{ width: "100%", height: { xs: 300, md: 420 } }}>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                initialSlide={photoModal.startIndex}
                style={{ width: "100%", height: "100%" }}
              >
                {currentTournamentRoutes
                  .find((r) => r.id === photoModal.routeId)!
                  .photos.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          bgcolor: "#f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 1.5,
                          overflow: "hidden",
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <img
                          src={src}
                          alt={`Foto ${idx + 1}`}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// 👇 Titel für den globalen Header festlegen
(HomePage as any).title = "Home";
// Layout verwenden (kein noLayout-Flag gesetzt)

export default HomePage;