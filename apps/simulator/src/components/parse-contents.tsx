import CaseStudyContainer from '@/components/blocks/CaseStudy/CaseStudyContainer';
import SATAQuestion from '@/components/blocks/RegularQuestion/SATA/SATAQuestion';

import { SsrMockQuestionaire, SsrMockQuestionaireAnswer } from "@/core/types/ssrData";
import React from "react";

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
      questionaire?.find((cms: SsrMockQuestionaire) => {
        return cms.QType === questionKey;
      });
    if (questionaire) {
      const { QType: QuestionType }: SsrMockQuestionaire =
        deserializeContents;
      //
      switch (QuestionType) {
        case "SATA":
          return <SATAQuestion question={deserializeContents} />

        default:
          return <h3>No questionaire Loaded</h3>;
      }
    }
  } else {
    return <h3>No questionaire Loaded</h3>;
  }
};
