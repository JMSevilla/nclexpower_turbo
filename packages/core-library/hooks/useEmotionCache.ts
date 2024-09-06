import createCache from "@emotion/cache";
import { useEffect, useState } from "react";

function createEmotionCache(nonce: string) {
  return createCache({
    key: "css",
    nonce,
  });
}

export const useEmotionCache = () => {
  const [nonce, setNonce] = useState("");

  useEffect(() => {
    const nonceMetaTag = document.querySelector('meta[name="csp-nonce"]');
    if (nonceMetaTag) {
      setNonce(nonceMetaTag.getAttribute("content") || "");
    }
  }, []);

  const cache = createEmotionCache(nonce);
  return cache;
};
