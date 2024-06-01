import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { sessionOptions } from "./ssr/withSsrHttpClient";

export function withSsrSession(handler: GetServerSideProps) {
  return withIronSessionSsr(handler, sessionOptions);
}
