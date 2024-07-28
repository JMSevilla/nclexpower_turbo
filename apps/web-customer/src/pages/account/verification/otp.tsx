import OTPBlock from "../../../components/blocks/OTPBlock/OTPBlock";
import withClientSecretKey from "core-library/core/utils/withClientKey";

export function OTPPage() {
  return <OTPBlock />;
}

export default withClientSecretKey(OTPPage);
