import { RegularQuestionSelectionOptions } from '../types';

export const initAnswerValues = { answer: "", answerKey: false };

export const initQuestionsValues = (questionnaireType: RegularQuestionSelectionOptions | undefined) => {

  const answers = questionnaireType === "MCQ"
    ? Array(4).fill(initAnswerValues)
    : questionnaireType === "SATA"
      ? Array(5).fill(initAnswerValues)
      : [];

  return {
    clientNeeds: "",
    question: "",
    cognitiveLevel: "",
    contentArea: "",
    answers
  };
};
