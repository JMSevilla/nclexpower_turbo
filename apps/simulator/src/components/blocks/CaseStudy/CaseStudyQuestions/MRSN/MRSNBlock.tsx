import { MRSN } from '@/components/blocks/CaseStudy/CaseStudyQuestions/MRSN/MRSN';
import { MrsnValidationType } from '@/core/schema/mrsn/validation';
import { MrsnValidationAtom } from '@/core/schema/useAtomic';
import { SsrData } from '@/core/types/ssrData';
import { getParsedChoices } from '@/core/utils/contents';
import { useAtom } from 'jotai';

export const MRSNBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
    const [mrsnAtom, setMrsnAtom] = useAtom(MrsnValidationAtom);
    const answerList = answer ? answer[0].rows : null
    const ParsedChoices = getParsedChoices(answerList)

    async function handleSubmit(values: MrsnValidationType) {
        console.log(values);
        setMrsnAtom(values);
    }

    return (
        <MRSN
            questionaire={questionaire}
            answer={answer}
            handleSubmit={handleSubmit}
            mrsnAtom={mrsnAtom}
            ParsedChoices={ParsedChoices}
        />
    )
}