export const getTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
