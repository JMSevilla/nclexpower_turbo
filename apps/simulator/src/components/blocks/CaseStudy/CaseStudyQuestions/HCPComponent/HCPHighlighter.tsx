import { getHighlightedValues, mergeArrayString, removeArrayDuplication } from '@/core/utils/hcpUtils'
import { useExtractBracket } from '@/core/utils/useExtractBracket'
import { useHighlightedProcessor } from '@/core/utils/useHighlightedProcessor'
import React, { useEffect, useState } from 'react'


type Props = {
    highlightedTexts?: (value: string[]) => void
    textToHighlight: string | string[]
}

export type selectedWordType = {
    word: string
    wordIndex: number
}


export const HCPHighlighter: React.FC<Props> = ({ textToHighlight, highlightedTexts }) => {
    const [highlightedWords, setHighlightedWords] = useState<selectedWordType[]>([]);
    const mergedText = mergeArrayString(textToHighlight)
    const { styledExtractedValue: item } = useExtractBracket(mergedText)

    const wordsInItem = item.split(' ')
    const highlightedWordIndices = highlightedWords.map((w) => w.wordIndex)

    useEffect(() => {
        try {
            const handleHighlight = () => {
                const highlightedValue = getHighlightedValues(wordsInItem)
                if (highlightedValue) {
                    setHighlightedWords((prevValues) => {
                        const combinedValues = [...prevValues, ...highlightedValue]
                        const removeDuplication = removeArrayDuplication(combinedValues)

                        if (prevValues) {
                            const removeRehighlighted = prevValues.map((value) => {
                                const filterByValues =
                                    highlightedValue.map((f) => {
                                        if (f.wordIndex === value.wordIndex) {
                                            return f.wordIndex
                                        }
                                    }).filter((filteredValue) => filteredValue !== undefined).pop()
                                return filterByValues
                            }).filter((filteredValue) => filteredValue !== undefined)

                            const filterCombinedValues = combinedValues.filter((values) => !removeRehighlighted.includes(values.wordIndex))
                            return filterCombinedValues
                        }
                        return removeDuplication
                    })
                }
            }
            document.addEventListener("mouseup", handleHighlight);
            return () => {
                document.removeEventListener("mouseup", handleHighlight);
            };
        }
        catch (error) {
            console.error(error)
        }
    }, []);

    useHighlightedProcessor({
        highlightedWords, returnHiglighted: (values) => {
            highlightedTexts && highlightedTexts(values)
        },
    })

    const renderText = (values: string[]) => {
        return values.map((word, index) => {
            const isHighlighted = highlightedWordIndices.includes(index)
            const convertNewLine = word.replace(/\n/g, '<br/> ')
            const theObj = { __html: convertNewLine + ' ' }

            return word.includes('<br/>') ? <span key={index} dangerouslySetInnerHTML={theObj} /> : <span key={index} className={`${isHighlighted ? 'bg-yellow-300' : ''}`} aria-label={`${index}`} dangerouslySetInnerHTML={theObj} />
        })
    }

    return <div>
        {renderText(wordsInItem)}
    </div >
}