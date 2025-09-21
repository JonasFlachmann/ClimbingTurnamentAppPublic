"use client";

import { Box, Paper, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function AgbPage() {
  const agbText = `
ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB) DER APP "ALLEZ-CLIMBING"

1. Geltungsbereich
Diese AGB regeln die Nutzung der App "ALLEZ-CLIMBING".

2. Nutzerpflichten und verbotene Inhalte
- Es dürfen ausschließlich Fotos von Kletterrouten und relevanten Umgebungen hochgeladen werden.
- Das Hochladen von Bildern von Personen oder unangemessenen Inhalten ist verboten.
- Verstöße können zur Sperrung oder Löschung des Nutzerkontos führen.

3. Datennutzung
Die App verarbeitet personenbezogene Daten (z. B. Name, E-Mail, ggf. Standortdaten). 
Diese werden ausschließlich im Rahmen der App-Funktionalitäten genutzt.

4. Haftungsausschluss
Die Nutzung erfolgt auf eigenes Risiko. Der Betreiber übernimmt keine Gewähr 
für die ständige Verfügbarkeit oder fehlerfreie Funktion der App.

5. Änderungen
Der Betreiber behält sich vor, diese AGB jederzeit anzupassen.
  `;

  const downloadPdf = () => {
    const blob = new Blob([agbText], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AGB_ALLEZ-CLIMBING.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        pb: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 800, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Allgemeine Geschäftsbedingungen
        </Typography>

        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap", mb: 3 }}
        >
          {agbText}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Link href="/register" passHref>
            <Button variant="outlined">Zurück</Button>
          </Link>
          <Button variant="contained" color="primary" onClick={downloadPdf}>
            AGB als PDF herunterladen
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}