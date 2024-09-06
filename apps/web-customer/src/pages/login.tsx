import withAuth from "core-library/core/utils/withAuth";
import { LoginFormBlock } from "../components/blocks/LoginFormBlock/LoginFormBlock";

function LoginPage() {
  return <LoginFormBlock />;
}

export default withAuth(LoginPage);
