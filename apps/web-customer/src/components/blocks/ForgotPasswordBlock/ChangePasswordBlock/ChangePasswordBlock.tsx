import { ChangePasswordType } from "@/core/Schema";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { useRouter } from "core-library/core/router";

interface Props {
  onSubmit(values: ChangePasswordType): void;
}

export const ChangePasswordBlock: React.FC<Props> = ({ onSubmit }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push((route) => route.login);
  };

  return <ChangePasswordForm onSubmit={onSubmit} submitLoading={false} handleBack={handleBack} />;
};
