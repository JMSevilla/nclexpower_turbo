import React from 'react';
import { DND } from '../../../../../components/blocks/CaseStudy/CaseStudyQuestions/DND/DND';
import { DNDValidationAtom } from '../../../../../core/schema/useAtomic';
import { DNDValidationType } from '../../../../../core/schema/dnd/validation';
import { CaseStudyProps } from '../../../../../core/types/ssrData';
import { useAtom } from 'jotai';

export const DNDBlock: React.FC<CaseStudyProps> = ({ questionaire }) => {
  const [dndAtom, setDndAtom] = useAtom(DNDValidationAtom);

  async function handleSubmit(value: DNDValidationType) {
    console.log('submit', value);
  }

  return <DND handleSubmit={handleSubmit} dndAtom={dndAtom} questionaire={questionaire} />;
};
