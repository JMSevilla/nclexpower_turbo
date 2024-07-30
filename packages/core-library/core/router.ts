import { NextRouter, useRouter as useNextRouter } from "next/router";
import qs, { ParsedQuery } from "query-string";
import { useEffect, useMemo, useState } from "react";
import { usePageLoaderContext } from "../contexts/PageLoaderContext";

type StaticRoutes = Record<
  "home" | "hub" | "logout" | "page_not_found" | "account_setup" | "login",
  string
>;
type TransitionOptions = ArgumentTypes<NextRouter["push"]>[2];
type PathFromRoutes = (routes: StaticRoutes) => string;

type PathParameters = {
  url: string | PathFromRoutes;
  query?: ParsedQuery<any>;
};

export const useRouter = () => {
  const router = useNextRouter();
  const [loading, setLoading] = useState(false);

  const staticRoutes = {} as StaticRoutes;

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
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
    path: string | PathFromRoutes | { pathname: string },
    options?: TransitionOptions
  ) {
    if (typeof path === "string") {
      return router.push(routeUrl(path), path, configuredRouteOptions(options));
    } else if (typeof path === "function") {
      const resolvedPath = path(staticRoutes);
      return router.push(
        routeUrl(resolvedPath),
        resolvedPath,
        configuredRouteOptions(options)
      );
    } else {
      return router.push(
        routeUrl(path.pathname),
        path.pathname,
        configuredRouteOptions(options)
      );
    }
  }

  async function replace(
    path: string | PathFromRoutes | { pathname: string },
    options?: TransitionOptions
  ) {
    if (typeof path === "string") {
      return router.replace(
        routeUrl(path),
        path,
        configuredRouteOptions(options)
      );
    } else if (typeof path === "function") {
      const resolvedPath = path(staticRoutes);
      return router.replace(
        routeUrl(resolvedPath),
        resolvedPath,
        configuredRouteOptions(options)
      );
    } else {
      return router.replace(
        routeUrl(path.pathname),
        path.pathname,
        configuredRouteOptions(options)
      );
    }
  }

  function navigate(
    fn: (
      path: string | PathFromRoutes | { pathname: string },
      options?: TransitionOptions
    ) => Promise<boolean>
  ) {
    return async (
      path: string | PathFromRoutes | PathParameters | { pathname: string },
      options?: TransitionOptions
    ) => {
      setLoading(true);
      if (typeof path === "string" || typeof path === "function") {
        return await fn(path, options);
      }

      if (typeof path === "object" && "pathname" in path) {
        return await fn(path.pathname, options);
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
