import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper"; // ✅ für Swiper v8
import "swiper/css";
import "swiper/css/pagination";

// Globale Styles (z. B. Hover-Effekt, Schatten) kommen aus theme

const placeholderImages = [
  "#ccc",
  "#bbb",
  "#aaa",
  "#999",
]; // Graue Platzhalter für Swiper

export default function Home() {
  const router = useRouter();

  const [openRoute, setOpenRoute] = useState<string | null>(null);
  const [selectedTF, setSelectedTF] = useState<{ [key: string]: string | null }>({});
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleToggle = (routeId: string, value: string) => {
    setSelectedTF((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === value ? null : value,
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Aktuelles Turnier */}
      <Card
        sx={{
          mb: 4,
          cursor: "pointer",
          "&:hover": { boxShadow: 6 },
        }}
        onClick={() => router.push("/tournament")}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Aktuelles Turnier
          </Typography>

          {["Route 1", "Route 2", "Route 3"].map((route) => (
            <Box
              key={route}
              sx={{
                mt: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#fafafa",
                "&:hover": { boxShadow: 4 },
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenRoute(openRoute === route ? null : route);
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Miniaturfoto */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#ccc",
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImage("#ccc"); // Beispiel, Platzhalter
                  }}
                />
                <Typography variant="subtitle1">{route}</Typography>
              </Box>

              {/* Aufklappen */}
              {openRoute === route && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Routenbezeichnung: {route}</Typography>

                  {/* Swiper für Fotos */}
                  <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    style={{ marginTop: 16 }}
                  >
                    {placeholderImages.map((color, idx) => (
                      <SwiperSlide key={idx}>
                        <Box
                          sx={{
                            width: "100%",
                            height: 200,
                            backgroundColor: color,
                            borderRadius: 2,
                          }}
                          onClick={() => setModalImage(color)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* T/F Buttons */}
                  <ToggleButtonGroup
                    value={selectedTF[route] || null}
                    exclusive
                    onChange={(_, value) => value && handleToggle(route, value)}
                    sx={{ mt: 2 }}
                  >
                    <ToggleButton
                      value="T"
                      sx={{
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        color: selectedTF[route] === "T" ? "white" : "green",
                        backgroundColor: selectedTF[route] === "T" ? "green" : "transparent",
                        "&:hover": { backgroundColor: "rgba(0,128,0,0.1)" },
                      }}
                    >
                      T
                    </ToggleButton>
                    <ToggleButton
                      value="F"
                      sx={{
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        color: selectedTF[route] === "F" ? "white" : "green",
                        backgroundColor: selectedTF[route] === "F" ? "green" : "transparent",
                        "&:hover": { backgroundColor: "rgba(0,128,0,0.1)" },
                      }}
                    >
                      F
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              )}
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Turniere in deiner Nähe */}
      <Card
        sx={{
          cursor: "pointer",
          "&:hover": { boxShadow: 6 },
        }}
        onClick={() => router.push("/map")}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Turniere in deiner Nähe
          </Typography>

          {["Boulder Cup", "Sommer Jam"].map((tournament) => (
            <Box
              key={tournament}
              sx={{
                mt: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#fafafa",
                "&:hover": { boxShadow: 4 },
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenRoute(openRoute === tournament ? null : tournament);
              }}
            >
              <Typography variant="subtitle1">{tournament}</Typography>

              {openRoute === tournament && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Ort: Beispielhalle<br />
                    Datum: 12.10.2025
                  </Typography>
                  <Box
                    component="button"
                    onClick={() => router.push("/tournament")}
                    style={{
                      marginTop: 12,
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Zum Turnier
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Modal für großes Bild */}
      <Modal open={!!modalImage} onClose={() => setModalImage(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => setModalImage(null)}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              width: "80vw",
              height: "60vh",
              backgroundColor: modalImage || "#ccc",
              borderRadius: 2,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}