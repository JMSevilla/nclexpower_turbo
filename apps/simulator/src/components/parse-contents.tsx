import MCQQuestion from '@/components/block/CaseStudy/MCQNoGroup/MCQQuestion';
import MCQGroupQuestion from '@/components/block/CaseStudy/MCQWithGroup/MCQGroupQuestion';
import SATAQuestion from '@/components/block/CaseStudy/SATA/SATAQuestion';
import { SsrMockQuestionaire, SsrMockQuestionaireAnswer } from "@/core/types/ssrData";
import React from "react";

interface Props {
  questionaire: SsrMockQuestionaire[];
  questionKey: string;
  answer: SsrMockQuestionaireAnswer[];
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
      const { QType: QuestionType, qId }: SsrMockQuestionaire =
        deserializeContents;
      //
      switch (QuestionType) {
        case "SATA":
          return <h3>SATA Q</h3>;
        // <SATAQuestion data={deserializeContents} />;




        case "MCQ":
          return <MCQQuestion data={deserializeContents} />
        // <h3>MCQ Q</h3>;



        case "MCQGroup":
          return <h3>MCQ Group</h3>;
        // <MCQGroupQuestion data={deserializeContents} />

        default:
          return <h3>No questionaire Loaded</h3>;
      }
    }
  } else {
    return <h3>No questionaire Loaded</h3>;
  }
};
