import { Box } from '@mui/material';
import React from "react";
import { ComponentLoader } from '../components';
import { usePageLoader } from '../hooks';

interface Props {
    loading?: boolean;
}

export const ContentLoader: React.FC<React.PropsWithChildren<Props>> = ({
    children, loading
}) => {
    const { isPageLoading } = usePageLoader()
    const hasLoading = loading || isPageLoading

    return (
        <React.Fragment>
            {hasLoading ? (
                <Box
                    flex={1}
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <ComponentLoader disableMarginBottom />
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" height="100%" className={'animate-fadeIn'}>
                    {children}
                </Box>
            )}
        </React.Fragment>
    );
};
