import { addMinutes, parseISO } from "date-fns";
import { useIdleTimer } from "react-idle-timer";
import { useApiCallback } from "../../hooks";
import { useSessionStorage } from "../../hooks";

export const useAccessToken = () =>
  useSessionStorage<string | undefined>("accessToken", undefined);

export const useRefreshToken = () =>
  useSessionStorage<string | undefined>("refreshToken", undefined);

export const useEncryptItem = () =>
  useSessionStorage<string | undefined>("SessionItem", undefined);
