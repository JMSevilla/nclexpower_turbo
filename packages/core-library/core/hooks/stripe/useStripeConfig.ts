import React, { useEffect, useState } from "react";
import { useApiCallback, useApi } from "../../../hooks";

export const useStripeConfig = () => {
  const [publishableKey, setPublishableKey] = useState<string>("");
  const publishableKeyCb = useApi(
    (api) => api.web.web_get_publishableKey(),
    []
  );

  useEffect(() => {
    if (publishableKeyCb.result?.data) {
      setPublishableKey(publishableKeyCb.result.data);
    }
  }, [publishableKeyCb.result?.data]);

  return {
    publishableKey,
  };
};
