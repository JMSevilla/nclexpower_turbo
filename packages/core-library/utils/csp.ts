import { GetServerSidePropsContext, NextApiResponse } from "next";
import { nonce } from "../types";
import { config } from "../config";
import { GetServerSideProps } from "next";
import { ServerResponse } from "http";
import { getMaintenanceMode } from "../ssr";

export const generateCSP = (generatedNonce: string): string =>
  `default-src 'self' *.vercel.app; script-src 'self' 'nonce-${generatedNonce}' 'unsafe-eval' https://js.stripe.com *.vercel.app *.herokuapp.com ` +
  config.value.STRIPE_URL_JS +
  " " +
  `; form-action 'self'; base-uri 'self'; object-src 'self'; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com 'unsafe-inline'; connect-src ` +
  config.value.API_URL +
  " " +
  config.value.LOCAL_API_URL +
  " " +
  config.value.VERCELURL +
  " *.vercel.app *.herokuapp.com https://js.stripe.com " +
  config.value.STRIPE_URL_JS +
  ` blob:; img-src 'self' data: blob: webpack:; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' *.vercel.app https://js.stripe.com ` +
  " " +
  config.value.STRIPE_URL_JS +
  ";";

export const setCSPHeader = (res: ServerResponse, csp: string): void => {
  const isDevelopment = process.env.NODE_ENV === "development";
  if (res != null && !isDevelopment && !res.headersSent) {
    res.setHeader("Content-Security-Policy", csp);
  }
};

export const withCSP = (getServerSidePropsFn?: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    try {
      const generatedNonce = nonce();
      const csp = generateCSP(generatedNonce);
      const loadMaintenanceMode = await getMaintenanceMode();

      setCSPHeader(context.res as ServerResponse, csp);

      if (getServerSidePropsFn) {
        const result = await getServerSidePropsFn(context);
        if ("props" in result) {
          return {
            ...result,
            props: {
              ...result.props,
              generatedNonce,
              data: { loadMaintenanceMode },
            },
          };
        }

        return result;
      }

      return {
        props: {
          generatedNonce,
          data: {
            loadMaintenanceMode,
          },
        },
      };
    } catch (error: any) {
      return {
        props: { error: { message: error.message || "An error occurred." } },
      };
    }
  };
};
