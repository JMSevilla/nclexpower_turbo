import { ReactElement, ReactNode } from "react";

export type TabsItem = {
  id: number;
  title: string;
  content?: ReactNode | ReactElement;
};
