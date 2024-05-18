import React, { useState, useEffect } from "react";
import {
  RegularMCQSSQuestionnaire,
  CaseStudyContainer,
  RegularSATAQuestionaire,
} from "./blocks";
import { useSimulatorGlobals } from "@/core/context/SimulatorContext";
import { datatypes } from "@repo/utils";
import { AnimatedBoxSkeleton } from '@repo/ui';

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
  const [isLoading, setIsloading] = useState<boolean>(false) //this is for displaying the Skeleton Loader

  useEffect(() => {
    setIsloading(true)
    setTimeout(() => {
      setIsloading(false)
    }, 2000)
  }, [questionKey, questionType])

  if (isLoading) {
    return questionType == "RegularQuestion" ?
      <div className='w-50% h-[300px] flex justify-center items-center'>
        <AnimatedBoxSkeleton borderRadius={2} boxShadow={1} height={350} className='opacity-50' />
      </div>
      :
      <div className='w-50% h-fit flex flex-col justify-center items-center gap-2'>
        <AnimatedBoxSkeleton borderRadius={2} boxShadow={1} height={50} className='opacity-50' />
        <div className='flex w-full gap-2'>
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className='w-1/2 flex flex-col gap-2'>
              {Array.from({ length: 2 }).map((_, subIdx) => (
                <AnimatedBoxSkeleton
                  key={subIdx}
                  borderRadius={2}
                  boxShadow={1}
                  height={subIdx === 0 ? 60 : 280}
                  className='opacity-50'
                />
              ))}
            </div>
          ))}
        </div>
      </div>
  }

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

