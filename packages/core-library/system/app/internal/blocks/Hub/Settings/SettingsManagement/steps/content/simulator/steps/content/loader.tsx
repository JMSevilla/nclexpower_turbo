import React from "react";
import { AnimatedBoxSkeleton } from "../../../../../../../../../../../../components";
import { Box, Grid } from "@mui/material";

export const QuestionTypeSelectionLoader: React.FC = () => {
  return (
    <Grid
      sx={{ mt: 3 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={6}>
        <AnimatedBoxSkeleton height={135} light={"true"} />
      </Grid>
      <Grid item xs={6}>
        <AnimatedBoxSkeleton height={135} light={"true"} />
      </Grid>
    </Grid>
  );
};

export const CreateQuestionLoader: React.FC = () => {
  return (
    <Grid>
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
          <AnimatedBoxSkeleton height={50} light={"true"} />
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
          <AnimatedBoxSkeleton height={25} light={"true"} />
          <Box
            width="85px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AnimatedBoxSkeleton height={25} light={"true"} />
          </Box>
        </Box>
        <Box width="185px">
          <AnimatedBoxSkeleton height={20} light={"true"} />
        </Box>
      </Box>
      <Box
        height="80px"
        display="flex"
        justifyContent="end"
        alignItems="center"
      >
        <Box width="335px" display="flex" gap="8px">
          <AnimatedBoxSkeleton height={50} light={"true"} />
          <AnimatedBoxSkeleton height={50} light={"true"} />
        </Box>
      </Box>
      <Box
        height="360px"
        display="flex"
        flexDirection="column"
        justifyContent="end"
        alignItems="center"
      >
        <AnimatedBoxSkeleton height={350} light={"true"} />
        <Box width="100%">
          <Box width="155px" sx={{ float: "right", marginTop: "10px" }}>
            <AnimatedBoxSkeleton height={50} light={"true"} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export const SummaryAccordionLoader: React.FC = () => {
  return (
    <Grid>
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
          <AnimatedBoxSkeleton height={50} light={"true"} />
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
          <AnimatedBoxSkeleton height={25} light={"true"} />
          <Box
            width="85px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AnimatedBoxSkeleton height={25} light={"true"} />
          </Box>
          <Box width="650px" marginTop="16px">
            <AnimatedBoxSkeleton height={20} light={"true"} />
          </Box>
        </Box>
        <Box width="185px"></Box>
      </Box>
      <Box
        marginTop="24px"
        padding="8px"
        height="360px"
        display="flex"
        flexDirection="column"
        justifyContent="end"
        alignItems="center"
      >
        <AnimatedBoxSkeleton height={350} light={"true"} />
        <Box width="100%">
          <Box width="155px" sx={{ float: "right", marginTop: "10px" }}>
            <AnimatedBoxSkeleton height={50} light={"true"} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
