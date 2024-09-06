import { TextField, ControlledSelectField } from "core-library/components";
import { FormProvider, useForm, Control } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SecurityQuestionAndAnswer } from "../../../../../core/constant/mockSecurityQuestionAndAnswer";
import {
  combinedPasswordSchema,
  CombinedPasswordType,
} from "../../../../../core/schema/PasswordChangeSchema/validation";

interface Props {
  onSecQandASubmit: (values: CombinedPasswordType) => void;
  validSecQAndSecA?: boolean;
  control: Control<CombinedPasswordType>;
}

const formattedSecurityQuestions = SecurityQuestionAndAnswer.map((item) => ({
  label: item.question,
  value: item.questionId.toString(),
  xvalue: item.questionId,
}));

export const SecurityQuestionForm: React.FC<Props> = ({
  onSecQandASubmit,
  validSecQAndSecA,
  control,
}) => {
  const combinedAnswerForm = useForm({
    mode: "onSubmit",
    resolver: yupResolver(combinedPasswordSchema),
    defaultValues: combinedPasswordSchema.getDefault(),
  });

  return (
    <FormProvider {...combinedAnswerForm}>
      <ControlledSelectField
        name="securityQuestion"
        control={control}
        options={formattedSecurityQuestions}
        placeholder="Select Question"
        disabled={validSecQAndSecA}
        sx={{ width: "100%", borderRadius: "10px" }}
      />
      <TextField
        control={control}
        placeholder="Security Answer"
        name="securityAnswer"
        disabled={validSecQAndSecA}
        sx={{
          width: "100%",
          marginBottom: "20px",
        }}
        inputProps={{ style: { padding: 15 } }}
      />
    </FormProvider>
  );
};
