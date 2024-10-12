import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import { Property } from 'csstype';

interface Props {
  disableMarginBottom?: boolean;
  size?: number;
  color?: CircularProgressProps['color'];
  position?: Property.Position;
}

export const ComponentLoader: React.FC<Props> = ({
  disableMarginBottom,
  size = 90,
  color = "primary",
  position = "relative",
}) => {
  return (
    <Box
      data-testid="component-loader"
      mb={disableMarginBottom ? 0 : 16}
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position={position}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};
