export const areFilesSame = (file1: File, file2: File) =>
  file1.name === file2.name;

export const formatBytes = (bytes: number, unitIndex: number = 0): string => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  if (bytes < 1000 || unitIndex === units.length - 1) {
    const roundedSize = bytes.toFixed(0);
    return `${roundedSize} ${units[unitIndex]}`;
  }
  return formatBytes(bytes / 1000, unitIndex + 1);
};

export type ExcelRowRegularQuestion = {
  QID: number;
  qLNum: number;
  question: string;
  choice_1: string;
  choice_2: string;
  choice_3: string;
  choice_4: string;
  choice_5: string;
  choice_6: string;
  correct: string;
  rationale: string;
  cogLNum: number;
  CNCateg: number;
  integPLNum: number;
  contentLNum: number;
};
