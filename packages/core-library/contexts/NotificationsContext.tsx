import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CmsButton } from "../types/common";
import { MessageType } from "../components/Alert/alert";
import { useScroll } from "../core";
import { useRouter } from "../core";
import { usePageLoaderContext } from "./PageLoaderContext";

interface NotificationsContextValue {
  notification?: Notification;
  loading?: boolean;
  showNotifications: (notifications: Notification[]) => void;
  hideNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue>({
  showNotifications: () => null,
  hideNotifications: () => null,
});

interface Notification {
  timer?: boolean;
  type: MessageType;
  message?: string;
  buttons?: CmsButton[];
  children?: JSX.Element;
}

export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const router = useRouter();
  const scroll = useScroll();
  const { isLoading, isCalculationsLoaded } = usePageLoaderContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isDataLoading =
    isLoading ||
    (router.asPath === router.staticRoutes.hub && !isCalculationsLoaded);

  const hideNotifications = useCallback(() => setNotifications([]), []);

  const showNotifications = useCallback(
    (notifications: Notification[]) => {
      setNotifications(notifications);
      scroll.scrollTop();
    },
    [scroll]
  );

  useEffect(() => {
    router.events.on("routeChangeComplete", hideNotifications);
    router.events.on("routeChangeError", hideNotifications);
    return () => {
      router.events.off("routeChangeComplete", hideNotifications);
      router.events.off("routeChangeError", hideNotifications);
    };
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notification: notifications?.[0],
        loading: isDataLoading,
        showNotifications,
        hideNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
