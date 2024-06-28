import { MCQ } from '@/components/blocks/RegularQuestions/MCQ/MCQ';
import React from 'react';
import { RegularQuestion } from '@/core/types/ssrData';
import { McqSsValidationType } from '@/core/schema/mcq/validation';
import { useAtom } from 'jotai';
import { McqSsValidationAtom } from '@/core/schema/useAtomic';
import { useRegularMCQQuestionnaire } from './hooks';
import { useRouter } from 'next/router';
import { parseJSONtoString } from '@repo/core-library/types';

export const MCQBlock: React.FC<RegularQuestion> = ({ choices, question }) => {
  const [mcqAtom, setMcqAtom] = useAtom(McqSsValidationAtom);
  const { submitAnswerAsync, itemselect } = useRegularMCQQuestionnaire();

  const parsedChoices = parseJSONtoString(choices);

  async function handleSubmit(value: McqSsValidationType) {
    const data = {
      LNum: itemselect[0].lNum,
      CSItemsLNum: 0,
      answer: value.mcqss,
      multiAnswer: [0],
      QType: 'MCQ',
      accountId: '5A637337-33EC-41AF-A903-4192514B9561',
    };
    await submitAnswerAsync({ ...data });
  }

  return <MCQ handleSubmit={handleSubmit} mcqAtom={mcqAtom} question={question} choices={parsedChoices} />;
};
