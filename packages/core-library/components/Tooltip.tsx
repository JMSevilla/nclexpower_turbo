import { InfoOutlined } from "@mui/icons-material";
import { Box, Grid, PopperProps, Theme, Typography } from "@mui/material";
import MuiTooltip, {
  TooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import React, { useState } from "react";
import { useGlobalsContext } from "../contexts";
import { ParsedHtml } from "./ParseHtml";

interface Props {
  title?: TooltipProps["title"];
  children?: TooltipProps["children"] | string;
  header?: string;
  html?: string;
  underlinedText?: boolean;
  iconColor?: string;
  inheritFontSize?: boolean;
  hideIcon?: boolean;
  forDisabledReason?: boolean;
  disabledReasonId?: string;
}
const POPPER_CONFIG: Partial<PopperProps> = {
  disablePortal: true,
  modifiers: [
    { name: "flip", enabled: true },
    { name: "offset", options: { offset: [0, 10] } },
  ],
};

export const Tooltip: React.FC<Props> = ({
  header,
  html,
  underlinedText,
  children,
  title,
  iconColor,
  inheritFontSize,
  forDisabledReason,
  disabledReasonId = "disabledReason",
  hideIcon,
}) => {
  const { labelByKey } = useGlobalsContext();
  const [open, setOpen] = useState(false);

  return (
    <CustomWidthTooltip
      id={forDisabledReason ? disabledReasonId : undefined}
      onOpen={() => setOpen(true)}
      onClose={() => setTimeout(() => setOpen(false), 100)}
      open={open}
      enterDelay={750}
      enterNextDelay={750}
      enterTouchDelay={750}
      leaveTouchDelay={50000}
      leaveDelay={200}
      title={
        title ?? (
          <Grid container border="unset">
            <Grid item xs={12} p={8}>
              {header && (
                <Typography
                  color="inherit"
                  variant="h6"
                  fontWeight="bold"
                  sx={{ pb: 3 }}
                >
                  {header}
                </Typography>
              )}
              {html && (
                <ParsedHtml
                  html={html}
                  disableOverrideLinkColors
                  sx={{
                    wordBreak: "break-word",
                    a: { textDecoration: "underline" },
                  }}
                />
              )}
              <Typography
                onClick={() => setOpen(false)}
                color="inherit"
                variant="body1"
                sx={{
                  pb: 3,
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "6px",
                }}
              >
                {labelByKey("tooltip_got_it")}
              </Typography>
            </Grid>
          </Grid>
        )
      }
      arrow
      PopperProps={POPPER_CONFIG}
    >
      {forDisabledReason ? (
        <Box
          display="flex"
          width="fit-content"
          onTouchStart={() => setOpen((prev) => !prev)}
        >
          {children}
        </Box>
      ) : (
        <Box
          display="flex"
          flexWrap="nowrap"
          sx={{
            width: "fit-content",
            cursor: "pointer",
            "&:hover": { color: "primary.dark" },
          }}
          component="a"
          tabIndex={0}
          aria-label={children ? textFromChildren(children) : undefined}
          role="tooltip"
          onTouchStart={() => setOpen((prev) => !prev)}
        >
          <Typography
            sx={{
              "&:hover": { color: "primary.dark" },
              ...underlineStyles(underlinedText),
            }}
            color="primary"
            component="span"
            fontSize={inheritFontSize ? "inherit!important" : "body1"}
          >
            {children}
          </Typography>
          {!hideIcon && (
            <InfoOutlined
              sx={{ ml: 1, mt: "2px", cursor: "pointer", color: iconColor }}
            />
          )}
        </Box>
      )}
    </CustomWidthTooltip>
  );
};

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: theme.sizes.fieldTooltip,
  },
}));

const textFromChildren = (
  children: TooltipProps["children"] | string
): string =>
  React.Children.toArray(children).reduce<string>(
    (prev, curr) => (typeof curr === "string" ? prev + curr : prev),
    ""
  );

const underlineStyles = (underlinedText?: boolean): SxProps<Theme> =>
  underlinedText
    ? {
        textDecoration: "underline",
        textUnderlineOffset: 6,
        textDecorationStyle: "dotted",
      }
    : {};
