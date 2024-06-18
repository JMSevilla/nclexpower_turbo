import React from 'react';
import { SataRegularQuestion } from '@/core/types/ssrData';
import { SATAQuestion } from './SATA';
import { RegularSATAValidationAtom } from '@/core/schema/useAtomic';
import { RegularSATAValidationType } from '@/core/schema/regularSATA/validation';
import { useAtom } from 'jotai';
import { getParsedChoices } from '@/core/utils/contents';

export const SATABlockQuestionaire: React.FC<SataRegularQuestion> = ({ choices, question }) => {
  // const ParsedChoices = getParsedChoices(contents.choices[0].choices)

  const [regSataAtom, setRegSataAtom] = useAtom(RegularSATAValidationAtom);

  async function handleSubmit(values: RegularSATAValidationType) {
    console.log('Submitted value', values.regSata);
    setRegSataAtom(values);
  }

  return <SATAQuestion handleSubmit={handleSubmit} regSataAtom={regSataAtom} choices={choices} question={question} />;
};
