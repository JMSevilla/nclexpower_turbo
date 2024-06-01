import { useSecuredApiCallback } from "@repo/core-library/hooks";
import { RegularAnswer } from "@repo/core-library/types";
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
