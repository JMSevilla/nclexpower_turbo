import { RegularQuestionTypeParams } from "core-library/api/types";
import { RegularQuestionTypeForm } from "./RegularQuestionTypeForm";
import { useApiCallback } from "core-library/hooks";
import { useExecuteToast } from "core-library/contexts";
import { RegularQuestionTypeFormType } from "./validation";

export function RegularQuestionTypeFormBlock() {
  const createCb = useApiCallback(
    async (api, args: RegularQuestionTypeParams) =>
      await api.webbackoffice.createRegularType(args)
  );
  const toast = useExecuteToast();

  return (
    <RegularQuestionTypeForm
      onSubmit={handleSubmit}
      submitLoading={createCb.loading}
    />
  );

  async function handleSubmit(values: RegularQuestionTypeFormType) {
    const result = await createCb.execute({
      questionType: values.questionType,
      description: values.description ?? "no-description",
    });
    if (result.data === 1018) {
      toast.executeToast(
        "There is unexpected problem. please try again.",
        "top-right",
        false,
        { type: "error" }
      );
      return;
    }
    toast.executeToast("Successfully Added.", "top-right", false, {
      type: "success",
    });
  }
}
