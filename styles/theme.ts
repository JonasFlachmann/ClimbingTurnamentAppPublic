import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2e7d32" }, // kräftiges Grün
    secondary: { main: "#6d6d6d" }, // Grau
    success: { main: "#2e7d32" }, // identisch zu primary
    background: { default: "#f5f8f6" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: { fontWeight: "bold" },
    subtitle1: { fontWeight: "bold", fontSize: "0.95rem" },
    body2: { fontSize: "0.85rem", color: "rgba(0,0,0,0.7)" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
