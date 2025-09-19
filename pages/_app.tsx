import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "../styles/theme";
import Layout from "../components/Layout";

type MyAppProps = AppProps & {
  Component: AppProps["Component"] & { title?: string };
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { height: "100%" },
          body: {
            height: "100%",
            backgroundColor: theme.palette.background.default,
            margin: 0,
          },
          "#__next": { minHeight: "100%" },
        }}
      />
      <Layout title={Component.title}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
