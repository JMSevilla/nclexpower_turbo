import { PageContentValues } from "../../../types/page";

export type PageMenuItem = NonNullable<
  PageContentValues["elements"]["pageMenuItem"]
>["values"][number];
