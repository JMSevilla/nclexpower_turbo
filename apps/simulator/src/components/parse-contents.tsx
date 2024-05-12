import React from "react";
import {
  RegularMCQSSQuestionnaire,
  CaseStudyContainer,
  RegularSATAQuestionaire,
} from "./blocks";
import { useSimulatorGlobals } from "@/core/context/SimulatorContext";
import { datatypes } from "@repo/utils";

interface Props {
  questionType: string;
  questionKey: string;
  itemSelected: datatypes.CalcItemSelectValues[];
}

export const ParseContents: React.FC<Props> = ({
  questionType,
  questionKey,
  itemSelected,
}) => {
  /* use this contents to get the content data */
  const { contents } = useSimulatorGlobals();

  if (questionType === "RegularQuestion") {
    if (itemSelected && itemSelected.length > 0) {
      const regularQKey = itemSelected.filter(
        (key) => key.questionUI === questionKey
      );
      if (regularQKey.length > 0) {
        const { questionUI } = regularQKey[0];
        switch (questionUI) {
          case "SATA":
            return (
              <RegularSATAQuestionaire
                contents={contents}
                itemselection={itemSelected}
              />
            );
          case "MCQ":
            return (
              <RegularMCQSSQuestionnaire
                contents={contents}
                itemselection={itemSelected}
              />
            );
          default:
            return <h3>No questionnaire Loaded</h3>;
        }
      }
    }
  } else {
    if (
      contents &&
      contents.answerUI?.length > 0 &&
      contents.choices?.length > 0 &&
      contents.questionType?.length > 0
    ) {
      const qKey = contents.questionType.filter(
        (key) => key.qType === questionKey
      );

      if (qKey.length > 0) {
        const { qType: QuestionType } = qKey[0];
        console.log(QuestionType);
        console.log(qKey[0]);
        switch (QuestionType) {
          case "CaseStudy":
            return <CaseStudyContainer questionaire={[]} />;
          default:
            return <h3>No questionnaire Loaded</h3>;
        }
      } else {
        return <h3>No questionnaire Loaded</h3>;
      }
    } else {
      return <h3>No questionnaire Loaded</h3>;
    }
  }
};

