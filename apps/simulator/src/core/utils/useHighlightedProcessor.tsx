import { groupedByConsecutiveIndex, selectedWordType } from '@/core/utils/hcpUtils';
import { useEffect } from 'react';

type Props = {
    highlightedWords: selectedWordType[];
    returnHiglighted: (highlightedTexts: string[]) => void;
};

export const useHighlightedProcessor = ({ highlightedWords, returnHiglighted }: Props) => {
    useEffect(() => {
        const groupWords = groupedByConsecutiveIndex(highlightedWords);
        const groupWordsWOIndices = groupWords.map((group) => {
            const joinedWords = group.map(word => word.word.replace("&nbsp;", " ")).join(" ");
            return joinedWords ?? ' ';
        });

        returnHiglighted(groupWordsWOIndices);
    }, [highlightedWords]);
};