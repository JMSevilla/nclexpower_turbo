import Head from "next/head";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ServerProps } from "../../types/ServerProps";
import { CmsGlobals } from "../../types/global";
import { CmsMenu } from "../../types/menu";
import { CmsPage } from "../../types/page";
import { CmsFooter } from "../../types/tenant";
import { Membership } from "../../types/types";
import { CmsTokens } from "../../types/types";
import { extractPreloadedLabelFromGlobals } from "../../types/business/global";
import { injectTokenValuesToPage } from "../../contents/cms/inject-tokens";
import { useCachedCmsTokens } from "./useCachedCmsTokens";
import { useCachedCmsGlobals } from "./useCachedCmsGlobals";
import { useApiContent } from "../../hooks";
import { useCachedAccessKey } from "../../hooks/useCachedAccessKey";
import { ErrorBox } from "../../components";

type ContentData = {
  page: CmsPage | null;
  globals: CmsGlobals | null;
  footer: CmsFooter | null;
  menu: CmsMenu | null;
};

const context = createContext<
  {
    loading: boolean;
    cmsTokens: CmsTokens | null;
    clearCmsTokens: VoidFunction;
    updateCmsToken(
      key: keyof CmsTokens,
      value: CmsTokens[keyof CmsTokens]
    ): void;
  } & ContentData
>(undefined as any);

let preservedMembershipData: Membership | null = null;

export const useContentDataContext = () => {
  if (!context) {
    throw new Error("ContentDataContextProvider should be used");
  }
  return useContext(context);
};

export const ContentDataContextProvider: React.FC<
  React.PropsWithChildren<ServerProps>
> = ({ children, tenant, slug, preloadedGlobals }) => {
  const cmsTokens = useCachedCmsTokens();
  const cmsGlobals = useCachedCmsGlobals(tenant.tenantUrl.value);
  const [enrichedContentData, setEnrichedContentData] = useState<ContentData>();
  const accessKey = useCachedAccessKey();

  const contentData = useApiContent(
    async (api) => {
      const accessKeyData = await accessKey.fetch();
      const [globals, page, footer, menu, tokenInformation] =
        await Promise.allSettled([
          cmsGlobals.fetch(accessKeyData?.contentAccessKey),
          api.office.page(
            slug,
            tenant.tenantUrl.value,
            accessKeyData?.contentAccessKey
          ),
          api.office.footer(
            tenant.tenantUrl.value,
            accessKeyData?.contentAccessKey
          ),
          api.office.menu(
            tenant.tenantUrl.value,
            accessKeyData?.contentAccessKey
          ),
          accessKeyData?.contentAccessKey ? cmsTokens.fetch() : null,
        ]);

      const footerData = fulfilledValueOrNull(footer)?.data ?? null;
      const menuData = fulfilledValueOrNull(menu)?.data ?? null;
      const tokenInformationData = fulfilledValueOrNull(tokenInformation);
      const pageElementsData =
        fulfilledValueOrThrow(page)?.data?.elements ?? null;
      const globalsData = fulfilledValueOrThrow(globals);
      setEnrichedContentData(
        injectTokenValuesToPage(
          tenant,
          pageElementsData,
          globalsData,
          footerData,
          menuData,
          tokenInformationData
        )
      );
    },
    [tenant, slug]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const clear = () => {
      cmsTokens.clear();
      accessKey.clear();
    };
    window.addEventListener("beforeunload", clear);
    return () => window.removeEventListener("beforeunload", clear);
  }, []);

  const value = useMemo(
    () => ({
      loading: contentData.loading || cmsTokens.loading,
      cmsTokens: cmsTokens.data,
      page: enrichedContentData?.page ?? null,
      globals: enrichedContentData?.globals ?? null,
      footer: enrichedContentData?.footer ?? null,
      menu: enrichedContentData?.menu ?? null,
      updateCmsToken: cmsTokens.update,
      clearCmsTokens: cmsTokens.clear,
    }),
    [
      contentData.loading,
      cmsTokens.loading,
      cmsTokens.data,
      enrichedContentData,
      cmsTokens.update,
      cmsTokens.clear,
    ]
  );

  if (contentData.error) {
    return (
      <ErrorBox
        label={
          contentData?.error?.message ??
          extractPreloadedLabelFromGlobals("page_error", preloadedGlobals)
        }
      />
    );
  }

  return (
    <context.Provider value={value}>
      <Head>
        {
          <title>
            {enrichedContentData?.page?.pageHeader?.value ||
              tenant.tenantName.value}
          </title>
        }
      </Head>
      {children}
    </context.Provider>
  );
};

const fulfilledValueOrNull = <T,>(response: PromiseSettledResult<T | null>) =>
  response.status === "fulfilled" ? response.value : null;

const fulfilledValueOrThrow = <T,>(response: PromiseSettledResult<T>) => {
  if (response.status === "rejected") {
    throw new Error(response.reason);
  }
  return response.value;
};
