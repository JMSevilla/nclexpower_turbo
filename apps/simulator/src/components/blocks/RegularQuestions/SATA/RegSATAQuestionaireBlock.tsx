import React from 'react';
import { RegularQuestion } from '@/core/types/ssrData';
import { RegSATAQuestion } from './RegSATAQuestion';
import { RegularSATAValidationAtom } from '@/core/schema/useAtomic';
import { RegularSATAValidationType } from '@/core/schema/regularSATA/validation';
import { useAtom } from 'jotai';
import { getParsedChoices } from '@/core/utils/contents';

export const RegrSATAQuestionaireBlock: React.FC<RegularQuestion> = ({ contents, itemselection }) => {
  
  const ParsedChoices = getParsedChoices(contents.choices[0].choices)

  const [regSataAtom, setRegSataAtom] = useAtom(RegularSATAValidationAtom);


  async function handleSubmit(values: RegularSATAValidationType) {
      console.log("Submitted value",values.regSata);
      setRegSataAtom(values);
  }
  
  return (
    <RegSATAQuestion  
    handleSubmit={handleSubmit}
    regSataAtom={regSataAtom}
    itemselection={itemselection} 
    contents={contents}
    ParsedChoices={ParsedChoices}
    />
  );
};
