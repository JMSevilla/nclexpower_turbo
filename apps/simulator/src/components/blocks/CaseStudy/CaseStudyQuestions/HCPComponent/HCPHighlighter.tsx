import { useExtractBracket } from '@/core/utils/useExtractBracket'
import React, { useEffect, useState } from 'react'


type Props = {
    highlightedTexts?: (value: string[]) => void
    textToHighlight: string | string[]
}

type selectedWordType = {
    word: string
    wordIndex: number
}


export const HCPHighlighter: React.FC<Props> = ({ textToHighlight, highlightedTexts }) => {
    const [highlightedWords, setHighlightedWords] = useState<selectedWordType[]>([]);
    const mergedText = Array.isArray(textToHighlight) ? textToHighlight.join(' \n \n ') : textToHighlight

    const { styledExtractedValue: item } = useExtractBracket(mergedText)


    const wordsInItem = item.split(' ')
    const highlightedWordIndices = highlightedWords.map((w) => w.wordIndex)

    const groupedByConsecutiveIndex = (words: selectedWordType[]) => {
        const groupedByConsecutiveIndex: selectedWordType[][] = words.sort((a, b) => a.wordIndex - b.wordIndex).reduce<selectedWordType[][]>((groups, current, index, array) => {

            if (current) {
                if (index === 0 || (current && current.wordIndex !== (array[index - 1]?.wordIndex ?? -1) + 1)) {
                    groups.push([current]);
                } else {
                    groups[groups.length - 1].push(current);
                }
                return groups;
            }
            return groups;
        }, []);
        const filteredGroups = groupedByConsecutiveIndex
        return filteredGroups
    }

    const removeArrayDuplication = (words: selectedWordType[]) => {
        const removedDuplication = words.filter((ele, ind) => ind === words.findIndex(elem => elem?.wordIndex === ele?.wordIndex)).sort((a, b) => {
            if (a && b) {
                return a.wordIndex - b.wordIndex
            }
            return 0
        })
        return removedDuplication
    }

    useEffect(() => {
        const handleHighlight = () => {
            const selectedHighlight = window.getSelection();
            const ariaLabel = selectedHighlight?.anchorNode?.parentElement?.ariaLabel
            const parseAriaLabel = parseInt(ariaLabel ?? '')

            if (ariaLabel && selectedHighlight && selectedHighlight.toString()) {
                const selectedWord = selectedHighlight.toString().trim().replace(/\n/g, '')
                const wordsInSelectedWord = selectedWord.split(' ')
                const filteredWord = wordsInItem
                    .map((word, index) =>
                        wordsInSelectedWord
                            .map((selectedWord) => {
                                if (word === selectedWord) {
                                    return {
                                        word: word,
                                        wordIndex: index
                                    };
                                }
                            })
                            .filter((word) => word !== undefined)
                            .pop()
                    )
                    .filter((word) => word !== undefined)
                    .sort((a, b) => {
                        if (a && b) {
                            return a.wordIndex - b.wordIndex
                        }
                        return 0;
                    });


                const removedDuplication = removeArrayDuplication(filteredWord as selectedWordType[])
                const wordGroup = groupedByConsecutiveIndex(removedDuplication as selectedWordType[])
                const filterBySelectedAriaLabel = wordGroup.map((group) => {
                    const checkIfAriaExist = group.map((g) => g.wordIndex === parseAriaLabel)
                    if (checkIfAriaExist.includes(true)) {
                        return group
                    }
                }).filter((f) => f !== undefined).pop() ?? []

                setHighlightedWords((prevValues) => {
                    const combinedValues = [...prevValues, ...filterBySelectedAriaLabel]
                    const removeDuplication = removeArrayDuplication(combinedValues)


                    if (prevValues) {
                        const removeRehighlighted = prevValues.map((value) => {
                            const filterByValues =
                                filterBySelectedAriaLabel.map((f) => {
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
    }, []);

    useEffect(() => {
        const groupWords = groupedByConsecutiveIndex(highlightedWords)
        const groupWordsWOIndices = groupWords.map((group) => {
            const joinedWords = group.map(word => word.word.replace("&nbsp", " ")).join(" ")
            return joinedWords
        })

        if (highlightedWords) {
            highlightedTexts && highlightedTexts(groupWordsWOIndices)
        }

    }, [highlightedWords])

    const convertNewline = wordsInItem.map((word) => word.replace(/\n/g, '<br/> '))

    return <div>
        {convertNewline.map((word, index) => {
            const isHighlighted = highlightedWordIndices.includes(index)
            const theObj = { __html: word + ' ' }
            return word.includes('<br/>') ? <span dangerouslySetInnerHTML={theObj} /> : <span className={`${isHighlighted ? 'bg-yellow-300' : ''}`} aria-label={`${index}`} dangerouslySetInnerHTML={theObj} />
        })}
    </div >
}