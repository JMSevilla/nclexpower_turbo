import React from "react";
import { SystemProduct } from "../constant/systemProduct";

type useSystemProductType = {
  getSystemProductLabel: (systemProduct: number) => string | undefined;
};

export const useSystemProduct = (): useSystemProductType => {
  const getSystemProductLabel = (systemProduct: number): string | undefined => {
    const ProductLabel = SystemProduct.find((s) => s.value === systemProduct);
    return ProductLabel?.label;
  };

  return { getSystemProductLabel };
};
