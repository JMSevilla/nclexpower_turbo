import { useDateFormat } from "../../core/hooks";
import { renderHook } from "core-library/tests/common";
import { format, parseISO } from 'date-fns';

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));

jest.mock("core-library/core/router", () => ({
  useRouter: jest.fn(),
}));

describe('useDateFormat Hook', () => {
  it('should correctly format a valid ISO date string with default format', () => {
    const { result } = renderHook(() => useDateFormat());
    const isoDate = '2024-08-29T12:00:00Z';
    const expectedDate = format(parseISO(isoDate), 'MMMM d, yyyy h:mm:ss a');
    const formattedDate = result.current.getFormattedDate(isoDate);
    expect(formattedDate).toBe(expectedDate);
  });

  it('should correctly format a valid ISO date string with a custom format', () => {
    const { result } = renderHook(() => useDateFormat());
    const isoDate = '2024-08-29T12:00:00Z';
    const dateFormat = 'yyyy-MM-dd';
    const expectedDate = format(parseISO(isoDate), dateFormat);
    const formattedDate = result.current.getFormattedDate(isoDate, dateFormat);
    expect(formattedDate).toBe(expectedDate);
  });

  it('should handle invalid ISO date string', () => {
    const { result } = renderHook(() => useDateFormat());
    const isoDate = 'invalid-date';
    const formattedDate = result.current.getFormattedDate(isoDate);
    expect(formattedDate).toBeUndefined();
  });

  it('should handle empty dateFormat parameter', () => {
    const { result } = renderHook(() => useDateFormat());
    const isoDate = '2024-08-29T12:00:00Z';
    const formattedDate = result.current.getFormattedDate(isoDate, '');
    expect(formattedDate).toBeUndefined();
  });
});