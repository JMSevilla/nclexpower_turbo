import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useClearCookies } from "../../hooks/useClearCookies";
import { parseTokenId } from "./access-token";
import { useAccessToken, useRefreshToken } from "./hooks";
import { useApiCallback } from "../../hooks";
import { LoginParams, RegisterParams } from "../../types/types";
import { useSingleCookie } from "../../hooks/useCookie";
import { config } from "../../config";
import { useRouter } from '../../core';

const context = createContext<{
  loading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<null>;
  register(data: RegisterParams): Promise<number>;
  logout(): Promise<void>;
  setIsAuthenticated: (value: boolean) => void;
}>(undefined as any);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const [clearCookies] = useClearCookies();
  const [accessToken, setAccessToken] = useAccessToken();
  const [, setSingleCookie, clearSingleCookie] = useSingleCookie();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [, , clearAccessToken] = useAccessToken();
  const [, , clearRefreshToken] = useRefreshToken();
  const loginCb = useApiCallback((api, data: LoginParams) =>
    api.auth.login(data)
  );
  const registerCb = useApiCallback((api, data: RegisterParams) =>
    api.web.web_account_setup(data)
  );
  const loading = loginCb.loading || registerCb.loading;

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!isAuthenticated) return;
  }, [isAuthenticated]);

  const logout = useCallback(async () => {
    try {
      if (refreshToken && accessToken) {
        clearCookies();
        clearAccessToken();
        clearRefreshToken();
        router.push((route) => route.login);
      }
    } catch (e) { }
    setIsAuthenticated(false);
  }, [refreshToken, accessToken]);

  return (
    <context.Provider
      value={useMemo(
        () => ({
          loading,
          isAuthenticated,
          login: async (email, password) => {
            const result = await loginCb.execute({
              email,
              password,
              appName: config.value.BASEAPP,
            });
            setAccessToken(result.data.accessTokenResponse.accessToken);
            setRefreshToken(result.data.accessTokenResponse.refreshToken);
            setSingleCookie(
              parseTokenId(result.data.accessTokenResponse.accessToken),
              {
                path: "/",
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                domain: `.${window.location.hostname}`,
              }
            );
            setIsAuthenticated(true);
            return null;
          },
          register: async (data: RegisterParams) => {
            const result = await registerCb.execute({
              ...data,
              appName: "webdev_app",
            });
            return result?.data;
          },
          logout,
          setIsAuthenticated,
        }),
        [isAuthenticated, accessToken, refreshToken]
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
