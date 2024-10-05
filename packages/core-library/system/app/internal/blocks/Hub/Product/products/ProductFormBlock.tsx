import {
  useBusinessQueryContext,
  useExecuteToast,
} from "core-library/contexts";
import { ProductForm } from "./ProductForm";
import { ProductParams } from "core-library/types/types";
import { Box } from "@mui/material";
import { useColumns } from "core-library/hooks";

export function ProductFormBlock() {
  const { businessQueryCreateProduct, businessQueryGetAllProducts } =
    useBusinessQueryContext();
  const { mutateAsync } = businessQueryCreateProduct();
  const { refetch } = businessQueryGetAllProducts(["GetAllProducts"]);
  const { executeToast } = useExecuteToast();

  async function onSubmit(values: ProductParams) {
    const result = await mutateAsync({ ...values });
    if (result.data === 1015) {
      executeToast("Product already exist", "top-right", true, {
        type: "error",
      });
      return;
    }
    executeToast("Successfully added new product", "top-right", true, {
      type: "success",
    });
    refetch();
  }
  return (
    <Box>
      <ProductForm onSubmit={onSubmit} submitLoading={false} />
    </Box>
  );
}
