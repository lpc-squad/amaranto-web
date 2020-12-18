import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { Auth0Provider } from "use-auth0-hooks";
import Layout from "../components/Layout";
import theme from "../lib/theme";

function onRedirectCallback(appState) {
  if (appState && appState.returnTo) {
    Router.push("/dashboard");
  }
}

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Clinical Record</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Auth0Provider
              domain={"clinical-record.auth0.com"}
              // TODO: Cuidado con esto, como hacemos?
              redirectUri={
                (process.env.NODE_ENV !== "production" &&
                  "http://localhost:3000/dashboard") ||
                process.env.REACT_APP_AUTH0_REDIRECT_URI
              }
              onRedirectCallback={onRedirectCallback}
              clientId={"fMa0FV92OSzAd9dq8bH3PgH3SHnZJJ3W"}
            >
              <Component {...pageProps} />
            </Auth0Provider>
          </Layout>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
