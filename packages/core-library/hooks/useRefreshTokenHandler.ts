import { useCallback, useEffect, useState } from "react";
import { useAccessToken, useRefreshToken } from "../contexts/auth/hooks";
import { useApiCallback } from "./useApi";
import { config } from "../config";
import { AccessTokenExpired } from "../core/utils/scan-access-token";
import { RefreshParams } from "../api/types";

export const useRefreshTokenHandler = (logout: () => Promise<void>) => {
  const [accessToken, setAccessToken] = useAccessToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [tokenExpired, setTokenExpired] = useState<boolean>(true); // Initialize with true assuming token is expired initially
  const refreshTokenCb = useApiCallback((api, p: RefreshParams) =>
    api.auth.refreshToken(p)
  );

  const scanAccessToken = useCallback((accessToken: string | undefined) => {
    const expired = AccessTokenExpired(accessToken);
    setTokenExpired(expired);
    return expired;
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      if (accessToken && refreshToken) {
        const result = await refreshTokenCb.execute({
          accessToken,
          refreshToken,
          appName: config.value.BASEAPP,
        });
        setAccessToken(result.data.accessTokenResponse.accessToken);
        setRefreshToken(result.data.accessTokenResponse.refreshToken);
      }
    } catch (error) {
      await logout();
    }
  }, [
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    refreshTokenCb,
    logout,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const accessTokenHasExpired = scanAccessToken(accessToken);

      if (accessTokenHasExpired) {
        handleRefresh();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [accessToken, scanAccessToken, handleRefresh]);

  return {
    tokenExpired,
  };
};
