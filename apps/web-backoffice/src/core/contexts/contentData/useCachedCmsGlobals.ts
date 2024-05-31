import { Compressed, compress, decompress } from "compress-json";
import { CmsGlobals } from "@repo/utils/types/global";
import { useContentApiCallback } from "@repo/utils/hooks/useApi";
import { useSessionStorage } from "@repo/utils/hooks/useSessionStorage";

interface GlobalsSessionStorage {
  tenantUrl: string;
  contentAccessKey?: string;
  data: Compressed | null;
}

export const useCachedCmsGlobals = (tenantUrl: string) => {
  const [globals, setGlobals] = useSessionStorage<GlobalsSessionStorage | null>(
    "cms-globals",
    null
  );
  const cmsGlobalsCb = useContentApiCallback(
    async (api, contentAccessKey?: string) => {
      const result = await api.office.globals(tenantUrl, contentAccessKey);

      if (result.data) {
        setGlobals({
          tenantUrl,
          contentAccessKey,
          data: compress(result.data),
        });
      }

      return result.data;
    }
  );

  return {
    data: decompressGlobals(),
    loading: cmsGlobalsCb.loading,
    fetch: handleGlobalsFetch,
  };

  function handleGlobalsFetch(contentAccessKey?: string) {
    if (
      globals &&
      tenantUrl === globals.tenantUrl &&
      contentAccessKey === globals.contentAccessKey
    ) {
      return decompressGlobals();
    }

    return cmsGlobalsCb.execute(contentAccessKey);
  }

  function decompressGlobals(): CmsGlobals | null {
    return globals?.data ? decompress(globals.data) : null;
  }
};
