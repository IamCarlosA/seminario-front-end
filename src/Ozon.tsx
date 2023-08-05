import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";
import { persistor, store } from "./store";
import { RootRouter } from "./routers/index.router";
import { theme } from "./theme/theme";
import Meta from "./components/head/Meta";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_BASE_URL_GRAPHQL,
  cache: new InMemoryCache(),
});

export const Ozon = () => (
  <ApolloProvider client={client}>
    <HelmetProvider>
      <Meta />
      <Provider store={store}>
        <CssBaseline />
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <RootRouter />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </ApolloProvider>
  // router inside here, provider theme
);
