import React, { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Grid, Box } from "@mui/material";
import { accountSetupSchema, AccountSetupType } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { useMenu } from "core-library/components/GenericDrawerLayout/hooks/useMenu";
import { AccountLevel } from "../../core/constant/accountLevel";
import {
  Button,
  TextField,
  ControlledSelectField,
  InformationTitle,
  MultipleSelectField,
  Card,
} from "core-library/components";

type Props = {
  onSubmit: (value: AccountSetupType) => void;
  isLoading: boolean;
};

export default function InternalUsersForm({ onSubmit, isLoading }: Props) {
  const form = useForm<AccountSetupType>({
    resolver: yupResolver(accountSetupSchema),
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: { ...accountSetupSchema.getDefault() },
  });

  const { routes } = useMenu();
  const { control, handleSubmit, setValue, clearErrors, watch } = form;

  const email = useWatch({ control, name: "email" });

  const internalRoutes = routes?.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  useEffect(() => {
    if (email) {
      setValue("username", email);
    }
  }, [email, setValue]);

  function handleOnChange(selectedValues: string[]) {
    const selectedObjects = selectedValues.map((value) => {
      const selectedOptions = internalRoutes.find(
        (option) => option.value === value
      );
      return { label: selectedOptions?.label || "", value };
    });
    return selectedObjects;
  }

  return (
    <FormProvider {...form}>
      <Grid
        container
        direction="column"
        rowSpacing={4}
        gap={5}
        sx={{ paddingY: 12, paddingX: 30, height: "100%" }}
      >
        <Card sx={{ padding: 6, marginTop: 4, height: "auto" }}>
          <div>
            <InformationTitle
              text="User Access Management"
              lineWidth={6}
              lineHeight={35}
              lineColor="#6A5ACD"
              borderRadius={2}
              containerProps={{ mb: 5 }}
              textProps={{ color: "text.primary", fontWeight: "bold" }}
            />
          </div>
          <div className="flex gap-4">
            <Grid item md={6} lg={4}>
              <TextField<AccountSetupType>
                control={control}
                label="First Name"
                name="firstname"
                sx={{ borderRadius: "5px" }}
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={4}>
              <TextField<AccountSetupType>
                control={control}
                label="Middle Name"
                name="middlename"
                sx={{ borderRadius: "5px" }}
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={4}>
              <TextField<AccountSetupType>
                control={control}
                label="Last Name"
                name="lastname"
                sx={{ borderRadius: "5px" }}
                onBlur={() => clearErrors()}
              />
            </Grid>
          </div>
          <div className="flex gap-4 my-2">
            <Grid item md={6} lg={12}>
              <TextField<AccountSetupType>
                control={control}
                label="Email"
                name="email"
                sx={{ borderRadius: "5px" }}
                onBlur={() => clearErrors()}
              />
            </Grid>
          </div>
          <div className="flex gap-4 my-4">
            <Grid item md={6} lg={6}>
              <TextField<AccountSetupType>
                control={control}
                label="Password"
                name="password"
                type="password"
                sx={{ borderRadius: "5px" }}
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={6}>
              <TextField<AccountSetupType>
                control={control}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                sx={{ borderRadius: "5px" }}
                onBlur={() => clearErrors()}
              />
            </Grid>
          </div>
          <ControlledSelectField
            control={control}
            name="accessLevel"
            options={AccountLevel ?? []}
            label="Select Access Level"
            sx={{ marginY: 2, borderRadius: "10px", width: "100%" }}
          />
          <MultipleSelectField
            control={control}
            name="routers"
            label="Set Access Routes"
            options={internalRoutes ?? []}
            multiple
            sx={{ my: 5, width: "100%" }}
            onChange={handleOnChange}
          />

          <Box marginTop={5}>
            <Button
              fullWidth
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Create Account
            </Button>
          </Box>
        </Card>
      </Grid>
    </FormProvider>
  );
}
