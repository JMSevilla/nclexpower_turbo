import { useAuthContext } from "../contexts";
import { useRouter } from "next/router";

export const useLogout = () => {
  const auth = useAuthContext();

  return {
    logout: async () => {},
  };
};
