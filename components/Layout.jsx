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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
        />
      </Head>
      <Navbar />
      {props.children}
      <style global jsx>{`
        :root,
        body {
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
