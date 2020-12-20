import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "next/app";
import Router from "next/router";
import React from "react";
import { Auth0Provider } from "use-auth0-hooks";
import Head from "../components/Head";
import theme from "../lib/theme";

function onRedirectCallback(appState: { returnTo: any }) {
  if (appState && appState.returnTo) {
    Router.push("/dashboard");
  }
}

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head />
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Auth0Provider
            onRedirectCallback={onRedirectCallback}
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
            redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI || ""}
          >
            <Component {...pageProps} />
          </Auth0Provider>
        </ThemeProvider>
      </>
    );
  }
}
