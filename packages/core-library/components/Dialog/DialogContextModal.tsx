import React from "react";
import {
  CategoryDialogFormBlock,
  ProductDialogBlock,
} from "./DialogFormBlocks";

interface Props {
  dialogFormType: string;
}

export const DialogContextModal: React.FC<Props> = ({ dialogFormType }) => {
  switch (dialogFormType) {
    case "category_form":
      return <CategoryDialogFormBlock />;
    case "select_pricing":
      return <ProductDialogBlock />;
    default:
      return null;
  }
};
