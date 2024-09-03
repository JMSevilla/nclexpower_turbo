import React from "react";
import { AnimatedBoxSkeleton } from "core-library/components";
import { Box, Grid } from "@mui/material";

export const QuestionTypeSelectionLoader: React.FC = () => {
  return (
    <>
      <Grid
        sx={{ mt: 3 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <AnimatedBoxSkeleton height={135} light={true} />
        </Grid>
        <Grid item xs={6}>
          <AnimatedBoxSkeleton height={135} light={true} />
        </Grid>
      </Grid>
    </>
  );
};

export const CreateQuestionLoader: React.FC = () => {
  return (
    <>
      <Box
        marginTop="10px"
        paddingX="8px"
        height="80px"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box width="155px">
          <AnimatedBoxSkeleton height={50} light={true} />
        </Box>
        <Box
          marginTop="5px"
          width="225px"
          gap="5px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <AnimatedBoxSkeleton height={25} light={true} />
          <Box
            width="85px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AnimatedBoxSkeleton height={25} light={true} />
          </Box>
        </Box>
        <Box width="185px">
          <AnimatedBoxSkeleton height={20} light={true} />
        </Box>
      </Box>
      <Box
        // border="2px solid black"
        height="80px"
        display="flex"
        justifyContent="end"
        alignItems="center"
      >
        <Box width="335px" display="flex" gap="8px">
          <AnimatedBoxSkeleton height={50} light={true} />
          <AnimatedBoxSkeleton height={50} light={true} />
        </Box>
      </Box>
    </>
  );
};

export const SummaryAccordionLoader: React.FC = () => {
  return (
    <Grid
      sx={{ mt: 3, p: 4 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Box display="flex" width="100%" marginBottom="25px" position="relative">
        <AnimatedBoxSkeleton height={135} light={true} />
        <Box
          marginTop="30px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            zIndex: 0,
          }}
        >
          <AnimatedBoxSkeleton height={135} light={true} />
          <AnimatedBoxSkeleton height={135} light={true} />
        </Box>
      </Box>
      <Box
        marginTop="45px"
        width="100%"
        minHeight="350px"
        display="flex"
        flexDirection="column"
        marginX="25px"
        gap="8px"
        sx={{
          backgroundColor: "#F3F3F3",
          borderRadius: "10px",
        }}
      >
        <AnimatedBoxSkeleton height={135} light={true} />
      </Box>
      <Box display="flex" justifyContent="end" width="100%" marginTop="20px">
        <AnimatedBoxSkeleton height={135} light={true} />
      </Box>
    </Grid>
  );
};
