import { useState, useEffect, useMemo } from 'react';

interface replaceMatchesProps {
    format: string;
    content: string;
}

interface BracketProps extends replaceMatchesProps {
    original: string;
    replacedValue: string
}


export const useParsedHCPLabelKey = (input: string) => {
    const [matches, setMatches] = useState<BracketProps[]>([]);
    const [text, setText] = useState<string>(input)

    const replaceMatches = (toReplace: replaceMatchesProps) => {
        switch (toReplace.format) {
            case 'bold':
                return `<strong>${toReplace.content.replace(" ", '&nbsp')}</strong>`
            case 'label':
                return `<strong>${toReplace.content.replace(" ", '&nbsp')}</strong> <br/>`
            default:
                return toReplace.content
        }
    }


    useEffect(() => {
        const regex = /\[\[([a-zA-Z]+):\s*([^\]]*)\]\]/g;
        const extractedMatches: BracketProps[] = [];
        let updatedValue: string = input;
        let match;

        while ((match = regex.exec(input)) !== null) {
            let toReplace = {
                format: match[1],
                content: match[2],
            }

            extractedMatches.push({
                original: match[0],
                replacedValue: replaceMatches(toReplace),
                ...toReplace
            })

            const replaceText = replaceMatches(toReplace)
            updatedValue = updatedValue.replace(match[0], replaceText as string)
        }

        setText(updatedValue)

        setMatches(extractedMatches);
    }, [input]);

    const memoizeTextValue = useMemo(() => text, [text])

    return {
        styledExtractedValue: memoizeTextValue,
        extractedValue: matches
    }
};