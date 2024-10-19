import { Column } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export const getCommonPinningStyles = <T>(column: Column<T>): CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
        isPinned === 'left' && column.getIsLastColumn('left');
    const isFirstRightPinnedColumn =
        isPinned === 'right' && column.getIsFirstColumn('right');

    return {
        background: "#fff",
        boxShadow: isLastLeftPinnedColumn
            ? '-4px 0 4px -4px gray'
            : isFirstRightPinnedColumn
                ? '4px 0 4px -4px gray'
                : undefined,
        left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
        right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
        opacity: isPinned ? 0.95 : 1,
        position: isPinned ? 'sticky' : 'relative',
        whiteSpace: 'nowrap',
        width: 'fit-content',
        zIndex: isPinned ? 1 : 0,
    };
};