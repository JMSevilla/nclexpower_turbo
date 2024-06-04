import React, { useState } from 'react'
import { CaseStudyProps } from '@/core/types/ssrData';
import { SATA } from './SATA';

export const SATABlock: React.FC<CaseStudyProps> = ({ questionaire }) => {

    const [activeTab, setActiveTab] = useState<number>(0);
    const [checkedValues, setCheckedValues] = useState<number[]>([]);
    const handleCheckBoxValues = (value: number) => {
        const isChecked = checkedValues.includes(value);
        if (isChecked) {
            setCheckedValues(checkedValues.filter((val) => val !== value));
        } else {
            setCheckedValues([...checkedValues, value]);
        }
    };

    return (
        <SATA 
            questionaire={questionaire} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab} 
            checkedValues={checkedValues} 
            handleCheckBoxValues={handleCheckBoxValues}            
        />
    )
}

