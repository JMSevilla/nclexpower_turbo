import withAuth from "../../../core/utils/withAuth";
import { HubBlock } from "./blocks/Hub/HubBlock";
import { SettingsManagementPageBlock } from "./blocks/Hub/Settings/SettingsManagement/SettingsManagementPageBlock";
import { LoginFormBlock } from "./blocks/LoginFormBlock/LoginFormBlock";
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
    default:
      return null;
  }
};

export default withAuth(ParseBlocks);
