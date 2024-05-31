import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Layout as LayoutComponent } from "./Layout";
import React from "react";
import {
  datatypes,
  getPreloadedGlobals,
  getTenant,
  withSsrSession,
} from "@repo/utils";
import {
  ContentDataContextProvider,
  TenantContextProvider,
} from "@repo/utils/contexts";
import { ErrorBox } from "@repo/ui";
import { extractPreloadedLabelFromGlobals } from "@repo/utils/types/business/global";
import { formattedSlug, parseTenantUrl } from "@repo/utils/types";
interface Props {
  data?: datatypes.ServerProps;
  error?: Error;
}

export const Page: NextPage<Props> = ({ data, error }) => {
  if (error) {
    return <ErrorBox label={error.message} />;
  }

  if (!data?.tenant) {
    return <ErrorBox label={""} />;
  }

  const Layout = dynamic<React.ComponentProps<typeof LayoutComponent>>(
    () => import("./Layout").then((c) => c.Layout),
    {
      ssr: false,
    }
  );

  return (
    <TenantContextProvider tenant={data.tenant}>
      <ContentDataContextProvider {...data}>
        <Layout preloadedGlobals={data.preloadedGlobals} />
      </ContentDataContextProvider>
    </TenantContextProvider>
  );
};

export const getServerSideProps = withSsrSession(
  async ({ req, resolvedUrl, query }) => {
    const host = req.headers.host;
    const querySlugs = query["path"];
    const tenantUrl = parseTenantUrl(host);

    if (!tenantUrl) {
      console.error("Tenant not found for host:", host);
      return { props: { error: { message: "Tenant not found." } } };
    }

    try {
      const tenant = await getTenant(tenantUrl);
      const preloadedGlobals = await getPreloadedGlobals(tenantUrl);
      const slug = formattedSlug(tenant, querySlugs as string[]) || resolvedUrl;

      return { props: { data: { tenant, slug, preloadedGlobals } } };
    } catch (error: any) {
      console.error(`Error on getTenant response: ${error.message || error}`);
      return {
        props: { error: { message: error.message || "An error occurred." } },
      };
    }
  }
);
