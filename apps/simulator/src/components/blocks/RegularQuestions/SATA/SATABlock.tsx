import React from 'react';
import { SATAQuestion } from './SATA';
import { RegularSATAValidationAtom } from '@/core/schema/useAtomic';
import { RegularSATAValidationType } from '@/core/schema/regularSATA/validation';
import { useAtom } from 'jotai';
import { RegularQuestion } from '@/core/types/ssrData';
import { parseJSONtoString } from 'core-library/types';
import { useBusinessQueryRegularSubmission } from '@/core/hooks/useRegularSubmission';

export const SATABlock: React.FC<RegularQuestion> = ({ choices, question, questionType }) => {
  const parsedChoices = parseJSONtoString(choices);
  const [regSataAtom, setRegSataAtom] = useAtom(RegularSATAValidationAtom);
  const { submitAnswerAsync, itemselect } = useBusinessQueryRegularSubmission();

  async function handleSubmit(values: RegularSATAValidationType) {
    const selectedValues = values.regSata.filter(item => item.Value === true).map(item => item.XValue);
    const data = {
      LNum: itemselect[0].lNum,
      CSItemsLNum: 0,
      answer: 0,
      multiAnswer: selectedValues,
      QType: questionType,
      accountId: '5A637337-33EC-41AF-A903-4192514B9561',
    };
    setRegSataAtom(values);
    await submitAnswerAsync({ ...data });
  }

  return (
    <SATAQuestion handleSubmit={handleSubmit} regSataAtom={regSataAtom} choices={parsedChoices} question={question} />
  );
};
