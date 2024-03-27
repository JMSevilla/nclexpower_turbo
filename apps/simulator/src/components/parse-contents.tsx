import { SsrMockQuestionaire } from "@/core/types/ssrData";
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
      const { QType: QuestionType, qId }: SsrMockQuestionaire =
        deserializeContents;
      //
      switch (QuestionType) {
        case "SATA":
          return <h3>SATA Q</h3>;
        case "MCQ":
          return <h3>MCQ Q</h3>;
        default:
          return <h3>No questionaire Loaded</h3>;
      }
    }
  } else {
    return <h3>No questionaire Loaded</h3>;
  }
};
