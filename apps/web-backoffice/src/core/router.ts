import { NextRouter, useRouter as useNextRouter } from "next/router";
import qs, { ParsedQuery } from "query-string";
import { useEffect, useMemo, useState } from "react";
import { extractClassifierFromGlobals } from "@repo/utils/types";
import { useContentDataContext } from "./contexts/contentData/ContentDataContext";
import { useTenantContext } from "./contexts";
import { useContentApiCallback } from "@repo/utils/hooks";

type StaticRoutes = Record<
  "home" | "hub" | "logout" | "page_not_found" | "bereavement_start",
  string
>;
type TransitionOptions = ArgumentTypes<NextRouter["push"]>[2];
type PathFromRoutes = (routes: StaticRoutes) => string;

type PathParameters = {
  url: string | PathFromRoutes;
  query?: ParsedQuery<any>;
};

type ParsePathParameters = {
  key: string;
  query?: ParsedQuery<any>;
};

export const useRouter = () => {
  const router = useNextRouter();
  const [loading, setLoading] = useState(false);
  const { tenant } = useTenantContext();
  const contentData = useContentDataContext();
  const staticRoutes = (
    contentData?.globals
      ? extractClassifierFromGlobals(
          "global_routes",
          contentData.globals
        )?.reduce(
          (routes, route) => ({
            ...routes,
            [route.key.value]: route.value.value,
          }),
          {}
        )
      : {}
  ) as StaticRoutes;

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return {
    loading,
    staticRoutes,
    ...useMemo(
      () => ({
        ...router,
        push: navigate(push),
        replace: navigate(replace),
      }),
      [router, staticRoutes]
    ),
  };

  async function push(
    path: string | PathFromRoutes,
    options?: TransitionOptions
  ) {
    return typeof path === "string"
      ? router.push(
          routeUrl(path),
          addTenantSlug(path),
          configuredRouteOptions(options)
        )
      : router.push(
          routeUrl(path(staticRoutes)),
          addTenantSlug(path(staticRoutes)),
          configuredRouteOptions(options)
        );
  }

  async function replace(
    path: string | PathFromRoutes,
    options?: TransitionOptions
  ) {
    return typeof path === "string"
      ? router.replace(routeUrl(path), path, configuredRouteOptions(options))
      : router.replace(
          routeUrl(path(staticRoutes)),
          path(staticRoutes),
          configuredRouteOptions(options)
        );
  }

  function navigate(
    fn: (
      path: string | PathFromRoutes,
      options?: TransitionOptions
    ) => Promise<boolean>
  ) {
    return async (
      path: string | PathFromRoutes | PathParameters,
      options?: TransitionOptions
    ) => {
      setLoading(true);
      if (typeof path === "string") {
        return await fn(path, options);
      }

      if (typeof path === "function") {
        return await fn(path, options);
      }

      try {
        const stringifiedPath = qs.stringifyUrl({
          url: typeof path.url === "string" ? path.url : path.url(staticRoutes),
          query: path.query,
        });

        return await fn(stringifiedPath, options);
      } catch (e) {
        console.error(e);
        return false;
      }
    };
  }

  function addTenantSlug(path: string): string {
    const tenantUrl = tenant?.tenantUrl.value.split("/")?.[1];
    if (tenantUrl && path.split("/")?.[1] != tenantUrl) {
      return tenantUrl + path;
    }
    return path;
  }

  function routeUrl(path: string) {
    return path === staticRoutes.home ||
      path.includes("http://") ||
      path.includes("https://")
      ? path
      : "/[...slug]";
  }
};

const configuredRouteOptions = (options?: TransitionOptions) =>
  options ? { scroll: false, ...options } : { scroll: false };
