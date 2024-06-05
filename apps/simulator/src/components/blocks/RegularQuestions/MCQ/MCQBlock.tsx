import { MCQ } from '@/components/blocks/RegularQuestions/MCQ/MCQ'
import React from "react";
import { RegularQuestion } from "@/core/types/ssrData";
import { McqSsValidationType } from "@/core/schema/mcq/validation";
import { useAtom } from "jotai";
import { McqSsValidationAtom } from "@/core/schema/useAtomic";
import { useRegularMCQQuestionnaire } from "./hooks";
import { useApplicationContext } from "@/core/context/AppContext";
import { useRouter } from "next/router";


export const MCQBlock: React.FC<RegularQuestion> = ({ contents, itemselection }) => {

    const router = useRouter();
    const [mcqAtom, setMcqAtom] = useAtom(McqSsValidationAtom);
    const { throwAnswerCb } = useRegularMCQQuestionnaire();
    const { setLoader } = useApplicationContext();

    async function handleSubmit(value: McqSsValidationType) {
        await throwAnswerCb
            .execute({
                accountId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6", //Account id should replaced with actual account id
                LNum: itemselection[0].lNum,
                qType: itemselection[0].questionUI,
                answer: value.mcqss,
            })
            .then(async (res: any) => {
                if (res.data === 200) {
                    setLoader(true);
                    router.push({
                        pathname: "/next-item",
                        query: {
                            slug: [
                                "B850483A-AC8D-4DAE-02C6-08DC5B07A84C",
                                "C002B561-66AF-46FC-A4D2-D282D42BD774",
                                "true",
                            ],
                        },
                    });
                }
            });
    }

    return (<MCQ contents={contents} itemselection={itemselection} handleSubmit={handleSubmit} mcqAtom={mcqAtom} />)

}
