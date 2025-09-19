import { createTheme, alpha } from "@mui/material/styles";

/** Glas-Effekt (z. B. für Header/Footer) */
export const glass = (opacity: number = 0.85) => (theme: any) => ({
  backgroundColor: alpha(theme.palette.success.main, opacity),
  backdropFilter: "blur(6px)",
});

/** Helle Card-Hintergründe (z. B. alternative weiße Cards) */
export const softCardBg = (theme: any) => alpha("#FFFFFF", 0.95);

const theme = createTheme({
  palette: {
    primary: { main: "#2e7d32" },   // Grün
    success: { main: "#2e7d32" },   // identisch zu primary (Buttons, Akzente)
    secondary: { main: "#6d6d6d" }, // Grau
    background: {
      default: "#f5f8f6",           // App-Hintergrund
      paper: "#ffffff",             // Standard-Card: weiß
    },
    text: {
      primary: "rgba(0,0,0,0.9)",
      secondary: "rgba(0,0,0,0.7)",
      disabled: "rgba(0,0,0,0.4)",
    },
    divider: "rgba(0,0,0,0.12)",
  },

  spacing: 8,
  shape: { borderRadius: 8 }, // global etwas kleinere Rundung

  typography: {
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 700, fontSize: "0.95rem" },
    body1: { fontSize: "0.95rem" },
    body2: { fontSize: "0.85rem", color: "rgba(0,0,0,0.7)" },
    button: { fontWeight: 700, textTransform: "none", letterSpacing: 0.1 },
    caption: { fontSize: "0.75rem" },
  },

  components: {
    // ✅ Cards/Boxen wieder weiß + weicher Schatten
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.10)",
          backgroundColor: "#ffffff",
          color: "inherit",
        },
      },
      defaultProps: { elevation: 0 },
    },

    // Buttons (einheitliche Rundung/Look)
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, textTransform: "none", fontWeight: 700 },
        containedSuccess: { boxShadow: "0px 3px 8px rgba(0,0,0,0.15)" },
        outlinedSuccess: {
          borderWidth: 2,
          ":hover": { borderWidth: 2 },
        },
      },
    },

    // IconButtons (z. B. im Header)
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 12 } },
    },

    // Textfelder – helles Feld, Fokus grün
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "medium" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "rgba(0,0,0,0.03)",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2e7d32",
              borderWidth: 2,
            },
          },
          "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.6)" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#2e7d32" },
        },
      },
    },

    // AppBar (für gläsernen grünen Header)
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "0 2px 8px rgba(0,0,0,0.12)" },
        colorPrimary: {
          backgroundColor: alpha("#2e7d32", 0.9),
          backdropFilter: "blur(6px)",
          color: "#fff",
        },
      },
    },

    MuiToolbar: { styleOverrides: { root: { minHeight: 56 } } },

    MuiDivider: { styleOverrides: { root: { borderColor: "rgba(0,0,0,0.10)" } } },

    // kompaktere ListItems für scrollbare Listen
    MuiListItem: {
      styleOverrides: { root: { paddingTop: 6, paddingBottom: 6 } },
    },
  },
});

export default theme;
