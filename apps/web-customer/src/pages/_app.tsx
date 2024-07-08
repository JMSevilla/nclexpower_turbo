import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "./mui.css";

import dynamic from "next/dynamic";

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Page = dynamic(() => import("./shared/Page"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Page
      children={<Suspense>{getLayout(<Component {...pageProps} />)}</Suspense>}
    />

  );
}
