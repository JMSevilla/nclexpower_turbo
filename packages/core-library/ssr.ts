import { CreateCustomerDumpParams, CreateCustomerParams } from "./api/types";
import { config } from "./config";
import { CmsGlobals } from "./types/global";
import { TenantResponse } from "./types/tenant";
import qs from "query-string";
import { getTimeZone } from "./utils";

export async function getTenant(tenantUrl: string) {
  /* config should placed here. */

  const response = await fetch(
    `${config.value.API_URL}/api/v2/content/BaseContent/tenant-content/${tenantUrl}`,
    {
      headers: { ENV: "dev2", "x-api-key": config.value.XAPIKEY },
    }
  );
  return ((await response.json()) as TenantResponse).elements ?? null;
}

export async function getPreloadedGlobals(tenantUrl: string) {
  const response = await fetch(
    `${config.value.API_URL}/api/v2/content/BaseContent/preloaded-globals/${tenantUrl}`,
    {
      headers: { ENV: "dev2", "x-api-key": config.value.XAPIKEY },
    }
  ); //no current api for getting the preloaded globals API

  return ((await response.json()) as CmsGlobals) ?? null;
}

export async function updateCustomerDumpStatusById(paymentIntentId: string) {
  const response = await fetch(
    `${config.value.LOCAL_API_URL}/api/v1/Customer/update-customer-dump-status-by-id?${qs.stringify({ paymentIntentId })}`,
    {
      method: "PUT",
      headers: {
        "x-api-key": config.value.XAPIKEY,
        "X-Environment": config.value.SYSENV,
      },
    }
  );

  return ((await response.json()) as number) ?? null;
}

export async function getCustomerDumps(paymentIntentId: string) {
  const response = await fetch(
    `${config.value.LOCAL_API_URL}/api/v1/Customer/get-customer-dumps-by-id?${qs.stringify({ paymentIntentId })}`,
    {
      headers: {
        "x-api-key": config.value.XAPIKEY,
        "X-Environment": config.value.SYSENV,
      },
    }
  );

  return ((await response.json()) as CreateCustomerDumpParams[]) ?? null;
}

export async function create(data: CreateCustomerParams) {
  const response = await fetch(
    `${config.value.LOCAL_API_URL}/api/v1/Customer/create-customer`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.value.XAPIKEY,
        "X-Environment": config.value.SYSENV,
      },
    }
  );

  return ((await response.json()) as number) ?? null;
}

export async function confirmedCreation(paymentIntentId: string) {
  const response = await fetch(
    `${config.value.LOCAL_API_URL}/api/v1/Customer/ssr-confirmed-customer-creation?${qs.stringify({ paymentIntentId })}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.value.XAPIKEY,
        "X-Environment": config.value.SYSENV,
        "X-Time-Zone": getTimeZone(),
      },
    }
  );

  return ((await response.json()) as number) ?? null;
}
