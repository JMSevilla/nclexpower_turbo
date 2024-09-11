import { config } from "../../config";
import { MenuItems } from "../../api/types";

export const useAuthNavigation = (navigation: Array<MenuItems>) => {
  const appendHubPath = (items: Array<MenuItems>): Array<MenuItems> => {
    return items.map((item) => {
      // Add /hub to the current item's path if it exists
      const updatedItem = {
        ...item,
        path: item.path ? `${config.value.BASEHUB}${item.path}` : item.path,
      };

      // Recursively process children if they exist
      if (item.children && item.children.length > 0) {
        updatedItem.children = appendHubPath(item.children);
      }

      return updatedItem;
    });
  };

  return appendHubPath(navigation);
};
