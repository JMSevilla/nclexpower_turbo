import { ChangePasswordType } from "@/core/Schema";
import { ChangePasswordForm } from "./ChangePasswordForm";

interface Props {
  onSubmit(values: ChangePasswordType): void;
}

export const ChangePasswordBlock: React.FC<Props> = ({ onSubmit }) => {
  return <ChangePasswordForm onSubmit={onSubmit} submitLoading={false} />;
};
