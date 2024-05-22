export const getParsedChoices = (choices: string) => {
    try {
        if (choices === undefined || choices === null) {
            console.error("Choices is undefined or null");
            return null;
        }

        const parsedChoices = JSON.parse(choices);
        return parsedChoices;
    } catch (error) {
        if (error instanceof Error) {
            console.error("An error occurred while parsing choices:", error.message);
        } else {
            console.error("An unknown error occurred while parsing choices");
        }
        return null; 
    }
};
