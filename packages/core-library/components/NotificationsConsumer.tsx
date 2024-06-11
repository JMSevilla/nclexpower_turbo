import { CmsPage } from "../types/page";
import { useNotificationsContext } from "../contexts";
import { AlertMessage } from "./Alert/AlertMessage";
import { MessageType } from "./Alert/alert";

interface Props {
  page: CmsPage | null;
}

export const NotificationsConsumer: React.FC<Props> = ({ page }) => {
  const { notification, loading } = useNotificationsContext();

  if (loading) {
    return null;
  }

  return (
    <AlertMessage
      type={notification?.type}
      html={notification?.message}
      buttons={notification?.buttons}
    />
  );
};
