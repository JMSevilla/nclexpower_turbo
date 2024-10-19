import React from "react";
import { Box, Typography, BoxProps, TypographyProps } from "@mui/material";

interface Props {
  text: string;
  lineWidth?: number;
  lineHeight?: number;
  lineColor?: string;
  borderRadius?: number;
  textProps?: TypographyProps;
  containerProps?: BoxProps;
}

export const InformationTitle: React.FC<Props> = ({
  text,
  lineWidth = 4,
  lineHeight = 40,
  lineColor = "#9370DB",
  borderRadius = 1,
  textProps,
  containerProps,
}) => {
  return (
    <Box display="flex" alignItems="center" {...containerProps}>
      <Box
        sx={{
          width: lineWidth,
          height: lineHeight,
          backgroundColor: lineColor,
          marginRight: 1,
          borderRadius: borderRadius,
        }}
      />
      <Typography variant="button" {...textProps}>
        {text}
      </Typography>
    </Box>
  );
};
