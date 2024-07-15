import React from "react";
import { SystemProduct } from '../../core/constant/systemProduct'
import { SystemProductType } from '../../core/types/systemProduct';


type useSystemProductType = {
    getSystemProductLabel: (systemProduct: number) => string | undefined;
}


export const useSystemProduct = (): useSystemProductType => {
    const getSystemProductLabel = (systemProduct: number): string | undefined => {
        const ProductLabel = SystemProduct.find((s) => s.systemProduct === systemProduct)

        return ProductLabel?.label
    }

    return { getSystemProductLabel }

};
