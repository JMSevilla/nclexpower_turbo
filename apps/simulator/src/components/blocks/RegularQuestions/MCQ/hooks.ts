import { useSecuredApiCallback } from "@repo/utils/hooks";
import { RegularAnswer } from "@repo/utils/types";
import { useEffect } from "react";

export const useRegularMCQQuestionnaire = () => {
  const throwAnswerCb = useSecuredApiCallback(
    async (api, data: RegularAnswer) => await api.secure.createAnswer(data)
  );

  useEffect(() => {
    if (throwAnswerCb.error) {
      const errors = throwAnswerCb.error as unknown as string[];
      console.log(errors.map((e) => e));
    }
  }, [throwAnswerCb.error]);

  return {
    throwAnswerCb,
  };
};
