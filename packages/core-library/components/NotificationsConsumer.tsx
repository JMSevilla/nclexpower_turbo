import { CmsPage } from "../types/page";
import { useNotificationsContext } from "../contexts";
interface Props {
  page: CmsPage | null;
}

export const NotificationsConsumer: React.FC<Props> = ({ page }) => {
  const { notification, loading } = useNotificationsContext();

  if (loading) {
    return null;
  }

  return <></>;
};
