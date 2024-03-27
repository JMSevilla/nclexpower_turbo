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
      <Layout header={data?.prefetchHeader} questionaire={data?.prefetchQ} />
    </ApplicationProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const prefetchQ = await cmsInit.initializedCms();
    const prefetchHeader = await cmsInit.initializedHeader();
    return {
      props: {
        data: {
          prefetchQ,
          prefetchHeader,
        },
      },
    };
  } catch (error) {
    return { props: { error } };
  }
};
