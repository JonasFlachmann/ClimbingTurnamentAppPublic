import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const MapPage: React.FC = () => {
  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 2, pb: 10, pt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Karte
        </Typography>

        <Paper
          elevation={2}
          sx={{
            borderRadius: 4,
            p: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 240,
          }}
        >
          {/* Hier könnte eine Kartenkomponente wie Google Maps eingebunden werden */}
          <Typography variant="body2" color="text.secondary">[Kartenansicht folgt]</Typography>
        </Paper>
      </Box>

      {/* Platzhalter für evtl. lokale Aktionsleiste (bewusst leer gelassen) */}
      <Paper elevation={0} sx={{ display: "none" }} />
    </>
  );
};

export default MapPage;
