/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React, { useState } from "react";
import { Box } from "@mui/material";
import { AccordionList } from "../../../AccordionList/AccordionList";
import { ProgramHeader } from "./ProgramHeader";
import { ProgramGridView } from "./ProgramGridView";
import { StandardProgramListType } from "core-library/types/wc/programList";

interface ProgramListBlockProps {
  program: StandardProgramListType[];
  programTitle: string;
  programSubtitle: string;
}

export const ProgramListBlock: React.FC<ProgramListBlockProps> = ({program, programTitle, programSubtitle}) => {
  const [listView, setListView] = useState<boolean>(true);

  const toggleView = () => setListView((prev) => !prev);  

  return (
    <section className="flex h-auto w-full justify-center bg-[#e7eaf1]">
      <Box className="flex flex-col w-full lg:w-[1045px] mt-[120px] mb-[40px] mx-4 gap-8 ">
        <ProgramHeader
          title={programTitle}
          subtitle={programSubtitle}
          listView={listView}
          handleClick={toggleView}
        />
        {listView ? (
          <div className="fadeIn">
            <AccordionList program={program} />
          </div>
        ) : (
          <>
            <ProgramGridView program={program} />
          </>
        )}
      </Box>
    </section>
  );
};