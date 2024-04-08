import React from "react";
import { Container } from "@mui/material";
import { SsrMockQuestionaire } from "@/core/types/ssrData";

interface Props {
  questionaire: SsrMockQuestionaire[];
}

export const PageContainer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  questionaire,
}) => {
  const hasContainer =
    questionaire.length > 0 &&
    questionaire.some((item) => item.hasContainer);

  return (
    <>
      {!hasContainer ? (
        <Container
          sx={{
            pt: 2,
            pb: 2,
            height: "100%",
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
