import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@emotion/react";
import client from "../src/lib/apollo-client";
import GlobalStyle from "@/src/components/GlobalStyle";

import { light } from "@/src/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={light}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
