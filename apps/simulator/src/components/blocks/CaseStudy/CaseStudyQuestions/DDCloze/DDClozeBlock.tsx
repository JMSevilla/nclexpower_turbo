import React, { useState } from 'react';
import { SsrData, SelectedValuesType} from "@/core/types/ssrData";
import { DDCloze } from './DDCloze';


export const DDClozeBlock: React.FC<SsrData> = ({ questionaire, answer }) => {

    const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({});
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValues({
            ...selectedValues,
            [event.target.name]: event.target.value
        });
    };

    return (
        <DDCloze 
        questionaire={questionaire} 
        answer={answer} 
        selectedValues={selectedValues}
        handleSelectChange={handleSelectChange}        
        />
    );
};
