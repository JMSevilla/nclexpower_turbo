import { AxiosResponse } from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Api } from "../../api";
import { LoginParams, LogoutParams } from "../../api/types";
import { useApiCallback } from "../../hooks";
import { useCachedAccessKey } from "../../hooks/useCachedAccessKey";
import { useClearCookies } from "../../hooks/useClearCookies";
import { useSessionStorage, clearSession } from "../../hooks";
import { useRouter } from "../../core";
import { useTenantContext } from "../TenantContext";
import { parseTokenId } from "./access-token";
import { useAccessToken, useRefreshToken } from "./hooks";

const context = createContext<{
  loading: boolean;
  isAuthenticated: boolean;
  login(username: string, password: string): Promise<null>;
  logout: () => {};
  setIsAuthenticated: (value: boolean) => void;
}>(undefined as any);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const { tenant } = useTenantContext();
  const [clearCookies] = useClearCookies();
  const [accessToken, setAccessToken] = useAccessToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const cachedAccessKey = useCachedAccessKey();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!accessToken && !!cachedAccessKey.data?.contentAccessKey
  );

  useEffect(() => {
    setIsAuthenticated(
      !!accessToken && !!cachedAccessKey.data?.contentAccessKey
    );
  }, [accessToken, cachedAccessKey.data?.contentAccessKey]);

  useEffect(() => {
    if (!isAuthenticated) return;
  }, [isAuthenticated]);

  const logout = useCallback(async () => {
    try {
      if (refreshToken && accessToken) {
        clearCookies();
        // logout execution
      }
    } catch (e) {}
    setIsAuthenticated(false);
  }, [refreshToken, accessToken]);

  return (
    <context.Provider
      value={useMemo(
        () => ({
          loading: false,
          isAuthenticated,
          login: async (username, password) => {
            return null;
          },
          logout,
          setIsAuthenticated,
        }),
        [tenant, isAuthenticated, accessToken, refreshToken]
      )}
    >
      {children}
    </context.Provider>
  );
};

export const useAuthContext = () => {
  if (!context) {
    throw new Error("AuthProvider should be used.");
  }
  return useContext(context);
};
