import { SsrData } from '../../../../../core/types/ssrData';
import React from 'react';
import { DDTable } from './DDTable';
import { DDTableValidationType } from '../../../../../core/schema/ddtable/validation';
import { DDTableValidationAtom } from '../../../../../core/schema/useAtomic';
import { useAtom } from 'jotai';

export const DDTableBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
  const [ddtAtom, setDdtAtom] = useAtom(DDTableValidationAtom);

  async function handleSubmit(values: DDTableValidationType) {
    console.log(values);
    setDdtAtom(values);
  }

  return <DDTable questionaire={questionaire} answer={answer} ddtAtom={ddtAtom} handleSubmit={handleSubmit} />;
};
