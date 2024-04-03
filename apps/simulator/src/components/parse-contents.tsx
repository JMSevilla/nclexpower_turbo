
import { SsrMockQuestionaire, AnswerProps } from "@/core/types/ssrData";
import React from "react";
import { McqQuestion, CaseStudyContainer, SATAQuestionaire } from "./blocks";

interface Props {
  questionaire: SsrMockQuestionaire[];
  questionKey: string;
}

export const ParseContents: React.FC<Props> = ({
  questionaire,
  questionKey,
}) => {
  if (questionaire.length > 0) {
    const deserializeContents: any =
      questionaire?.length > 0 &&
      questionaire?.filter((cms: SsrMockQuestionaire) => {
        return cms.QType === questionKey;
      });
    if (questionaire) {
      const {
        QType: QuestionType,
        questions,
        answer,
      } = deserializeContents?.[0];
      switch (QuestionType) {
        case "SATA":
          return <SATAQuestionaire questionaire={deserializeContents} />
        case "MCQ":
          return (
            <McqQuestion
              questionaire={deserializeContents}
              answer={answer as AnswerProps[]}
            />
          );
        case "CaseStudy":
          return <CaseStudyContainer questionaire={questions} />;
        default:
          return <h3>No questionaire Loaded</h3>;
      }
    }
  } else {
    return <h3>No questionaire Loaded</h3>;
  }
};
