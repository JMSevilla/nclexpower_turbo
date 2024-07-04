import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { RefreshParams } from "../api/types";
import { useAccessToken, useRefreshToken } from "../contexts/auth/hooks";
import Http from "../http-client";
import { httpClient, useApiCallback } from "./useApi";
import { config } from "../config";

export const useRefreshTokenHandler = (logout: AsyncFunction) => {
  const [accessToken, setAccessToken] = useAccessToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const retryInProgressRequest = useRef<Promise<void> | null>();
  const refreshTokenCb = useApiCallback((api, p: RefreshParams) =>
    api.auth.refreshToken(p)
  );

  useEffect(
    () => httpClient.setupMiddlewareOptions({ onErrorHandler: handleRetry }),
    []
  );

  const handleRetry = async (err: AxiosError, http: Http) => {
    if (err.response?.status !== 401) {
      return Promise.reject(err);
    }

    if (isTokenInvalidError(err)) {
      return logout();
    }

    if (!isTokenExpiredError(err)) {
      return Promise.reject(err);
    }

    if (!retryInProgressRequest.current) {
      retryInProgressRequest.current = refresh(err).then(() => {
        retryInProgressRequest.current = null;
      });
    }

    try {
      await retryInProgressRequest.current;
      http.options?.onRequest?.(err?.config!);

      return http.client(err?.config!);
    } catch {
      retryInProgressRequest.current = null;
    }

    return Promise.reject(err);
  };

  const refresh = async (error: AxiosError): Promise<void> => {
    if (accessToken && refreshToken) {
      try {
        const appName = config.value.BASEAPP;
        const result = await refreshTokenCb.execute({
          accessToken,
          refreshToken,
          appName,
        });
        setAccessToken(result.data.accessTokenResponse.accessToken);
        setRefreshToken(result.data.accessTokenResponse.refreshToken);
        updateErrorHeaders(error, result.data.accessTokenResponse.accessToken);

        return Promise.resolve();
      } catch {
        await logout();
      }
    }

    return Promise.reject(error);
  };
};

const isTokenInvalidError = (error: any): boolean => {
  if (!error.response) return false;

  const { status, data } = error.response;
  return status === 401 && data?.responseCode === 401;
};

const isTokenExpiredError = (error: any): boolean => {
  if (!error.response) return false;

  const { status, data } = error.response;
  return status === 401 && data?.responseCode === 401;
};

const updateErrorHeaders = (error: AxiosError, accessToken: string) => {
  if (error?.config?.headers)
    error.config.headers.Authorization = `Bearer ${accessToken}`;
};
