import React from 'react';
import { SsrData, } from '@/core/types/ssrData';
import { DNDBowtie } from './DNDBowtie';
import { DNDBowtieValidationType } from '@/core/schema/dndbowtie/validation';
import { useAtom } from 'jotai';
import { DNDBowtieValidationAtom } from '@/core/schema/useAtomic';

export const DNDBowtieBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
  const [dndBowtieAtom, setDnDBowtieAtom] = useAtom(DNDBowtieValidationAtom)

  async function handleSubmit(values: DNDBowtieValidationType) {
    console.log("answer", values)
  }

  return (
    <DNDBowtie
      questionaire={questionaire}
      answer={answer}
      handleSubmit={handleSubmit}
      dndBowtieAtom={dndBowtieAtom}
    />
  );
};
