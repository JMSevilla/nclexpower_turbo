import { Box, Grid } from "@mui/material";
import { AnimatedBoxSkeleton } from "./AnimatedBoxSkeleton/AnimatedSkeletonBox";

export const InputLoader: React.FC = () => {
  return (
    <Box position="relative" data-testid="input-loader" height={54}>
      <AnimatedBoxSkeleton pt={4} pb={2} pl={4} pr={2} light>
        <Grid container spacing={2} pr={2} pb={2}>
          <Grid item xs={6} container spacing={6}>
            <Grid item xs={12}>
              <Box height={26} bgcolor="appColors.support80.light" />
            </Grid>
          </Grid>
        </Grid>
      </AnimatedBoxSkeleton>
    </Box>
  );
};
