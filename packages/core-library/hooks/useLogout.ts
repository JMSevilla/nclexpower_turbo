import { useAuthContext } from "../contexts";
import { useRouter } from "next/router";
import { useAccessToken, useRefreshToken } from "../contexts/auth/hooks";

export const useLogout = () => {
  const router = useRouter();
  const auth = useAuthContext();
  const [, , clearAccessToken] = useAccessToken();
  const [, , clearRefreshToken] = useRefreshToken();

  return {
    logout: async () => {
      clearAccessToken();
      clearRefreshToken();
      router.push("/login");
      console.log("shoud logout!");
    },
  };
};
