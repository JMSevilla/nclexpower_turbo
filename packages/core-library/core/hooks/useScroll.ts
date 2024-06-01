import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "../router";

export const useScroll = () => {
  const router = useRouter();
  const scrollTo = useCallback((id: string, offsetY = 124) => {
    const top = document.getElementById(id)?.offsetTop ?? window.scrollY;
    window.scrollTo({ top: top + offsetY, behavior: "smooth" });
  }, []);
  const scrollTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  );
  const enableScroll = useCallback(
    () => (document.body.style.overflowY = "scroll"),
    []
  );
  const disableScroll = useCallback(
    () => (document.body.style.overflowY = "hidden"),
    []
  );

  useEffect(() => {
    enableScroll();
  }, [enableScroll, router.asPath]);

  return useMemo(
    () => ({
      scrollTo,
      scrollTop,
      enableScroll,
      disableScroll,
    }),
    [disableScroll, enableScroll, scrollTop, scrollTo]
  );
};
