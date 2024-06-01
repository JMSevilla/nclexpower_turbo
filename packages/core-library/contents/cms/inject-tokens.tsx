import { Parser } from "simple-text-parser";
import { CmsGlobals } from "../../types/global";
import { CmsMenu, MenuItem } from "../../types/menu";
import { CmsPage } from "../../types/page";
import { CmsFooter, CmsTenant } from "../../types/tenant";
import { CmsTokens } from "../../types/types";
import { extractLabelByKey } from "../../types/business/global";
import { useCachedCmsTokens } from "../../contexts/contentData/useCachedCmsTokens";
import { useGlobalsContext, useTenantContext } from "../../contexts";

export const injectTokenValuesToPage = (
  tenant: CmsTenant | null,
  page: CmsPage | null,
  globals: CmsGlobals | null,
  footer: CmsFooter | null,
  menuItems: MenuItem[] | null,
  cmsTokens: CmsTokens | null
): {
  page: CmsPage | null;
  globals: CmsGlobals | null;
  footer: CmsFooter | null;
  menu: CmsMenu | null;
} => {
  const menu = { value: menuItems };
  if (!tenant || !page || !globals || !footer || !menu) {
    return { page, globals, footer, menu };
  }

  const parser = createCmsTokenParser(tenant, globals, cmsTokens);
  const enrichedPage = injectCmsTokenValues(page, parser);
  const enrichedGlobals = injectCmsTokenValues(globals, parser);
  const enrichedFooter = injectCmsTokenValues(footer, parser);
  const enrichedMenu = injectCmsTokenValues(menu, parser);
  return {
    page: enrichedPage as CmsPage,
    globals: enrichedGlobals as CmsGlobals,
    footer: enrichedFooter as CmsFooter,
    menu: enrichedMenu as CmsMenu,
  };
};

export const createCmsTokenParser = (
  tenant: CmsTenant,
  globals: CmsGlobals,
  cmsTokens: CmsTokens | null
) => {
  const parser = new Parser();

  const TOKEN_VALUE_PAIRS = {
    tenant_name: tenant.tenantName.value,
    name: cmsTokens?.name,
    email: cmsTokens?.email?.toString(),
    phone_number: cmsTokens?.phoneNumber
      ? `+${cmsTokens.phoneNumber}`
      : extractLabelByKey(globals, "phone_number_is_not_available"),
  };

  Object.entries(TOKEN_VALUE_PAIRS).forEach(([key, value]) =>
    parser.addRule(`[[token:${key}]]`, () => value ?? `[[token:${key}]]`)
  );

  globals?.labels?.forEach(({ elements: { labelKey, labelText } }) =>
    parser.addRule(`[[label:${labelKey.value}]]`, () => labelText.value)
  );

  return parser;
};

export const injectCmsTokenValues = <T extends Object>(
  content: T,
  parser: Parser
): T => {
  if (typeof content === "string") {
    return parser.render(content) as unknown as T;
  }
  Object.entries(content ?? {}).forEach(([key, val]) => {
    if (typeof val === "object") {
      injectCmsTokenValues(val, parser);
    }
    if (typeof val === "string") {
      (content as unknown as { [key: string]: string })[key] =
        parser.render(val);
    }
  });
  return content;
};

export const useTokenEnrichedValue = <T extends Object>(value?: T | null) => {
  const { tenant } = useTenantContext();
  const { globals } = useGlobalsContext();
  const cmsTokens = useCachedCmsTokens();

  if (!globals || !value) {
    return value;
  }

  const parser = createCmsTokenParser(tenant, globals, cmsTokens.data);
  const enrichedValue = injectCmsTokenValues(value, parser);
  return enrichedValue as T;
};
