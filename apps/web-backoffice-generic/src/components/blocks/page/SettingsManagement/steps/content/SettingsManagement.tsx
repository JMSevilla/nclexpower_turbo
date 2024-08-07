import React, { useEffect } from "react";
import { Card, InformationTitle } from "core-library/components";
import { Box, Grid, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SettingsSelectionOptions,
  SettingsSelectionType,
  ChooseSettingsOptions,
} from "../../types";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
}

const chooseSettingsStepFormSchema = yup.object({
  selection: yup
    .mixed<SettingsSelectionOptions>()
    .oneOf(["DBEXCEL", "QM"])
    .required(),
  chosen: yup
    .mixed<ChooseSettingsOptions>()
    .oneOf(["CONFIG", "AUTOMATION"])
    .required(),
});

type ChooseSettingsStepFormType = yup.InferType<
  typeof chooseSettingsStepFormSchema
>;

const ChooseProductsConfigurations = (props: {
  nextStep(values: Partial<SettingsSelectionType>): void;
  values: Partial<SettingsSelectionType>;
}) => {
  const { reset, setValue } = useForm<ChooseSettingsStepFormType>({
    resolver: yupResolver(chooseSettingsStepFormSchema),
    mode: "all",
    criteriaMode: "all",
  });

  useEffect(() => {
    reset({
      selection: props.values.selection,
      chosen: props.values.chosen,
    });
  }, [props.values.selection, props.values.chosen]);

  const handleSelection = (values: ChooseSettingsStepFormType) => {
    setValue("chosen", values.chosen);
    setValue("selection", values.selection);
    props.nextStep({ chosen: values.chosen, selection: values.selection });
  };
  return (
    <Box sx={{ mb: 5 }}>
      <InformationTitle
        text="Configuration Changes"
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Grid
        justifyContent="center"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Card hoverEffect elevation={5} text="Web Customer" />
        </Grid>
        <Grid item xs={4}>
          <Card hoverEffect elevation={5} text="Web BackOffice" />
        </Grid>
        <Grid item xs={4}>
          <Card
            onClick={() =>
              handleSelection({ chosen: "CONFIG", selection: "QM" })
            }
            hoverEffect
            elevation={5}
            text="Web Simulator"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const OtherConfigurations = (props: {
  nextStep(values: Partial<SettingsSelectionType>): void;
  values: Partial<SettingsSelectionType>;
}) => {
  const { reset, setValue } = useForm<ChooseSettingsStepFormType>({
    resolver: yupResolver(chooseSettingsStepFormSchema),
    mode: "all",
    criteriaMode: "all",
  });

  useEffect(() => {
    reset({
      selection: props.values.selection,
      chosen: props.values.chosen,
    });
  }, [props.values.selection, props.values.chosen]);

  const handleSelection = (values: ChooseSettingsStepFormType) => {
    setValue("chosen", values.chosen);
    setValue("selection", values.selection);
    props.nextStep({ chosen: values.chosen, selection: values.selection });
  };

  return (
    <Box>
      <InformationTitle
        text="Server & Automations configurations"
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Grid
        justifyContent="center"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Card
            hoverEffect
            onClick={() =>
              handleSelection({ chosen: "AUTOMATION", selection: "DBEXCEL" })
            }
            elevation={5}
            text="DB & Excel Comparison"
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export const SettingsManagement: React.FC<Props> = ({ nextStep, values }) => {
  return (
    <Card sx={{ mt: 5, p: 5 }}>
      <ChooseProductsConfigurations nextStep={nextStep} values={values} />
      <Divider>Other Configurations</Divider>
      <OtherConfigurations nextStep={nextStep} values={values} />
    </Card>
  );
};
