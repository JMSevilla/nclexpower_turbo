import React, { useState, useEffect } from 'react';
import { MCQBlock, CaseStudyContainer, SATABlockQuestionaire } from './blocks';
import { useSimulatorGlobals } from '@/core/context/SimulatorContext';
import { datatypes } from '@repo/core-library';
import { AnimatedBoxSkeleton, ComponentLoader } from '@repo/core-library/components';
import { MobileErrorDialog } from './Dialog/MobileErrorDialog';
import { useMobileDetection } from '@repo/core-library/contexts/MobileDetectionContext';
import { useApplicationContext } from '@/core/context/AppContext';
interface Props {
  questionType: string;
  itemSelected: datatypes.CalcItemSelectResponseItem[];
}

export const ParseContents: React.FC<Props> = ({ questionType, itemSelected }) => {
  const { loading } = useApplicationContext();
  const { isMobile } = useMobileDetection();

  if (isMobile) {
    return <MobileErrorDialog isMobile={isMobile} />;
  }

  if (loading) {
    return <ComponentLoader disableMarginBottom={false} />;
  }

  if (questionType === 'RegularQuestion') {
    if (itemSelected && itemSelected.length > 0) {
      const regularQKey = itemSelected.filter(key => key.questionType == questionType);
      if (regularQKey.length > 0) {
        return <MCQBlock choices={regularQKey[0].choices} question={regularQKey[0].question} />;
      }
    }
  }
  // else {
  //   if (
  //     contents &&
  //     contents.answerUI?.length > 0 &&
  //     contents.choices?.length > 0 &&
  //     contents.questionType?.length > 0
  //   ) {
  //     const qKey = contents.questionType.filter(key => key.qType === questionType);
  //     if (qKey.length > 0) {
  //       const { qType: QuestionType } = qKey[0];
  //       console.log(qKey[0]);

  //       switch (QuestionType) {
  //         case 'CaseStudy':
  //           return <CaseStudyContainer questionaire={[]} />;
  //         default:
  //           return <h3>No questionnaire Loaded</h3>;
  //       }
  //     } else {
  //       return <h3>No questionnaire Loaded</h3>;
  //     }
  //   } else {
  //     return <h3>No questionnaire Loaded</h3>;
  //   }
  // }
};
