import { NavigationType } from "../../types/navigation"
import {config} from '../../config'

export const useAuthNavigation = ( navigation  : NavigationType[]) => {
    const appendHubPath = (): NavigationType[] => {
        return navigation.map(item => {
          if (item.path) {
            return {
              ...item,
              path: `${config.value.BASEHUB}${item.path}`,
            };
          } else if (item.children) {
            return {
              ...item,
              children: item.children.map(child => ({
                ...child,
                path: `${config.value.BASEHUB}${child.path}`,
              })),
            };
          }
          return item;
        });
      }  
   return appendHubPath()
  }

