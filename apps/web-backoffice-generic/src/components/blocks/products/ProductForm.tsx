import { Box, Grid } from "@mui/material";
import { Button } from "core-library/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { productSchema, ProductFormType } from "./validation";
import { TextField } from "core-library/components";
import { useFormFocusOnError } from "core-library/hooks";
import React from "react";
import { useBusinessQueryContext } from "core-library/contexts";
import { GenericSelectField } from "core-library/components/Textfield/GenericSelectField";

type Props = {
  onSubmit: (values: ProductFormType) => void;
  submitLoading?: boolean;
};

export const ProductForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const { businessQueryGetAllPricing, businessQuerySelectAllCategories } =
    useBusinessQueryContext();
  const { data, isLoading } = businessQueryGetAllPricing(["selectAllPricing"]);
  const { data: categoryData } = businessQuerySelectAllCategories([
    "selectAllCategories",
  ]);
  const form = useForm<ProductFormType>({
    mode: "all",
    resolver: yupResolver(productSchema),
    defaultValues: productSchema.getDefault(),
  });
  const { control, handleSubmit, clearErrors, setFocus, formState } = form;
  useFormFocusOnError<ProductFormType>(formState.errors, setFocus);

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <TextField<ProductFormType>
            control={control}
            name="productName"
            label="Product name"
            onBlur={() => clearErrors()}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField<ProductFormType>
            control={control}
            name="productDescription"
            label="Product description"
            onBlur={() => clearErrors()}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
      <GenericSelectField
        control={control}
        name="categoryId"
        options={categoryData ?? []}
        label="Category"
      />
      <GenericSelectField
        control={control}
        name="pricingId"
        options={data ?? []}
        label="Pricing"
      />
      <GenericSelectField
        control={control}
        name="programType"
        options={[
          {
            label: "Standard 23Days",
            value: 0,
          },
          {
            label: "Fast Track 8Days",
            value: 1,
          },
        ]}
        label="Program type"
      />
      <GenericSelectField
        control={control}
        name="programTitle"
        options={[
          {
            label: "Registered Nurse | RN",
            value: 0,
          },
          {
            label: "Practical Nurse | PN",
            value: 1,
          },
        ]}
        label="Program type"
      />
      <Box sx={{ float: "right" }} mt={5} mb={5}>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};
