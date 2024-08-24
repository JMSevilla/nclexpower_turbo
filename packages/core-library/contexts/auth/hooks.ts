import { useSessionStorage } from "../../hooks";
import { IntentValueType } from '../../types/global';

export const useAccessToken = () =>
  useSessionStorage<string | undefined>("accessToken", undefined);

export const useRefreshToken = () =>
  useSessionStorage<string | undefined>("refreshToken", undefined);

export const useEncryptItem = () =>
  useSessionStorage<string | undefined>("SessionItem", undefined);

export const useCheckoutIntent = () =>
  useSessionStorage<IntentValueType>("CheckoutIntent", undefined);

export const useConfirmedIntent = () =>
  useSessionStorage<IntentValueType>("ConfirmedIntent", undefined);
