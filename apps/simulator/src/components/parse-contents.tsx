import React, { useState, useEffect, useContext } from 'react';
import { MCQBlock, CaseStudyContainer, SATABlockQuestionaire } from './blocks';
import { useSimulatorGlobals } from '@/core/context/SimulatorContext';
import { datatypes } from '@repo/core-library';
import { AnimatedBoxSkeleton } from '@repo/core-library/components';
import { MobileDetectionContext } from '@repo/core-library/contexts/MobileDetectionContext'
import { MobileErrorDialog } from "./Dialog/MobileErrorDialog";

interface Props {
  questionType: string;
  questionKey: string;
  itemSelected: datatypes.CalcItemSelectValues[];
}

export const ParseContents: React.FC<Props> = ({ questionType, questionKey, itemSelected }) => {
  /* use this contents to get the content data */
  const { contents } = useSimulatorGlobals();
  const [isLoading, setIsloading] = useState<boolean>(true); //this is for displaying the Skeleton Loader
  const { isMobile } = useContext(MobileDetectionContext)

  if (isMobile) {
    return <MobileErrorDialog isMobile={isMobile} />;
  }

  useEffect(() => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  }, [questionKey, questionType]);

  if (isLoading) {
    return questionType == 'RegularQuestion' ? (
      <AnimatedBoxSkeleton borderRadius={2} boxShadow={1} height={350} className="opacity-50" />
    ) : (
      <div className="gap-2 flex flex-col opacity-50">
        <AnimatedBoxSkeleton borderRadius={2} boxShadow={1} height={50} />
        <div className="flex gap-2">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="w-1/2 flex flex-col gap-2">
              {Array.from({ length: 2 }).map((_, subIdx) => (
                <AnimatedBoxSkeleton key={subIdx} borderRadius={2} boxShadow={1} height={subIdx === 0 ? 60 : 280} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (questionType === 'RegularQuestion') {
    if (itemSelected && itemSelected.length > 0) {
      const regularQKey = itemSelected.filter(key => key.questionUI === questionKey);
      if (regularQKey.length > 0) {
        const { questionUI } = regularQKey[0];
        switch (questionUI) {
          case 'SATA':
            return <SATABlockQuestionaire contents={contents} itemselection={itemSelected} />;
          case 'MCQ':
            return <MCQBlock contents={contents} itemselection={itemSelected} />;
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
      const qKey = contents.questionType.filter(key => key.qType === questionKey);
      if (qKey.length > 0) {
        const { qType: QuestionType } = qKey[0];
        console.log(qKey[0]);

        switch (QuestionType) {
          case 'CaseStudy':
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
