import { ForgotPasswordFormBlock } from "../../components/blocks/ForgotPasswordBlock/ForgotPasswordBlock";
import withClientSecretKey from "core-library/core/utils/withClientKey";

export const ForgotPassword = () => {
  return <ForgotPasswordFormBlock />;
};

export default withClientSecretKey(ForgotPassword);
