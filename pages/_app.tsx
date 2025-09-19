import type { AppProps } from "next/app";   // ✅ richtiges Import-Modul
import type { NextPage } from "next";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "../styles/theme";
import Layout from "../components/Layout";

// Swiper CSS global laden (für boulder-add)
import "swiper/css";
import "swiper/css/pagination";

type NextPageWithOptions = NextPage & {
  title?: string;
  /** Wenn true, wird KEIN Layout (Header/Sidebar/Footer) gerendert. */
  noLayout?: boolean;
};

type AppPropsWithOptions = AppProps & {
  Component: NextPageWithOptions;
};

export default function MyApp({ Component, pageProps }: AppPropsWithOptions) {
  const useLayout = !Component.noLayout;
  const title = Component.title;

  const page = <Component {...pageProps} />;

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
      {useLayout ? <Layout title={title}>{page}</Layout> : page}
    </ThemeProvider>
  );
}
