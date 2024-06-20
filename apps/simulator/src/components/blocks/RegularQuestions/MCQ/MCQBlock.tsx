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
  const { throwAnswerCb, itemselect } = useRegularMCQQuestionnaire();

  const parsedChoices = parseJSONtoString(choices);

  async function handleSubmit(value: McqSsValidationType) {
    const data = {
      LNum: itemselect[0].lNum,
      CSItemsLNum: 0,
      answer: value.mcqss,
      multiAnswer: [0],
      QType: 'MCQ',
      accountId: '8EECB5D9-54C9-445D-91CC-7E137F7C6C3E',
    };
    await throwAnswerCb.execute(data);
  }

  return <MCQ handleSubmit={handleSubmit} mcqAtom={mcqAtom} question={question} choices={parsedChoices} />;
};
