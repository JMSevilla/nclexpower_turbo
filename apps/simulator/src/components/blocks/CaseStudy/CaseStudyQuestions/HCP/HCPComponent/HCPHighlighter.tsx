import React, { useEffect, useState } from 'react'
import { useParsedHCPLabelKey } from '@/core/utils/useParsedHCPLabelKey '
import { useHighlightedProcessor } from '@/core/utils/useHighlightedProcessor'
import { handleHighlight, mergeArrayString, renderHighlightText, selectedWordType } from '@/core/utils/hcpUtils'

type Props = {
    highlightedTexts?: (value: string[]) => void
    textToHighlight: string | string[]
}

export const HCPHighlighter: React.FC<Props> = ({ textToHighlight, highlightedTexts }) => {
    const [highlightedWords, setHighlightedWords] = useState<selectedWordType[]>([]);
    const mergedText = mergeArrayString(textToHighlight)
    const { styledExtractedValue: item } = useParsedHCPLabelKey(mergedText)
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
            highlightedTexts && highlightedTexts(values)
        },
    })

    return renderHighlightText(wordsInItem, highlightedWords)
}