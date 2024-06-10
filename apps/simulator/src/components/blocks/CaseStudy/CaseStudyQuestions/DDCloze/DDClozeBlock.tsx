import React, { useState } from 'react';
import { SsrData, SelectedValuesType} from "@/core/types/ssrData";
import { DDCloze } from './DDCloze';
import { DDClozeValidationType } from '@/core/schema/ddcloze/validation'; 
import { DDClozeValidationAtom } from '@/core/schema/useAtomic';
import { useAtom } from 'jotai';


export const DDClozeBlock: React.FC<SsrData> = ({ questionaire, answer }) => {

    const [ddcAtom, setDdcAtom] = useAtom(DDClozeValidationAtom);
    
    async function handleSubmit(values: DDClozeValidationType) {
        console.log(values);
        setDdcAtom(values);
    }

    return (
        <DDCloze 
        questionaire={questionaire} 
        answer={answer} 
        ddcAtom={ddcAtom}
        handleSubmit={handleSubmit}        
        />
    );
};
