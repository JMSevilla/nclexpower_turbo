import { Dispatch, SetStateAction } from 'react';

export type selectedWordType = {
    word: string
    wordIndex: number
}

export const groupedByConsecutiveIndex = (words: selectedWordType[]) => {
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

    return groupedByConsecutiveIndex
}


export const mergeArrayString = (value: string | string[]) => {
    return Array.isArray(value) ? value.join(' \n \n ') : value
}


export const removeArrayDuplication = (item: selectedWordType[]) => {
    const removedDuplication = item.filter((ele, ind) => ind === item.findIndex(elem => elem?.wordIndex === ele?.wordIndex)).sort((a, b) => {
        if (a && b) {
            return a.wordIndex - b.wordIndex
        }
        return 0
    })
    return removedDuplication
}


export const getHighlightedValues = (wordsInItem: string[]) => {
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

        return filterBySelectedAriaLabel
    }

}


export const handleHighlight = (
    wordsInItem: string[],
    setHighlightedWords: Dispatch<SetStateAction<selectedWordType[]>>
) => {
    const handleMouse = () => {
        const highlightedValue = getHighlightedValues(wordsInItem)

        if (highlightedValue) {
            setHighlightedWords((prevValues) => {
                const combinedValues = [...prevValues, ...highlightedValue]
                const removeDuplication = removeArrayDuplication(combinedValues)

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
                return removeDuplication
            })
        }
    }
    document.addEventListener("mouseup", handleMouse);
    return () => {
        document.removeEventListener("mouseup", handleMouse);
    };
}

export const renderHighlightText = (values: string[], highlightedWords: selectedWordType[]) => {
    const highlightedWordIndices = highlightedWords.map((w) => w.wordIndex)
    return values.map((word, index) => {
        const isHighlighted = highlightedWordIndices.includes(index)
        const convertNewLine = word.replace(/\n/g, '<br/> ')
        const theObj = { __html: convertNewLine + ' ' }

        return word.includes('<br/>') ? <span key={index} dangerouslySetInnerHTML={theObj} /> : <span key={index} className={`${isHighlighted ? 'bg-yellow-300' : ''}`} aria-label={`${index}`} dangerouslySetInnerHTML={theObj} />
    })
}