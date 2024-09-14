import { DDC } from "./blocks/CaseStudy/DDC/DDC";
import { MCQ } from "./blocks/Regular/MCQ/MCQ";
import { SATA } from "./blocks/Regular/SATA/SATA";

export type AnswerOptionsType = {
  questionType: "regularQuestion" | "caseStudy";
  questionnaireType?: "MCQ" | "SATA" | "DDC";
  questionIndex: number;
};

export const AnswerOptions: React.FC<AnswerOptionsType> = ({
  questionType,
  questionnaireType,
  questionIndex,
}) => {
  if (questionType === "regularQuestion") {
    switch (questionnaireType) {
      case "MCQ":
        return <MCQ questionIndex={questionIndex} />;
      case "SATA":
        return <SATA questionIndex={questionIndex} />;
    }
  } else if (questionType === "caseStudy") {
    switch (questionnaireType) {
      case "DDC":
        return <DDC questionIndex={questionIndex} />;
    }
  }

  return null;
};
