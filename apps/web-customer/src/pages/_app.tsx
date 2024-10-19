import type { AppProps } from "next/app";
import React, { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "./mui.css";
import "../styles/password-strength-meter.css";
import { ParseContents } from "core-library/system";
import Head from "next/head";
import { default as Router } from "next/router";
import NProgress from "nprogress";
import "core-library/styles/global.css";
import "core-library/styles/nprogress.css";
import { useEmotionCache } from "core-library/hooks";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { config } from "core-library/config";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const cache = useEmotionCache();

  return (
    <CacheProvider value={cache}>
      <SessionProvider session={session}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ParseContents appName={config.value.BASEAPP}>
          <Suspense>
            <Component {...pageProps} />
          </Suspense>
        </ParseContents>
      </SessionProvider>
    </CacheProvider>
  );
}
