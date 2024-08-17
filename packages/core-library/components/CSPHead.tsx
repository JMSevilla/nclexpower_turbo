import React from "react";
import Head from "next/head";

interface Props {
  nonce: string;
}

const CSPHead: React.FC<Props> = ({ nonce }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="csp-nonce" content={nonce} />
  </Head>
);

export default CSPHead;
