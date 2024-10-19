import { ComponentLoader } from "../../ComponentLoader";
import { Box } from "@mui/material";

interface Props {
  loading?: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <Box
          flex={1}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{}}
        >
          <ComponentLoader disableMarginBottom={false} />
        </Box>
      ) : (
        <Box
          display={loading ? "none" : "block"}
          flexDirection="column"
          height="100%"
        >
          {children}
        </Box>
      )}
    </>
  );
};
