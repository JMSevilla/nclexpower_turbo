import { useEffect } from "react";
import { useRouter } from "../router";

interface Props {
    resetStep: () => void;
  }

export const useResetOnRouteChange = ({resetStep}: Props) => {
    const router = useRouter();
  
    useEffect(() => {
      const handleRouteChange = () => {
        resetStep();
      };
  
      router.events.on("routeChangeStart", handleRouteChange);

      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }, [router.events, resetStep]);
  };
