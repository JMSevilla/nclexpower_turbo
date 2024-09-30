import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { WatchVideosBlock } from "../../../../components/blocks/HubBlocks/ProgramListBlock/WatchVideosBlock/WatchVideosBlock";

const WatchVideoPage: React.FC = () => {
  return <WatchVideosBlock />;
};

export default withAuth(WatchVideoPage);