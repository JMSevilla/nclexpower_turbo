import { renderHook } from '../common';
import { useColumns } from '../../hooks';

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

describe('useColumns hook', () => {
  it('should return memoized columns', () => {
    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'firstName', headerName: 'First name', width: 150 },
      { field: 'lastName', headerName: 'Last name', width: 150 },
    ];

    const { result, rerender } = renderHook(() => useColumns({ columns }));

    expect(result.current.columns).toEqual(columns);

    rerender({ columns });

    expect(result.current.columns).toBe(columns);
  });
});
