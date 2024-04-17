
// import React from "react";
// import { McqQuestion, CaseStudyContainer, RegularSATAQuestionaire, } from "./blocks";
// import { useSimulatorGlobals } from "@/core/context/SimulatorContext";
// import { datatypes } from "@repo/utils";

// interface Props {
//   questionKey: string;
//   itemSelected: datatypes.CalcItemSelectValues[]
// }

// export const ParseContents: React.FC<Props> = ({
//   questionKey,
//   itemSelected
// }) => {
//   /* use this contents to get the content data */
//   const { contents } = useSimulatorGlobals()
//   if (contents && contents.answerUI?.length > 0 && contents.choices?.length > 0 && contents.questionType?.length > 0) {
//     const qKey = contents.questionType.filter(key => key.qType === questionKey);
//     const {
//       qType: QuestionType
//     } = qKey[0];
//     switch (QuestionType) {
//       case "SATA":
//         return <RegularSATAQuestionaire contents={contents} itemselection={itemSelected} />
//       case "MCQ":
//         return <McqQuestion questionaire={[]} answer={[]} />
//       case "CaseStudy":
//         return <CaseStudyContainer questionaire={[]} />
//       default:
//         return <h3>No questionaire Loaded</h3>;

//     }
//   } else {
//     return <h3>No questionaire Loaded</h3>;
//   }
// };

import React from "react";
import { McqQuestion, CaseStudyContainer, RegularSATAQuestionaire } from "./blocks";
import { useSimulatorGlobals } from "@/core/context/SimulatorContext";
import { datatypes } from "@repo/utils";
import { SsrMockQuestionaire } from "@/core/types/ssrData";

interface Props {
  questionKey: string;
  itemSelected: datatypes.CalcItemSelectValues[]
  questionaire: SsrMockQuestionaire[];
}

export const ParseContents: React.FC<Props> = ({
  questionKey,
  itemSelected,
  questionaire
}) => {
  /* use this contents to get the content data */
  const { contents } = useSimulatorGlobals()
  if (contents && contents.answerUI?.length > 0 && contents.choices?.length > 0 && contents.questionType?.length > 0) {
    const qKey = contents.questionType.filter(key => key.qType === questionKey);
    // const {
    //   qType: QuestionType
    // } = qKey[0];

    const deserializeContents: any =
      questionaire?.length > 0 &&
      questionaire?.filter((cms: SsrMockQuestionaire) => {
        return cms.QType === questionKey;
      });

    const {
      QType,
      questions,
      answer,
    } = deserializeContents?.[0];


    switch (QType) {
      case "SATA":
        return <RegularSATAQuestionaire contents={contents} itemselection={itemSelected} />
      case "MCQ":
        return <McqQuestion questionaire={deserializeContents} answer={answer} />
      case "CaseStudy":
        return <CaseStudyContainer questionaire={deserializeContents} />
      default:
        return <h3>No questionaire Loaded</h3>;

    }
  } else {
    // return <h3>No questionaire Loaded</h3>;
    const deserializeContents: any =
      questionaire?.length > 0 &&
      questionaire?.filter((cms: SsrMockQuestionaire) => {
        return cms.QType === questionKey;
      });

    const {
      QType,
      questions,
      answer,
    } = deserializeContents?.[0];


    switch (QType) {
      case "SATA":
        return <RegularSATAQuestionaire contents={contents} itemselection={itemSelected} />
      case "MCQ":
        return <McqQuestion questionaire={deserializeContents} answer={answer} />
      case "CaseStudy":
        return <CaseStudyContainer questionaire={questions} />
      default:
        return <h3>No questionaire Loaded</h3>;

    }
  }
};