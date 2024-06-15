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
import { useResolution } from "../../hooks/useResolution";
import { MessageType, messageRole } from "./alert";
import React from "react";
import { CmsButton } from "../../types/common";
import { ParsedHtml } from "../ParseHtml";

interface Props {
  type: MessageType;
  html?: string;
  buttons?: CmsButton[];
  loading?: boolean;
  ariaProps?: object;
}

export const AlertMessage: React.FC<Props> = ({
  type,
  html,
  buttons,
  loading,
  ariaProps,
}) => {
  const theme = useTheme();
  const { isMobile } = useResolution();
  const isLoading = loading;

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
      {...ariaProps}
    >
      <Grid
        item
        xs={12}
        container
        spacing={4}
        alignItems="center"
        px={isMobile ? 0 : 8}
        maxWidth={(theme) => theme?.sizes?.contentWidth + "!important"}
      >
        {html && (
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
                    [MessageType.PrimaryTenant]: (
                      <InfoOutlined fontSize="large" color="inherit" />
                    ),
                    [MessageType.Note]: null,
                  }[type]
                }
              </Typography>
            )}
            {isLoading && (
              <CircularProgress size={30} sx={{ color: textColor() }} />
            )}
            {!isLoading && html && (
              <ParsedHtml
                html={html}
                isWithMargin={false}
                disableEmptyLineRule
                sx={{
                  fontSize: (theme) => theme.typography.htmlFontSize,
                  mt: -1,
                }}
              />
            )}
          </Grid>
        )}
        {!!buttons?.length && (
          <Grid
            item
            xs={12}
            md="auto"
            display="flex"
            gap={4}
            justifyContent="flex-end"
            flexWrap="nowrap"
          >
            {buttons.map((button, index) => (
              <Button
                key={index}
                size="small"
                fullWidth={isMobile}
                sx={{
                  border: "2px solid ",
                  lineHeight: 1,
                  borderColor: (theme) =>
                    button.type === "Primary"
                      ? type === MessageType.Warning
                        ? theme.palette.common.black
                        : theme.palette.common.white
                      : "transparent",
                  color: isLoading ? "transparent !important" : textColor(),
                  "&:hover": {
                    backgroundColor: textColor(),
                    color: hoveredTextColor(),
                    "& #icon": {
                      backgroundColor: hoveredTextColor(),
                    },
                  },
                  "& #loader": {
                    position: "absolute",
                    color: textColor(),
                  },
                }}
                href={button.link}
                onClick={() => {}}
                disabled={isLoading}
              >
                {button.text}
                {isLoading && <CircularProgress size={20} id="loader" />}
              </Button>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  function textColor() {
    return {
      [MessageType.Info]: theme.palette.common.white,
      [MessageType.Success]: theme.palette.common.white,
      [MessageType.Problem]: theme.palette.common.white,
      [MessageType.Warning]: theme.palette.common.black,
      [MessageType.PrimaryTenant]: theme.palette.common.white,
      [MessageType.Note]: theme.palette.common.white,
    }[type];
  }

  function hoveredTextColor() {
    return {
      [MessageType.Info]: theme.palette.success.main,
      [MessageType.Success]: theme.palette.success.main,
      [MessageType.Problem]: theme.palette.error.main,
      [MessageType.Warning]: theme.palette.warning.main,
      [MessageType.PrimaryTenant]: theme.palette.primary.main,
      [MessageType.Note]: theme.palette.warning.light,
    }[type];
  }
};
