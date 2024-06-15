import { config } from "./config";
import { CmsGlobals } from "./types/global";
import { TenantResponse } from "./types/tenant";

export async function getTenant(tenantUrl: string) {
  /* config should placed here. */

  const response = await fetch(
    `${config.value.Content}/api/v2/content/BaseContent/tenant-content/${tenantUrl}`,
    {
      headers: { ENV: "dev2", "x-api-key": "34a89f9063bb49a59d2525220b677e25" },
    }
  );
  return ((await response.json()) as TenantResponse).elements ?? null;
}

export async function getPreloadedGlobals(tenantUrl: string) {
  const response = await fetch(
    `${config.value.Content}/api/v2/content/BaseContent/preloaded-globals/${tenantUrl}`,
    {
      headers: { ENV: "dev2", "x-api-key": "34a89f9063bb49a59d2525220b677e25" },
    }
  ); //no current api for getting the preloaded globals API

  return ((await response.json()) as CmsGlobals) ?? null;
}
