import React from "react";
import { MCQ } from "./blocks/MCQ/MCQ";
import { SATA } from "./blocks/SATA/SATA";

export type AnswerOptionsType = {
  questionType: "regularQuestion" | "caseStudy";
  questionnaireType?: "MCQ" | "SATA";
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
      case "MCQ":
        return <></>;
    }
  }

  return null;
}
