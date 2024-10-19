import React from "react";
import {
  pathExists,
  prepareMenus,
} from "../components/GenericDrawerLayout/MockMenus";
import {
  usePreventDuplicateSession,
  useStyle,
  useValidateToken,
} from "../hooks";
import { useAuthContext } from "../contexts";
import { InternalPageEntryPoint } from "./app/internal/Page";
import { CustomerPageEntryPoint } from "./app/customer/Page";
import { QueryClient } from "react-query";
import { SystemTypes } from "./parse-content";
import { useMenu } from "../components/GenericDrawerLayout/hooks/useMenu";
import { useRouter, useStripeConfig } from "../core";
import { ErrorBox } from "../components";
import { unauthorizeRoute } from "../core/utils/contants/route";
import { CustomerMenus } from "../core/utils/contants/wc/HomePageData";
import { GetServerSideProps } from "next";
import { withCSP } from "../utils";
import CSPHead from "../components/CSPHead";

interface Props {
  appName: SystemTypes;
  generatedNonce?: string;
}

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  appName,
  generatedNonce,
}) => {
  const router = useRouter();
  const { isAuthenticated, loading, logout } = useAuthContext();
  const { tokenValidated, loading: validateLoading } = useValidateToken();
  const { menus, loading: menuLoading, routes } = useMenu();
  const headerMenu = CustomerMenus(isAuthenticated);
  const sidebarStyles = useStyle();
  const { publishableKey } = useStripeConfig();
  const mockMenu = prepareMenus({
    isAuthenticated: isAuthenticated && tokenValidated,
    loading: menuLoading,
    menus: menus,
  });
  const queryClient = new QueryClient();

  const { duplicate } = usePreventDuplicateSession();

  console.log("duplicate", duplicate);

  const isValid =
    (routes.length > 0 && pathExists(routes, router.asPath)) ||
    unauthorizeRoute.includes(router.asPath);

  switch (appName) {
    case "webdev_app":
      if (!isValid && duplicate) {
        return (
          <ErrorBox label="Page not found. Please try again or contact administrator" />
        );
      }
      return (
        <InternalPageEntryPoint
          mockMenu={mockMenu}
          isAuthenticated={isAuthenticated}
          loading={loading || validateLoading}
          logout={logout}
          queryClient={queryClient}
          tokenValidated={tokenValidated}
          children={children}
        />
      );
    case "webc_app":
      if (duplicate) {
        return (
          <ErrorBox label="Page not found. Please try again or contact administrator" />
        );
      }
      return (
        <React.Fragment>
          <CSPHead nonce={generatedNonce ?? "non-nonce"} />
          <CustomerPageEntryPoint
            headerMenu={headerMenu}
            isAuthenticated={isAuthenticated}
            loading={loading || validateLoading}
            logout={logout}
            publishableKey={publishableKey}
            queryClient={queryClient}
            sidebarStyles={sidebarStyles}
            tokenValidated={tokenValidated}
            children={children}
          />
        </React.Fragment>
      );
    default:
      return null;
  }
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default Page;
