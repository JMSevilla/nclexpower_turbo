import { Box } from '@mui/material';
import { styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
    maxHeight: "400px",
    overflowY: "auto",
    padding: theme.spacing(3),
    gap: theme.spacing(1),
}));