import { useSessionStorage } from "../../hooks";

export const useAccessToken = () =>
  useSessionStorage<string | undefined>("accessToken", undefined);

export const useRefreshToken = () =>
  useSessionStorage<string | undefined>("refreshToken", undefined);
