import { useState, useEffect } from "react";
import {
  AuthorizedMenuParams,
  AuthorizedRoutes,
  MenuItems,
} from "../../../api/types";
import { useApiCallback } from "../../../hooks";
import { config } from "../../../config";
import { useAccessLevel, useAccountId } from "../../../contexts/auth/hooks";
import { useAuthContext } from "../../../contexts";

export const useMenu = () => {
  const { isAuthenticated } = useAuthContext();
  const [accessLevel] = useAccessLevel();
  const [accountId] = useAccountId();
  const menuCb = useApiCallback(
    async (api, args: AuthorizedMenuParams) =>
      await api.webbackoffice.getAuthorizedMenus(args)
  );
  const routesCb = useApiCallback(
    async (api, args: string | undefined) =>
      await api.webbackoffice.getContentRoutes(args)
  );
  const [menus, setMenus] = useState<Array<MenuItems>>([]);
  const [routes, setRoutes] = useState<Array<AuthorizedRoutes>>([]);

  async function authorizedMenus() {
    try {
      const params = {
        accountLevel: accessLevel,
        menuEnvironments: parseInt(config.value.ENVIRONMENT_MENU),
        systemMenus: parseInt(config.value.ACRONYM_APP),
      } as AuthorizedMenuParams;
      const res = await routesCb.execute(accountId);
      const result = await menuCb.execute({ ...params });
      setMenus(result.data[0].menuItems);
      setRoutes(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    authorizedMenus();
  }, [isAuthenticated]);

  return {
    menus,
    loading: menuCb.loading,
    routes,
  };
};
