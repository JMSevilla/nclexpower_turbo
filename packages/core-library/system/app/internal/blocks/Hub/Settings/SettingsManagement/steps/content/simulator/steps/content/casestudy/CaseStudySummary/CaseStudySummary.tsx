import { Box, Grid, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import ConfirmationModal from "../../../../../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { BackgroundInfoContent } from "./component/BackgroundInfo/BackgroundInfoContent";
import { ItemContent } from "./component/Items/ItemContent";
import { TableView } from "./component/TableView";
import TableViewIcon from "@mui/icons-material/TableView";
import DefaultViewIcon from "@mui/icons-material/ViewList";
import { ContainedCaseStudyQuestionType } from "../../../../types";

interface CaseStudySummaryProps {
  nextStep(values: Partial<ContainedCaseStudyQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedCaseStudyQuestionType>;
  next: () => void;
  previous: () => void;
  reset: () => void;
}

interface DefaultViewProps {
  data: Partial<ContainedCaseStudyQuestionType>;
}
const DefaultView: React.FC<DefaultViewProps> = ({ data }) => {
  return (
    <Grid
      sx={{ mt: 3 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={6}>
        <Typography variant="subtitle1" marginBottom="4px">
          BACKGROUND INFO :
        </Typography>
        <Box>
          <BackgroundInfoContent values={data} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" marginBottom="4px">
          ITEMS :
        </Typography>
        <Box>
          <ItemContent values={data} />
        </Box>
      </Grid>
    </Grid>
  );
};

export const CaseStudySummary: React.FC<CaseStudySummaryProps> = ({
  nextStep,
  previousStep,
  values,
  next,
  previous,
  reset,
}) => {
  const [isTableView, setIsTableView] = useState<boolean>(false);

  const handleClick = () => {
    setIsTableView((prev) => !prev);
  };

  const onSubmit = async () => {
    nextStep({});
    next();
  };

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 700,
          textTransform: "uppercase",
          paddingTop: "12px",
        }}
      >
        Question and Answer Creation
      </Typography>
      <Box width="100%" display="flex" justifyContent="end" alignItems="center">
        <IconButton onClick={handleClick}>
          {isTableView ? <DefaultViewIcon /> : <TableViewIcon />}
        </IconButton>
      </Box>
      {isTableView ? (
        <TableView data={values} />
      ) : (
        <DefaultView data={values} />
      )}
      <Box
        sx={{
          width: "100%",
          justifyContent: "space-between",
          paddingX: 5,
          display: "flex",
          marginTop: 5,
        }}
      >
        <ConfirmationModal
          dialogContent="This action will reset all forms."
          confirmButtonText="Confirm"
          isLoading={false}
          customButton="Confirm"
          handleSubmit={handlePrevious}
        />
        <ConfirmationModal
          dialogContent="Are you sure you want to continue?"
          customButton="Continue"
          isLoading={false}
          handleSubmit={onSubmit}
        />
      </Box>
    </Box>
  );
};
