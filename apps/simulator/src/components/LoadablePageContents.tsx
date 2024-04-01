import { ComponentLoader } from "@repo/ui";
import { Box } from "@mui/material";
import { useApplicationContext } from "@/core/context/AppContext";
import { useEffect } from "react";

interface Props {
  loading?: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
}) => {
  const { setLoader } = useApplicationContext();
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);
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
          <ComponentLoader disableMarginBottom />
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
