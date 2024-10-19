 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { ProgramListBlock } from "../../../../components/blocks/HubBlocks/ProgramListBlock/ProgramListBlock";
import useGetProgramList from "core-library/hooks/useGetProgramList";

const ProgramListPage: React.FC = () => {
  const { programList } = useGetProgramList();
  const bodySystemsProgramList = programList ?? [];

  return (
    <ProgramListBlock
      program={bodySystemsProgramList}
      programTitle="Body Systems Topic (Day 1-13)"
      programSubtitle="Key body systems covered over 13 days of study."
    />
  );
};

export default ProgramListPage;