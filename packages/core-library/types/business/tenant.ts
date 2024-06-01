import { CmsTenant } from "../tenant";

export const parseTenantUrl = (tenantUrl: string | undefined) =>
  process.env.NODE_ENV === "development" && tenantUrl?.includes("localhost")
    ? "nclexpowerdev-backoffice.vercel.app"
    : tenantUrl;

export const formattedSlug = (tenant: CmsTenant, slugs?: string[]) => {
  const withTenantSlug =
    !!slugs?.length &&
    tenant.tenantUrl.value.split("/").length > 1 &&
    slugs[0] === tenant.tenantUrl.value.split("/")[1];
  return slugs
    ? `/${slugs.slice(withTenantSlug ? 1 : 0).join("/")}`
    : undefined;
};
