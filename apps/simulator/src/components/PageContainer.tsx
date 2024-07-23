import React from 'react';
import { Container } from '@mui/material';
import { SsrMockQuestionaire } from '@/core/types/ssrData';
import { CalcItemSelectResponseItem } from 'core-library/types';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';

interface Props {
  selectedItem: CalcItemSelectResponseItem[];
}

export const PageContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, selectedItem }) => {
  const hasContainer = selectedItem.length > 0 && selectedItem.some(item => item.hasContainer);
  const { textZoomStyle } = useToolbarSettings();


  return (
    <>
      {hasContainer ? (
        <Container
          sx={{
            pt: 2,
            pb: 2,
            height: '100%',
          }}
          style={textZoomStyle}
        >
          {children}
        </Container>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
