import { createTheme, alpha } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation"; // falls später Date Pickers genutzt werden

/**
 * Hilfsfunktion: Glas-Effekt in App-Farben (z. B. Header/Footer)
 * Nutzung: sx={{ ...glass(0.85) }}
 */
export const glass = (opacity: number = 0.85) => (theme: any) => ({
  backgroundColor: alpha(theme.palette.success.main, opacity),
  backdropFilter: "blur(10px)",
});

/**
 * Optional: helle Card-Hintergründe (z. B. für das „Pflanzen“-Theme)
 */
export const softCardBg = (theme: any) => alpha("#FFFFFF", 0.95);

const theme = createTheme({
  palette: {
    primary: { main: "#2e7d32" },   // Grün
    success: { main: "#2e7d32" },   // identisch zu primary => Buttons, Header, Footer
    secondary: { main: "#6d6d6d" }, // neutrales Grau
    background: {
      default: "#f5f8f6",           // sehr helles Grau/Grün für Grundfläche
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0,0,0,0.9)",
      secondary: "rgba(0,0,0,0.7)",
      disabled: "rgba(0,0,0,0.4)",
    },
    divider: "rgba(0,0,0,0.12)",
  },

  spacing: 8, // 1 = 8px

  shape: {
    borderRadius: 8, // 👈 einheitlich etwas kleinere Rundung (vorher 12)
  },

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
    // Standard-Karten/Boxen (Paper) – gleiche Optik für Routen/Turniere/News
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Cards dürfen etwas runder sein als global
          boxShadow: "0px 2px 6px rgba(0,0,0,0.10)",
          backgroundColor: "#fff",
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },

    // Primäre & sekundäre Buttons – kräftig, rund, konsistent
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 700,
        },
        containedSuccess: {
          boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
        },
        outlinedSuccess: {
          borderWidth: 2,
          ":hover": { borderWidth: 2 },
        },
      },
    },

    // Kleine runde IconButtons (z. B. im Header)
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    // Textfelder – angenehme Lesbarkeit & Fokusfarbe
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
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
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2e7d32",
          },
        },
      },
    },

    // AppBar/Toolbar – falls du Header global verwenden willst
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        },
        colorPrimary: {
          backgroundColor: "#2e7d32",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 56,
        },
      },
    },

    // Divider etwas weicher
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0,0,0,0.10)",
        },
      },
    },

    // Optional: List/Items für kompaktere scrollbare Listen
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 6,
          paddingBottom: 6,
        },
      },
    },
  },
});

export default theme;
