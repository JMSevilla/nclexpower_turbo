import { useSessionStorage } from "../../hooks";

export const useAccessToken = () =>
  useSessionStorage<string | undefined>("accessToken", undefined);

export const useRefreshToken = () =>
  useSessionStorage<string | undefined>("refreshToken", undefined);

export const useEncryptItem = () =>
  useSessionStorage<string | undefined>("SessionItem", undefined);

export const useConfirmedIntent = () =>
  useSessionStorage<string | undefined>("ConfirmedIntent", undefined);
