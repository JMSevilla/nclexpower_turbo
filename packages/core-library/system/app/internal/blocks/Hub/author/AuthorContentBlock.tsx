/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Container, Box } from "@mui/material";
import {
  Alert,
  TabOption,
  TabPanel,
  TabsDesktop,
} from "core-library/components";
import { useMemo } from "react";
import { RegularTabApproval } from "./TabsSection/RegularTabApproval";
import { CaseStudyApproval } from "./TabsSection/CaseStudyApproval";

export const AuthorContentBlock: React.FC = () => {
  const tabs = useMemo<Array<TabOption>>(
    () => [
      {
        key: "Regular",
        content: <RegularTabApproval />,
      },
      {
        key: "Case Study",
        content: <CaseStudyApproval />,
      },
    ],
    []
  );

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Author Management"
          description="You can manage your author for the entire application."
        />
        <TabsDesktop tabs={tabs} />
        {tabs.map((tab, index) => (
          <TabPanel key={index} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Container>
    </Box>
  );
};
