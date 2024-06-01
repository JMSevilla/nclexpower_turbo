import { useCallback, useState } from "react";
import { CmsTokens } from "../../types/types";
import { useApiCallback } from "../../hooks";
import { useSessionStorage } from "../../hooks";

/* potential error since tokenInformation API is not yet present. */
export const useCachedCmsTokens = () => {
  const [tokens, setTokens, clearTokens] = useSessionStorage<CmsTokens | null>(
    "cms-tokens",
    null
  );
  const [state, setState] = useState<CmsTokens | null>(tokens);
  const cmsTokensCb = useApiCallback(async (api) => {
    const result = await api.webbackoffice.tokenInformation();
    setTokens(result.data);
    setState(result.data);
    return result.data;
  });

  return {
    data: tokens,
    loading: cmsTokensCb.loading,
    fetch: useCallback(() => tokens ?? cmsTokensCb.execute(), [tokens, state]),
    update: useCallback(
      (key: keyof CmsTokens, value: CmsTokens[keyof CmsTokens]) => {
        setTokens(
          (oldTokens: any) => ({ ...oldTokens, [key]: value }) as CmsTokens
        );
        setState(
          (oldTokens: any) => ({ ...oldTokens, [key]: value }) as CmsTokens
        );
      },
      [setTokens]
    ),
    refresh: useCallback(() => cmsTokensCb.execute(), []),
    clear: clearTokens,
  };
};
