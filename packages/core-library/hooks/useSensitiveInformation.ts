import React, { useEffect, useState } from "react";
import { useAccessToken, useAccountId } from "../contexts/auth/hooks";
import {
  CustomerTokenizeInformations,
  TokenizeInformations,
  ValidateTokenizeParams,
} from "../api/types";
import { useApiCallback } from "./useApi";
import { config } from "../config";

export const useSensitiveInformation = () => {
  const [accessToken] = useAccessToken();
  const [accountId] = useAccountId();
  const [internalInfo, setInternalInfo] = useState<TokenizeInformations>();
  const [customerInfo, setCustomerInfo] =
    useState<CustomerTokenizeInformations>();
  const validateTokenizeCb = useApiCallback(
    async (api, args: ValidateTokenizeParams) =>
      await api.auth.validateTokenizeInformation(args)
  );

  async function validateTokenizeInformation() {
    const validateParams: ValidateTokenizeParams = {
      accessToken: accessToken,
      accountId: accountId ?? "no-account-id",
      appName: config.value.BASEAPP,
    };
    const result = await validateTokenizeCb.execute({ ...validateParams });
    setInternalInfo(result.data.tokenizeInformation);
    setCustomerInfo(result.data.customerTokenizationInformation);
  }

  useEffect(() => {
    if (!accountId || !accessToken) return;
    validateTokenizeInformation();
  }, [accountId, accessToken]);

  return {
    internal: internalInfo,
    customer: customerInfo,
  };
};
