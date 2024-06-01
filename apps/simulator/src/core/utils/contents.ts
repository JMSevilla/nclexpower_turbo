import { AnswerProps } from "../types/ssrData";

export const getParsedChoices = (choices: string) => {
    try {
        if (choices === undefined || choices === null) {
            console.error("Choices is undefined or null");
            return null;
        }

        const parsedChoices = JSON.parse(choices);
        return parsedChoices;
    } catch (error) {
            console.error("An error occurred while parsing choices:",(error as Error).message);
    }
};

export const getMapItems = (answer: AnswerProps[]) => {
    if (!answer || answer.length === 0) {
        return { columnName: [], selectFieldKey: [], selectField: [] };
    }

    const foundAnswer = answer.find(answer => answer.answerId);
    const columnName = foundAnswer ? foundAnswer.columns : [];
    const selectFieldKey = foundAnswer ? foundAnswer.selectFieldKey : [];
    const selectField = foundAnswer ? foundAnswer.selectField : [];

    return { columnName, selectFieldKey, selectField };
}
