import { createTheme, alpha } from "@mui/material/styles";

/** Glas-Effekt (z. B. Header/Footer) */
export const glass = (opacity: number = 0.85) => (theme: any) => ({
  backgroundColor: alpha(theme.palette.success.main, opacity),
  backdropFilter: "blur(10px)",
});

/** Helle Card-Hintergründe */
export const softCardBg = (theme: any) => alpha("#FFFFFF", 0.95);

const theme = createTheme({
  palette: {
    primary: { main: "#2e7d32" },   // Grün
    success: { main: "#2e7d32" },   // identisch zu primary
    secondary: { main: "#6d6d6d" }, // Grau
    background: {
      default: "#f5f8f6",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0,0,0,0.9)",
      secondary: "rgba(0,0,0,0.7)",
      disabled: "rgba(0,0,0,0.4)",
    },
    divider: "rgba(0,0,0,0.12)",
  },

  spacing: 8,

  shape: {
    borderRadius: 8, // global etwas kleiner
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.10)",
          backgroundColor: "#fff",
        },
      },
      defaultProps: { elevation: 0 },
    },

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

    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 12 } },
    },

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
          "& .MuiInputLabel-root.Mui-focused": { color: "#2e7d32" },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "0 2px 8px rgba(0,0,0,0.12)" },
        colorPrimary: { backgroundColor: "#2e7d32" },
      },
    },

    MuiToolbar: { styleOverrides: { root: { minHeight: 56 } } },

    MuiDivider: { styleOverrides: { root: { borderColor: "rgba(0,0,0,0.10)" } } },

    MuiListItem: {
      styleOverrides: { root: { paddingTop: 6, paddingBottom: 6 } },
    },
  },
});

export default theme;
