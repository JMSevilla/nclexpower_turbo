import React, { useEffect, useState } from 'react'
import { useExtractBracket } from '@/core/utils/useExtractBracket'
import { useHighlightedProcessor } from '@/core/utils/useHighlightedProcessor'
import { handleHighlight, mergeArrayString, renderHighlightText, selectedWordType } from '@/core/utils/hcpUtils'

type Props = {
    highlightedTexts?: (value: string[]) => void
    textToHighlight: string | string[]
}

export const HCPHighlighter: React.FC<Props> = ({ textToHighlight, highlightedTexts }) => {
    const [highlightedWords, setHighlightedWords] = useState<selectedWordType[]>([]);
    const mergedText = mergeArrayString(textToHighlight)
    const { styledExtractedValue: item } = useExtractBracket(mergedText)
    const wordsInItem = item.split(' ')


    useEffect(() => {
        try {
            const handleMouse = handleHighlight(wordsInItem, setHighlightedWords)
            return handleMouse
        }
        catch (error) {
            console.error('There was an error in Highlighting Text', error)
        }
    }, []);

    useHighlightedProcessor({
        highlightedWords, returnHiglighted: (values) => {
            console.log(values)
            highlightedTexts && highlightedTexts(values)
        },
    })

    return <div>
        {renderHighlightText(wordsInItem, highlightedWords)}
    </div >
}