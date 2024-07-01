import React from 'react';
import { SsrData } from '../../../../../core/types/ssrData';
import { MCQCS } from './MCQCSComponents/MCQCS';
import { useAtom } from 'jotai';
import { MCQGValidationAtom } from '../../../../../core/schema/useAtomic';
import { MCQGValidationType } from '../../../../../core/schema/mcqGroup/validation';

export const MCQCSBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
  const [mcqGAtom, setmcqGAtom] = useAtom(MCQGValidationAtom);

  async function handleSubmit(values: MCQGValidationType) {
    console.log('VALUE : ', values);
    setmcqGAtom(values);
  }

  return <MCQCS handleSubmit={handleSubmit} mcqGAtom={mcqGAtom} questionaire={questionaire} answer={answer} />;
};
