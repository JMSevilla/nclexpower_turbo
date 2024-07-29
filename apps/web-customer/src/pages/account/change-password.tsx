import { ChangePasswordBlock } from "../../components/blocks/ForgotPasswordBlock/ChangePasswordBlock/ChangePasswordBlock";
import withClientSecretKey from "core-library/core/utils/withClientKey";

export function ChangePasswordPage() {
  return <ChangePasswordBlock />;
}

export default withClientSecretKey(ChangePasswordPage);
