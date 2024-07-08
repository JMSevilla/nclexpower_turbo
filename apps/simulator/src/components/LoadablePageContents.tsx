import { ComponentLoader } from 'core-library/components';
import { Box } from '@mui/material';
import { useApplicationContext } from '../core/context/AppContext';
import { useEffect } from 'react';
import { UnauthorizedDialog } from './Dialog/UnauthorizedDialog';
interface Props {
  loading?: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({ children, loading }) => {
  const { setLoader, hasAccessToken } = useApplicationContext();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  if (!hasAccessToken) {
    return <UnauthorizedDialog open={!hasAccessToken} />;
  }

  return (
    <>
      {loading ? (
        <Box
          data-testid="page-content-loading"
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
          data-testid="page-content-loading"
          display={loading ? 'none' : 'block'}
          flexDirection="column"
          height="100%"
        >
          {children}
        </Box>
      )}
    </>
  );
};
