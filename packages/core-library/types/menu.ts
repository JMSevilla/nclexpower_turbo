import {
  DialogElement,
  NumberValue,
  SelectionValue,
  StringValue,
} from "./common";
import { PageContentValues } from "./page";

export interface CmsMenu {
  value: MenuItem[] | null;
}
export interface MenuItem {
  elements: MenuElements;
  type: string;
}
interface MenuElements {
  link: StringValue;
  name: StringValue;
  position: SelectionValue<"Left" | "Right" | "Account">;
  orderNo: NumberValue;
  relatedLinks: StringValue;
  subMenuItems?: SubMenu;
  openDialog?: DialogElement;
}
interface SubMenu {
  values: SubMenuItem[] | null;
}
export interface SubMenuItem {
  elements: SubMenuElements;
  type: string;
}
interface SubMenuElements {
  link: StringValue;
  name: StringValue;
  relatedLinks: StringValue;
  openDialog?: DialogElement;
  buttonAsMenuItem: {
    value: { elements: Partial<NonNullable<PageContentValues["elements"]>> };
  };
}
