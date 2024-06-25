import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useClearCookies } from "../../hooks/useClearCookies";
import { useRouter } from "../../core";
import { parseTokenId } from "./access-token";
import { useAccessToken, useRefreshToken } from "./hooks";
import { useApiCallback } from "../../hooks";
import { LoginParams } from "../../types/types";
import { useSingleCookie } from "../../hooks/useCookie";

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
  const [clearCookies] = useClearCookies();
  const [accessToken, setAccessToken] = useAccessToken();
  const [, setSingleCookie, clearSingleCookie] = useSingleCookie();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const loginCb = useApiCallback((api, data: LoginParams) =>
    api.web.web_customer_login(data)
  );

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
            const result = await loginCb.execute({
              username,
              password,
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
