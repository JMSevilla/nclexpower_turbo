import { DataTableHeader } from "../components";
import { GridColDef } from "@mui/x-data-grid";

export type CategoryListResponse = {
  id: string;
  categoryName: string;
  categoryDescription: string;
  categoryType: number;
  createdAt: string;
  updatedAt: string;
};

export const categoriesTableHeaders: DataTableHeader[] = [
  { name: "Id" },
  { name: "Category Name", align: "right" },
  { name: "Category Description", align: "right" },
  { name: "Category Type", align: "right" },
  { name: "CreatedAt", align: "right" },
  { name: "UpdatedAt", align: "right" },
];
