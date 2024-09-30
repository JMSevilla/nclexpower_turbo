import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ProgramListBlock } from "../../../components/blocks/HubBlocks/ProgramListBlock/ProgramListBlock";

const ProgramListPage: React.FC = () => {
  return <ProgramListBlock />;
};

export default withAuth(ProgramListPage);