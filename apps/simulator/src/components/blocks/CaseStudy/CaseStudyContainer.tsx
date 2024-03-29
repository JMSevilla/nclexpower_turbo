
import SATATable from '@/components/blocks/CaseStudy/SATA/SATATable'
import { Checkbox, Paper } from '@mui/material'
import React, { useState } from 'react'

interface QuestionData {

}
interface Props {
    question: QuestionData
}


export const CaseStudyContainer: React.FC<Props> = ({ question }) => {

    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <div className='w-full h-full p-5 flex'>

        </div>
    )
}

export default CaseStudyContainer
