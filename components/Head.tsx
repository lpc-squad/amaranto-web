import Head from "next/head";
import { FunctionComponent } from "react";

interface HeadProps {
  title?: string;
}

const HeadComponent: FunctionComponent<HeadProps> = ({ title }) => (
  <Head>
    <title>{title && `${title} - `}Clinical Record</title>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
  </Head>
);

export default HeadComponent;
