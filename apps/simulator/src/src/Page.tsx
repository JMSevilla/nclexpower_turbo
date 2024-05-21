import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { cmsInit } from "@repo/utils";
import { Layout as LayoutComponent } from "./Layout";
import { ApplicationProvider } from "@/core/context/AppContext";

interface Props {
  data?: any;
  error?: any;
}

export const Page: NextPage<Props> = ({ data, error }) => {
  const Layout = dynamic<React.ComponentProps<typeof LayoutComponent>>(
    () => import("./Layout").then((c) => c.Layout),
    {
      ssr: false,
    }
  );
  return (
    <ApplicationProvider data={data}>
      <Layout questionaire={data?.prefetchQ} data={data} />
    </ApplicationProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  resolvedUrl,
}) => {
  const querySlugs = query["slug"];
  try {
    const slug = (querySlugs as string[]) || resolvedUrl;
    const prefetchQ = await cmsInit.initializedCms();
    const prefetchHeader = await cmsInit.initializedHeader();
    const loadPTestHimem = await cmsInit.initializeLoadPTestHimem();
    return {
      props: {
        data: {
          slug,
          prefetchQ,
          prefetchHeader,
          loadPTestHimem,
        },
      },
    };
  } catch (error) {
    return { props: { error } };
  }
};
