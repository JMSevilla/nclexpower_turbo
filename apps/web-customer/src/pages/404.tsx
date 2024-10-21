import React from "react";
import { NotFoundBlock } from "../components/blocks/NotFoundBlock/NotFoundBlock";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";

export default function Custom404() {
  return <NotFoundBlock />;
}

export const getServerSideProps: GetServerSideProps = withCSP();
