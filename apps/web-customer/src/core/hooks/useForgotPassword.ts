import { useRouter } from "next/router";
import { useBusinessQueryContext } from "core-library/contexts";
import { useLocalStorage } from "core-library/hooks";
import { hasclientkeyRoute } from "core-library/core/utils/contants/route";

export const useForgotPassword = () => {
  const router = useRouter();
  const { setItem } = useLocalStorage("Clientkey");
  const { bussinessQueryGetClientKey } = useBusinessQueryContext();

  const { data: clientSecretKey } = bussinessQueryGetClientKey(
    ["GetclientKey"],
    hasclientkeyRoute
  );

  const handleForgotPasswordClick = async () => {
    if (clientSecretKey) {
      setItem(clientSecretKey);
      router.push("/account/forgot-password");
    } else if (hasclientkeyRoute.includes(router.asPath)) {
      router.push("/404");
    }
  };
  return {
    handleForgotPasswordClick,
  };
};
