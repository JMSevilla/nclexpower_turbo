import { useCallback } from "react";
import { AccessKey } from "../types/types";
import { useTenantContext } from "../../../apps/web-backoffice/src/core/contexts/TenantContext";
import { getItem } from "../session-storage";
import { useApiCallback } from "./useApi";
import { useSessionStorage } from "./useSessionStorage";

export const useCachedAccessKey = () => {
  const { tenant } = useTenantContext();
  const [accessKey, setAccessKey, clearAccessKey] =
    useSessionStorage<AccessKey | null>("access-key", null);
  const accessKeyRefreshCb = useApiCallback(async (api) => {
    const result = await api.webbackoffice.refreshAccessKey(
      tenant?.tenantUrl.value
    );
    setAccessKey(result.data);
    return result.data;
  });

  const accessKeyCb = useApiCallback(async (api, skipAuthCheck?: boolean) => {
    if (!getItem("accessToken") && !skipAuthCheck) {
      clearAccessKey();
      return null;
    }

    const result = await api.webbackoffice.accessKey(tenant?.tenantUrl.value);
    setAccessKey(result.data);
    return result.data;
  });
  return {
    data: accessKey,
    loading: accessKeyCb.loading || accessKeyRefreshCb.loading || !accessKey,
    fetch: useCallback(() => accessKey ?? accessKeyCb.execute(), [accessKey]),
    noCheckFetch: useCallback(
      () => accessKey ?? accessKeyCb.execute(true),
      [accessKey]
    ),
    refresh: useCallback(() => accessKeyRefreshCb.execute(), []),
    clear: clearAccessKey,
  };
};
