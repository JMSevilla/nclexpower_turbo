import { AxiosInstance } from "axios";
import { IronSession, IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import Http from "../http-client";
import { config } from "../config";

type Tokens = { accessToken?: string; refreshToken?: string };

interface NextApiRequestWithSession extends NextApiRequest {
  session: IronSession & Tokens;
}

type NextIronApiHandler<T = any> = (
  req: NextApiRequestWithSession,
  res: NextApiResponse<T>
) => unknown | Promise<unknown>;

type SsrHttpClient = AxiosInstance;

type SsrApiHandler = (client: SsrHttpClient) => NextIronApiHandler;

const sessionOptions: IronSessionOptions = {
  cookieName: "session",
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: { secure: false },
};

const client = (
  session: NextApiRequestWithSession["session"]
): Http["client"] =>
  new Http({
    baseURL: config.value.Development,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.value.XApiKey,
    },
    onError: (error) =>
      console.error(`Error response: ${JSON.stringify(error)}.`),
    onRequest: (req) => {
      if (req.headers && session.accessToken)
        req.headers.Authorization = `Bearer ${session.accessToken}`;
      return req;
    },
  }).client;

export const withSsrHttpClient = (handler: SsrApiHandler) =>
  withIronSessionApiRoute(
    async (req: NextApiRequestWithSession, res) =>
      handler(client(req.session))(req, res),
    sessionOptions
  );
