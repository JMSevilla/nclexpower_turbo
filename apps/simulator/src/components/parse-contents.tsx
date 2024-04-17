
import React from "react";
import { McqQuestion, CaseStudyContainer, SATAQuestionaire, RegularSATA } from "./blocks";
import { useSimulatorGlobals } from "@/core/context/SimulatorContext";
import { datatypes } from "@repo/utils";

interface Props {
  questionKey: string;
  itemSelected: datatypes.CalcItemSelectValues[]
}

export const ParseContents: React.FC<Props> = ({
  questionKey,
  itemSelected
}) => {
  /* use this contents to get the content data */
  const { contents } = useSimulatorGlobals()
  if (contents && contents.answerUI?.length > 0 && contents.choices?.length > 0 && contents.questionType?.length > 0) {
    const qKey = contents.questionType.filter(key => key.qType === questionKey);
    const {
      qType: QuestionType
    } = qKey[0];
    switch (QuestionType) {
      case "SATA":
        return <SATAQuestionaire contents={contents} itemselection={itemSelected} />
      case "MCQ":
        return <McqQuestion questionaire={[]} answer={[]} />
      case "CaseStudy":
        return <CaseStudyContainer questionaire={[]} />
      default:
        return <h3>No questionaire Loaded</h3>;

    }
  } else {
    return <h3>No questionaire Loaded</h3>;
  }
};
