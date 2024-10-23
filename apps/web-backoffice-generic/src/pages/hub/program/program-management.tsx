 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";

const ProgramManagementMainPage: React.FC = () => {
  return <ParseBlocks blocks="ProgramManagementBlock" />;
};

export default withAuth(ProgramManagementMainPage);