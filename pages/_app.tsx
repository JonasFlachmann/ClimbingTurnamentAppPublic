import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "../styles/theme";

/**
 * Globaler Wrapper für Pages Router.
 * Achtung: Ich füge hier bewusst KEINEN Header/Footer ein,
 * um nichts an deinen bestehenden Seiten zu überschreiben oder zu duplizieren.
 * Sobald du Header/Footer global möchtest, bauen wir das optional
 * als eigenes Layout ein und ersetzen die lokalen Varianten schrittweise.
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { height: "100%" },
          body: {
            height: "100%",
            backgroundColor: theme.palette.background.default,
            backgroundImage: "url('/background-plants.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: 0,
          },
          "#__next": { minHeight: "100%" },
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
