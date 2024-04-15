import {
  CheckCircleOutlineOutlined,
  ErrorOutlineRounded,
  InfoOutlined,
  WarningAmberRounded,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useResolution } from "@repo/utils/hooks";
import { MessageType, messageRole } from "./alert";
import React from "react";

interface Props {
  type: MessageType;
  loading?: boolean;
}

export const AlertMessage: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  type,
  loading,
}) => {
  const theme = useTheme();
  const { isMobile } = useResolution();

  return (
    <Grid
      role={messageRole(type)}
      data-testid="message-component"
      container
      p={4}
      justifyContent="center"
      alignItems="center"
      sx={{
        borderStyle: "none",
        color: type === MessageType.Warning ? "black" : "white",
        "& a": { color: "inherit" },
        backgroundColor: hoveredTextColor(),
      }}
    >
      <Grid
        item
        xs={12}
        container
        spacing={4}
        alignItems="center"
        px={isMobile ? 0 : 8}
        maxWidth={(theme) => "1440px" + "!important"}
      >
        <Grid item flex={1} display="flex" alignItems="center" gap={4}>
          {!isMobile && (
            <Typography color={textColor()}>
              {
                {
                  [MessageType.Info]: (
                    <CheckCircleOutlineOutlined
                      fontSize="large"
                      color="inherit"
                    />
                  ),
                  [MessageType.Success]: (
                    <CheckCircleOutlineOutlined
                      fontSize="large"
                      color="inherit"
                    />
                  ),
                  [MessageType.Problem]: (
                    <ErrorOutlineRounded fontSize="large" color="inherit" />
                  ),
                  [MessageType.Warning]: (
                    <WarningAmberRounded fontSize="large" color="inherit" />
                  ),
                  [MessageType.Note]: (
                    <InfoOutlined fontSize="large" color="inherit" />
                  ),
                }[type]
              }
            </Typography>
          )}
          {loading && (
            <CircularProgress size={30} sx={{ color: textColor() }} />
          )}
          {children}
        </Grid>
      </Grid>
    </Grid>
  );

  function textColor() {
    return {
      [MessageType.Info]: theme.palette.common.white,
      [MessageType.Success]: theme.palette.common.white,
      [MessageType.Problem]: theme.palette.common.white,
      [MessageType.Warning]: theme.palette.common.black,
      [MessageType.Note]: theme.palette.common.white,
    }[type];
  }

  function hoveredTextColor() {
    return {
      [MessageType.Info]: theme.palette.success.main,
      [MessageType.Success]: theme.palette.success.main,
      [MessageType.Problem]: theme.palette.error.main,
      [MessageType.Warning]: theme.palette.warning.main,
      [MessageType.Note]: theme.palette.warning.light,
    }[type];
  }
};
