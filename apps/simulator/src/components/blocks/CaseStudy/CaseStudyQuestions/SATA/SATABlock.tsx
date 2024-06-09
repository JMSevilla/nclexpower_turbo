import React, { useState } from 'react'
import { CaseStudyProps } from '@/core/types/ssrData';
import { SATA } from './SATA';
import { CaseStudySATAValidationType } from '@/core/schema/CSSata/validation';
import { useAtom } from 'jotai';
import { CaseStudySataAtom } from '@/core/schema/useAtomic';

export const SATABlock: React.FC<CaseStudyProps> = ({ questionaire }) => {

    const [csSataAtom, setCsSataAtom] = useAtom(CaseStudySataAtom);
    const [activeTab, setActiveTab] = useState<number>(0);

    async function handleSubmit(values: CaseStudySATAValidationType) {
        console.log(values);
        setCsSataAtom(values);
    }

    return (
        <SATA 
            questionaire={questionaire} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab} 
            csSataAtom={csSataAtom} 
            handleSubmit={handleSubmit}            
        />
    )
}
