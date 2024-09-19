import { SelectOption } from "../../../../../../../../components";
import { RegularQuestionSelectionOptions } from "../types";

export const questionType = [
  { value: "SATA", label: "SATA" },
  { value: "MRSN", label: "MRSN" },
  { value: "DDC", label: "DDC" },
];

export const tabsSequence: SelectOption[] = Array.from(
  { length: 6 },
  (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  })
);

export const maxPoints: SelectOption[] = Array.from(
  { length: 25 },
  (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  })
);

export const initBgValues = { seqNum: 0, seqContent: "" };

export const initAnswerValues = { answer: "", answerKey: false };

export const initQuestionsValues = (
  questionnaireType: RegularQuestionSelectionOptions | undefined
) => {
  const answers =
    questionnaireType === "MCQ"
      ? Array(4).fill(initAnswerValues)
      : questionnaireType === "SATA"
        ? Array(5).fill(initAnswerValues)
        : [];

  return {
    clientNeeds: "",
    question: "",
    cognitiveLevel: "",
    contentArea: "",
    answers,
  };
};
