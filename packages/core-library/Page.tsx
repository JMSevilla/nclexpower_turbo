import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Layout as LayoutComponent } from "./Layout";
import React from "react";
import { getPreloadedGlobals, getTenant } from ".";
import {
  ContentDataContextProvider,
  TenantContextProvider,
  AuthProvider,
} from "./contexts";
import { ErrorBox } from "./components";
import { extractPreloadedLabelFromGlobals, ServerProps } from "./types";
import { formattedSlug, parseTenantUrl } from "./types";

interface Props {
  data?: ServerProps;
  error?: {
    message: string;
  };
}

export const Page: NextPage<Props> = ({ data, error }) => {
  if (error) {
    return <ErrorBox label={error.message} />;
  }

  if (!data?.tenant) {
    return (
      <ErrorBox
        label={extractPreloadedLabelFromGlobals(
          "failed_to_retrieve_tenant",
          data?.preloadedGlobals
        )}
      />
    );
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
        <AuthProvider>
          <Layout preloadedGlobals={data.preloadedGlobals} />
        </AuthProvider>
      </ContentDataContextProvider>
    </TenantContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  resolvedUrl,
  query,
}) => {
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

    return {
      props: {
        data: { tenant, slug, preloadedGlobals },
      },
    };
  } catch (error: any) {
    console.error(`Error on getTenant response: ${error.message || error}`);
    return {
      props: { error: { message: error.message || "An error occurred." } },
    };
  }
};
