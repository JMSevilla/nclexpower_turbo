import { Box, Grid, PopperProps, Typography } from "@mui/material";
import MuiTooltip, {
  TooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { CmsTooltip } from "../types/common";
import { ParsedHtml } from "./ParseHtml";

interface Props {
  open?: TooltipProps["open"];
  children: TooltipProps["children"] | string;
  tooltip?: CmsTooltip;
}

const POPPER_CONFIG: Partial<PopperProps> = {
  disablePortal: true,
  modifiers: [
    { name: "flip", enabled: true },
    { name: "offset", options: { offset: [0, 10] } },
  ],
};

export const ErrorTooltip = ({ children, open = false, tooltip }: Props) => {
  return (
    <CustomWidthTooltip
      open={open}
      enterDelay={750}
      enterNextDelay={750}
      enterTouchDelay={750}
      leaveDelay={200}
      title={
        <Grid container border="unset">
          <Grid item xs={12} p={8}>
            {tooltip?.header && (
              <Typography
                color="inherit"
                variant="h6"
                fontWeight="bold"
                sx={{ pb: 3 }}
              >
                {tooltip.header}
              </Typography>
            )}
            {tooltip?.html && <ParsedHtml html={tooltip.html} />}
          </Grid>
        </Grid>
      }
      arrow
      PopperProps={POPPER_CONFIG}
    >
      <Box display="block" sx={{ cursor: "pointer" }} component="span">
        {children}
      </Box>
    </CustomWidthTooltip>
  );
};

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: theme.sizes.errorsTooltip,
  },
}));
