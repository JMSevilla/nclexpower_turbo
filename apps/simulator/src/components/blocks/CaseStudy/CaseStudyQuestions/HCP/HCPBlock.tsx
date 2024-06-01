import React, { useState } from 'react'
import { HCPValidationType } from '@/core/schema/hcp/validation';
import { HCPValidationAtom } from '@/core/schema/useAtomic';
import { SsrData } from '@/core/types/ssrData'
import { useAtom } from 'jotai';
import { HCP } from '@/components/blocks/CaseStudy/CaseStudyQuestions/HCP/HCP';




export const HCPBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
    const [hcpAtom, setHcpAtom] = useAtom(HCPValidationAtom);

    async function handleSubmit(values: HCPValidationType) {
        console.log("hcpValue", values);
    }

    return (
        <HCP questionaire={questionaire}
            answer={answer}
            handleSubmit={handleSubmit}
            hcpAtom={hcpAtom} />
    )
}