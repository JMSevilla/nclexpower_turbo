import { Column } from '@tanstack/react-table';
import { getCommonPinningStyles } from '../../../components/ReactTable/content/CommonPinningStyle';

describe('getCommonPinningStyles', () => {
    const mockColumn = <T>(pinned: 'left' | 'right' | false, isLast: boolean, isFirst: boolean, startPos: number, endPos: number): Column<T> => ({
        getIsPinned: jest.fn().mockReturnValue(pinned),
        getIsLastColumn: jest.fn().mockImplementation((position: 'left' | 'right') => position === pinned && isLast),
        getIsFirstColumn: jest.fn().mockImplementation((position: 'left' | 'right') => position === pinned && isFirst),
        getStart: jest.fn().mockReturnValue(startPos),
        getAfter: jest.fn().mockReturnValue(endPos),
    } as unknown as Column<T>);

    it('should return styles for a left-pinned column (last)', () => {
        const column = mockColumn('left', true, false, 100, 0);
        const styles = getCommonPinningStyles(column);
        expect(styles).toEqual({
            background: '#fff',
            boxShadow: '-4px 0 4px -4px gray',
            left: '100px',
            right: undefined,
            opacity: 0.95,
            position: 'sticky',
            whiteSpace: 'nowrap',
            width: 'fit-content',
            zIndex: 1,
        });
    });

    it('should return styles for a right-pinned column (first)', () => {
        const column = mockColumn('right', false, true, 0, 150);
        const styles = getCommonPinningStyles(column);
        expect(styles).toEqual({
            background: '#fff',
            boxShadow: '4px 0 4px -4px gray',
            left: undefined,
            right: '150px',
            opacity: 0.95,
            position: 'sticky',
            whiteSpace: 'nowrap',
            width: 'fit-content',
            zIndex: 1,
        });
    });

    it('should return styles for a non-pinned column', () => {
        const column = mockColumn(false, false, false, 0, 0);
        const styles = getCommonPinningStyles(column);
        expect(styles).toEqual({
            background: '#fff',
            boxShadow: undefined,
            left: undefined,
            right: undefined,
            opacity: 1,
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 'fit-content',
            zIndex: 0,
        });
    });
});
