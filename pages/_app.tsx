import type { AppProps, NextPage } from "next";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "../styles/theme";
import Layout from "../components/Layout";

type NextPageWithOptions = NextPage & {
  title?: string;
  noLayout?: boolean;
};
type AppPropsWithOptions = AppProps & {
  Component: NextPageWithOptions;
};

export default function MyApp({ Component, pageProps }: AppPropsWithOptions) {
  const useLayout = !Component.noLayout;
  const title = Component.title;

  const content = <Component {...pageProps} />;

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
      {useLayout ? <Layout title={title}>{content}</Layout> : content}
    </ThemeProvider>
  );
}
