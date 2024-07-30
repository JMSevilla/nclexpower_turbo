import React from "react";
import { Card, InformationTitle } from "core-library/components";
import { Box, Grid, Divider } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";

interface Props {
  nextStep(values: Partial<{}>): void;
  previousStep(): void;
  values: Partial<{}>;
}

const ChooseProductsConfigurations = () => {
  return (
    <Box sx={{ mb: 5 }}>
      <InformationTitle
        text="Choose Products for Configuration Changes"
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
          <Card hoverEffect elevation={5} text="Web Simulator" />
        </Grid>
      </Grid>
    </Box>
  );
};

const OtherConfigurations = (props: {
  nextStep(values: Partial<{}>): void;
}) => {
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
            onClick={props.nextStep}
            elevation={5}
            text="DB & Excel Comparison"
          />
        </Grid>
        <Grid item xs={4}>
          <Card hoverEffect elevation={5} text="Web BackOffice" />
        </Grid>
        <Grid item xs={4}>
          <Card hoverEffect elevation={5} text="Web Simulator" />
        </Grid>
      </Grid>
    </Box>
  );
};

export const SettingsManagement: React.FC<Props> = ({ nextStep }) => {
  return (
    <Card sx={{ mt: 5, p: 5 }}>
      <ChooseProductsConfigurations />
      <Divider>Other Configurations</Divider>
      <OtherConfigurations nextStep={nextStep} />
    </Card>
  );
};
