import { useEffect } from "react";
import { useRouter } from "next/router";
import { useBusinessQueryContext } from "core-library/contexts";
import { useLocalStorage } from "core-library/hooks";

export const useForgotPassword = (hasClientKeyPath: string[]) => {
  const router = useRouter();
  const { setItem } = useLocalStorage("Clientkey");
  const { bussinessQueryGetClientKey } = useBusinessQueryContext();

  const { data: ClientKey, refetch } = bussinessQueryGetClientKey(
    ["GetclientKey"],
    hasClientKeyPath
  );

  useEffect(() => {
    if (ClientKey) {
      setItem(ClientKey);
    }
  }, [ClientKey]);

  const handleForgotPasswordClick = async () => {
    const result = await refetch();

    if (result.data) {
      setItem(result.data);
      router.push("/account/forgot-password");
    } else if (hasClientKeyPath.includes(router.asPath)) {
      router.push("/404");
    }
  };
  return {
    handleForgotPasswordClick,
  };
};
