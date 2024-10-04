import { WizardFormMap } from "core-library/hooks";
import { RegularQuestionsSteps, RegularQuestionStepProps } from "./types";
import { RegularQuestionFormType } from "../types";

export type CreateNewRegularQuestionsFormSteps =
  | "CreateNewRegularQuestionMCQ"
  | "CreateNewRegularQuestionSATA";

export const CreateRegularQuestionsSteps = {
  ChooseQuestionType: {
    nextStep: "SummaryView",
    previousStep: "ChooseQuestionType",
    content: (props) => <></>,
  },
} as WizardFormMap<
  Partial<RegularQuestionsSteps>,
  RegularQuestionFormType,
  RegularQuestionStepProps
>;
