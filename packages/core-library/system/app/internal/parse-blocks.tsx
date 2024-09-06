import withAuth from "../../../core/utils/withAuth";
import {
  HubBlock,
  LoginFormBlock,
  SettingsManagementPageBlock,
  QuestionApprovalBlock,
} from "./blocks";
import { ParseBlocksProps } from "./types";

const ParseBlocks: React.FC<ParseBlocksProps> = (props) => {
  const { blocks } = props;

  switch (blocks) {
    case "LoginFormBlock":
      return <LoginFormBlock />;
    case "HubOverviewBlock":
      const { cards } = props as ParseBlocksProps<"HubOverviewBlock">;
      return <HubBlock cards={cards} />;
    case "SettingsBlock":
      return <SettingsManagementPageBlock />;
    case "QuestionApprovalBlock":
      return <QuestionApprovalBlock />;
    default:
      return null;
  }
};

export default withAuth(ParseBlocks);
