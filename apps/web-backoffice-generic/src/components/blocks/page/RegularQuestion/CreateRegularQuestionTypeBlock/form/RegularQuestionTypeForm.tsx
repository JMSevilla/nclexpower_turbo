import { Button } from "core-library/components";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  regularQuestionTypeFormSchema,
  RegularQuestionTypeFormType,
} from "./validation";
import { TextField } from "core-library/components";
import { useFormFocusOnError } from "core-library/hooks";
import React from "react";

interface Props {
  onSubmit(values: RegularQuestionTypeFormType): void;
  submitLoading?: boolean;
}

export const RegularQuestionTypeForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
}) => {
  const form = useForm<RegularQuestionTypeFormType>({
    mode: "all",
    resolver: yupResolver(regularQuestionTypeFormSchema),
    defaultValues: regularQuestionTypeFormSchema.getDefault(),
  });
  const { control, handleSubmit, clearErrors, setFocus, formState } = form;
  useFormFocusOnError<RegularQuestionTypeFormType>(formState.errors, setFocus);

  return (
    <Box>
      <FormProvider {...form}>
        <TextField<RegularQuestionTypeFormType>
          control={control}
          name="questionType"
          label="Question type"
          onBlur={() => clearErrors()}
        />
        <TextField<RegularQuestionTypeFormType>
          control={control}
          name="description"
          label="(Optional) Description"
          onBlur={() => clearErrors()}
          multiline
          rows={4}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={submitLoading}
          loading={submitLoading}
          sx={{ float: "right", mt: 2, mb: 2 }}
          variant="contained"
          size="small"
        >
          Create
        </Button>
      </FormProvider>
    </Box>
  );
};
