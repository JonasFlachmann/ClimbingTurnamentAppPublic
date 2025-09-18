import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../styles/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* sorgt für konsistente Basis-Styles */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
