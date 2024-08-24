import { useSanitizedInputs } from '../../hooks/useSanitizeInputs';
import { sanitize } from 'isomorphic-dompurify';

jest.mock('isomorphic-dompurify', () => ({
    sanitize: jest.fn((input, config) => input),
}));

describe('useSanitizedInputs', () => {
    it('should sanitize the input string using the provided config', () => {
        const dirtyString = '<div><script>alert("XSS")</script></div>';
        const mockConfig = { ALLOWED_TAGS: ['div'] };

        const { purifyInputs } = useSanitizedInputs({ config: mockConfig });
        const result = purifyInputs(dirtyString);

        expect(sanitize).toHaveBeenCalledWith(dirtyString, mockConfig);
        expect(result).toBe(dirtyString);
    });

    it('should return the cleaned string when sanitized', () => {
        const dirtyString = '<div><script>alert("XSS")</script></div>';
        const cleanedString = '<div></div>';

        (sanitize as jest.Mock).mockImplementation(() => cleanedString);

        const { purifyInputs } = useSanitizedInputs({});
        const result = purifyInputs(dirtyString);

        expect(result).toBe(cleanedString);
    });
});
