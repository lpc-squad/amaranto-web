import Head from "next/head";
import styled from "styled-components";
import Navbar from "./Navbar";

const MainDiv = styled.div`
  margin: 0;
  padding: 0;
`;

function Layout(props) {
  return (
    <MainDiv>
      <Head>
        <title>My page title</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      {props.children}
      <style global jsx>{`
        :root,
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          padding: 0;
          margin: 0;
        }
        :root {
          height: 100vh;
          background-color: #314980;
        }
      `}</style>
    </MainDiv>
  );
}

export default Layout;
