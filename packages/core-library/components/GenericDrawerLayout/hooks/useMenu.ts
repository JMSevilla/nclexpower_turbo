import { useState, useEffect } from "react";
import { AuthorizedMenuParams, MenuItems } from "../../../api/types";
import { useApiCallback } from "../../../hooks";
import { config } from "../../../config";
import { useAccessLevel } from "../../../contexts/auth/hooks";

export const useMenu = () => {
  const [accessLevel] = useAccessLevel();
  const menuCb = useApiCallback(
    async (api, args: AuthorizedMenuParams) =>
      await api.webbackoffice.getAuthorizedMenus(args)
  );
  const [menus, setMenus] = useState<Array<MenuItems>>([]);

  async function authorizedMenus() {
    try {
      const params = {
        accountLevel: accessLevel,
        menuEnvironments: parseInt(config.value.ENVIRONMENT_MENU),
        systemMenus: parseInt(config.value.ACRONYM_APP),
      } as AuthorizedMenuParams;

      const result = await menuCb.execute({ ...params });
      setMenus(result.data[0].menuItems);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    authorizedMenus();
  }, []);

  return {
    menus,
    loading: menuCb.loading,
  };
};
