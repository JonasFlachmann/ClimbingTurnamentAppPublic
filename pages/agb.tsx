"use client";

import { Box, Paper, Typography, Button } from "@mui/material";
import Link from "next/link";

const AGB_TEXT = `ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB) DER APP "ALLEZ-CLIMBING"

1. Geltungsbereich
Diese AGB regeln die Nutzung der App "ALLEZ-CLIMBING".

2. Inhalte & Uploads
- Es dürfen ausschließlich Fotos der Routen/Griffe/Umgebung ohne erkennbare Personen hochgeladen werden.
- Verboten sind beleidigende, obszöne, rechtswidrige oder diskriminierende Inhalte.
- Bei Verstößen kann der Account gesperrt oder gelöscht werden.

3. Daten & Zugriffsrechte
- Verarbeitet werden Name, E-Mail und – nach Zustimmung – Standort/Kamera.
- Nutzung nur für App-Funktionalitäten.

4. Haftung & Verfügbarkeit
- Nutzung auf eigenes Risiko.
- Keine Garantie für Verfügbarkeit oder Fehlerfreiheit.
- Dienst kann jederzeit geändert oder eingestellt werden.

5. Änderungen
Der Betreiber kann die AGB jederzeit anpassen; Nutzer werden bei wesentlichen Änderungen informiert.`;

export default function AgbPage() {
  const downloadPdf = () => {
    const blob = new Blob([AGB_TEXT], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AGB_ALLEZ-CLIMBING.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      component="main"
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        pb: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 800, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          Allgemeine Geschäftsbedingungen & Teilnahmebedingungen
        </Typography>

        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mb: 3 }}>
          {AGB_TEXT}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {/* 👉 Zurück zu Schritt 3 (Teilnahmebedingungen) */}
          <Link href="/registration-process?step=2" passHref>
            <Button variant="outlined">Zurück</Button>
          </Link>
          <Button variant="contained" color="primary" onClick={downloadPdf}>
            Als PDF herunterladen
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

;(AgbPage as any).noLayout = true;
(AgbPage as any).title = "AGB";
