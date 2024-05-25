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