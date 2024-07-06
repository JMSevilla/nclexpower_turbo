import { ForgotPasswordForm } from "./ForgotPasswordForm";
import {
  forgotPasswordSchema,
  forgotPasswordType,
} from "@/core/Schema/ForgotPasswordValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export function ForgotPasswordFormBlock() {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordSchema.getDefault(),
  });

  const { control, handleSubmit } = form;

  const onSubmit = (value: forgotPasswordType) => {
    console.log(value);
  };

  return (
    <ForgotPasswordForm
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    />
  );
}
