import React from 'react';
import { Container } from '@mui/material';
import { SsrMockQuestionaire } from '@/core/types/ssrData';
import { CalcItemSelectResponseItem } from '@repo/core-library/types';

interface Props {
  selectedItem: CalcItemSelectResponseItem[];
}

export const PageContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, selectedItem }) => {
  const hasContainer = selectedItem.length > 0 && selectedItem.some(item => item.hasContainer);

  return (
    <>
      {hasContainer ? (
        <Container
          sx={{
            pt: 2,
            pb: 2,
            height: '100%',
          }}
        >
          {children}
        </Container>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
