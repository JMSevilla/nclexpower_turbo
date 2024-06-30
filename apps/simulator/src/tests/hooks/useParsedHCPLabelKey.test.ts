import { renderHook } from '@testing-library/react';
import { useParsedHCPLabelKey } from '../../core/utils/useParsedHCPLabelKey';

const mockValueWithStyle = 'this is bold [[bold:test]] with testing of [[label:label]]'
const mockValueWithoutStyle = 'this text is not containing any styles'


describe('useParseHCPLabelKey', () => {
    it('should return a blank array and a  styledExtractedValue with undefined value', () => {
        const { result } = renderHook(() => useParsedHCPLabelKey(""))
        expect(result.current.extractedValue).toHaveLength(0)
        expect(result.current.styledExtractedValue).toBeUndefined
    })

    it('should return a string with a strong tag', () => {
        const expectedToHave = '<strong>test</strong>'
        const { result } = renderHook(() => useParsedHCPLabelKey(mockValueWithStyle))
        expect(result.current.styledExtractedValue).toContain(expectedToHave)
    })

    it('should return a string with strong and breakline tag', () => {
        const expectedToHave = '<strong>label</strong> <br/>'
        const { result } = renderHook(() => useParsedHCPLabelKey(mockValueWithStyle))
        expect(result.current.styledExtractedValue).toContain(expectedToHave)
    })


    it('should return a array containing expected object', () => {
        const expected =
            [{
                "content": "test",
                "format": "bold",
                "original": "[[bold:test]]",
                "replacedValue": "<strong>test</strong>"
            }]

        const { result } = renderHook(() => useParsedHCPLabelKey(mockValueWithStyle))
        expect(result.current.extractedValue).toEqual(expect.arrayContaining(expected))
    })

    it('extractedValue should have array length of zero ', () => {
        const { result } = renderHook(() => useParsedHCPLabelKey(mockValueWithoutStyle))
        expect(result.current.extractedValue).toHaveLength(0)
    })


    it('styledExtractedValue should be the same ', () => {
        const { result } = renderHook(() => useParsedHCPLabelKey(mockValueWithoutStyle))
        expect(result.current.styledExtractedValue).toBe(mockValueWithoutStyle)
    })


});