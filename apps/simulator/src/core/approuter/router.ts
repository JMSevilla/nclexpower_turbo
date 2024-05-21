import { NextRouter, useRouter as useNextRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type StaticRoutes = Record<"init_simulator", string>;
type TransitionOptions = ArgumentTypes<NextRouter["push"]>[2];
type PathFromRoutes = (routes: StaticRoutes) => string;

type PathParameters = {
  url: string | PathFromRoutes;
  query?: any;
};

type ParsePathParameters = {
  key: string;
  query?: any;
};

export const useRouter = () => {
  const router = useNextRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const staticRoutes = {} as StaticRoutes;

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("hashChangeComplete", end);
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
        currAsPath: getCurrentAsPath(),
      }),
      [router, staticRoutes]
    ),
  };

  function getCurrentAsPath() {
    const curr = router.asPath.substring(1);
    return curr;
  }

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

  function routeUrl(path: string) {
    return path === staticRoutes.init_simulator || path.includes("http://")
      ? path
      : "/[...slug]";
  }

  function addTenantSlug(path: string): string {
    const tenantUrl = path.split("/")?.[1];
    if (tenantUrl && path.split("/")?.[1] !== tenantUrl) {
      return tenantUrl + path;
    }
    return path;
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
        const stringifiedPath = JSON.stringify({
          url: typeof path.url === "string" ? path.url : path.url(staticRoutes),
          query: path.query,
        });
        return await fn(stringifiedPath, options);
      } catch (error) {
        return false;
      }
    };
  }
};

const configuredRouteOptions = (options?: TransitionOptions) =>
  options ? { scroll: false, ...options } : { scroll: false };
