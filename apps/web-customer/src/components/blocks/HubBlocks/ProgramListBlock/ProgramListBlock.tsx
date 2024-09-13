import React, { useState } from "react";
import { Box } from "@mui/material";
import { ProgramListAccordion } from "../../../../components/ProgramListAccordion/ProgramListAccordion";
import { ProgramHeader } from "./ProgramHeader";
import { ProgramGridView } from "./ProgramGridView";
import { standardProgramList } from "../../../../core/constant/ProgramListMock/ProgramListMock";

export function ProgramListBlock(){
  const [listView, setListView] = useState<boolean>(true);

  const toggleView = () => setListView((prev) => !prev);  

  return (
    <section className="flex h-auto w-full justify-center bg-[#e7eaf1]">
      <Box className="flex flex-col w-full lg:w-[1045px] mt-[120px] mb-[40px] mx-4 gap-8 ">
        <ProgramHeader
          title={"Body Systems Topic (Day 1-13)"}
          subtitle={"Key body systems covered over 13 days of study."}
          listView={listView}
          handleClick={toggleView}
        />
        {listView ? (
          <div className="fadeIn">
            <ProgramListAccordion program={standardProgramList} />
          </div>
        ) : (
          <>
            <ProgramGridView program={standardProgramList} />
          </>
        )}
      </Box>
    </section>
  );
};