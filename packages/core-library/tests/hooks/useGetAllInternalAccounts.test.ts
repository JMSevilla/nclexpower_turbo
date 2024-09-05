import { useGetAllInternalAccounts } from '../../core/hooks/useBusinessQueries';
import { useApi } from '../../hooks';
import { renderHook } from '../common';
import { useQuery } from 'react-query';

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../hooks/useApi', () => ({
  useApi: jest.fn(),
}));

describe('useGetAllInternalAccounts', () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it('should return data on success', async () => {
    const mockData = [{ id: 1, name: 'John Doe' }];
    mockExecute.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetAllInternalAccounts(['internalAccounts'])
    );

    expect(useQuery).toHaveBeenCalledWith(
      ['internalAccounts'],
      expect.any(Function),
      { staleTime: Infinity }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const { result } = renderHook(() =>
      useGetAllInternalAccounts(['internalAccounts'])
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch data');
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() =>
      useGetAllInternalAccounts(['internalAccounts'])
    );

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
});
