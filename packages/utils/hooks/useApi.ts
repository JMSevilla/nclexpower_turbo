import { AxiosInstance } from "axios";
import { useAsync, useAsyncCallback } from "react-async-hook";
import { Api } from "../api";
import { CalculationApi } from "../api/calc/calc-api";
import { WebApi } from "../api/web/web-api";
import Http, { HttpOptions } from "../http-client";
import { getItem } from "../session-storage";
import { config } from "../config";
import { SsrApi } from "../ssr-api";
import { ServerSideApi } from "../api/ssr/ServerSide";

const HTTP_OPTIONS: HttpOptions = {
  headers: {
    "x-api-key": config.value.XApiKey,
    "Content-Type": "application/json",
  },
  onRequest: (req) => {
    const accessToken = getItem<string | undefined>("accessToken");
    if (req.headers && accessToken)
      req.headers.Authorization = `Bearer ${accessToken}`;
  },
  onError: (error) => {
    const user = getItem<string | undefined>("user");
    console.error(
      `Error on response: ${JSON.stringify(error)}. User ${JSON.stringify(user)}`
    );
  },
};

const SELF_HTTP_OPTIONS: HttpOptions = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": config.value.XApiKey,
  },
  onRequest: (req) => {
    const accessToken = getItem<string | undefined>("AT");
    if (req.headers && accessToken)
      req.headers.Authorization = `Bearer ${accessToken}`;
  },
};

export const selfHttpClient = new Http({
  ...SELF_HTTP_OPTIONS,
  baseURL: "http://localhost:3002",
});
export const httpClient = new Http({
  ...HTTP_OPTIONS,
  baseURL: "http://localhost:5281/api",
});
export const httpSsrClient = new Http({
  ...HTTP_OPTIONS,
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : typeof window !== "undefined"
        ? window.location.origin
        : undefined,
});

export const useApi = <R, D extends unknown[]>(
  asyncFn: (api: Api) => Promise<R>,
  deps?: D
) => {
  return useAsync(async () => {
    try {
      const api = createApi(httpClient.client, httpSsrClient.client);
      return await asyncFn(api);
    } catch (error: any) {
      throw new Error(error);
    }
  }, [httpClient, ...(deps || [])]);
};

export const useApiCallback = <R, A extends unknown>(
  asyncFn: (api: Api, args: A) => Promise<R>
) => {
  return useAsyncCallback(async (args?: A) => {
    try {
      const api = createApi(httpClient.client, httpSsrClient.client);
      return await asyncFn(api, args as A);
    } catch (error: any) {
      throw new Error(error);
    }
  });
};

// secured api hook
export const useSecuredApi = <R, D extends unknown[]>(
  asyncFn: (api: SsrApi) => Promise<R>,
  deps?: D
) => {
  return useAsync(async () => {
    try {
      const api = secureCreateApi(selfHttpClient.client);
      return await asyncFn(api);
    } catch (error: any) {
      throw new Error(error);
    }
  }, [selfHttpClient, ...(deps || [])]);
};

export const useSecuredApiCallback = <R, A extends unknown>(
  asyncFn: (api: SsrApi, args: A) => Promise<R>
) => {
  return useAsyncCallback(async (args?: A) => {
    try {
      const api = secureCreateApi(selfHttpClient.client);
      return await asyncFn(api, args as A);
    } catch (error: any) {
      throw new Error(error);
    }
  });
};

function createApi(client: AxiosInstance, httpSsrClient: AxiosInstance) {
  return new Api(
    new CalculationApi(client, httpSsrClient),
    new WebApi(client, httpSsrClient)
  );
}

function secureCreateApi(client: AxiosInstance) {
  return new SsrApi(new ServerSideApi(client));
}
