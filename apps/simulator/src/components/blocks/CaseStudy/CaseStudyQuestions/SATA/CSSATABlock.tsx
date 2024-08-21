import React, { useState } from 'react';
import { CaseStudyProps } from '@/core/types/ssrData';
import { SATA } from './SATA';
import { CaseStudySATAValidationType } from '@/core/schema/CSSata/validation';
import { useAtom } from 'jotai';
import { CaseStudySataAtom } from '@/core/schema/useAtomic';

export const CSSATABlock: React.FC<CaseStudyProps> = ({ questionaire }) => {
  const [csSataAtom, setCsSataAtom] = useAtom(CaseStudySataAtom);

  async function handleSubmit(values: CaseStudySATAValidationType) {
    console.log(values);
    setCsSataAtom(values);
  }

  return <SATA questionaire={questionaire} csSataAtom={csSataAtom} handleSubmit={handleSubmit} />;
};
