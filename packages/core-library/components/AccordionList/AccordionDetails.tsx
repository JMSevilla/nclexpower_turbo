 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { AccordionDetails, Box } from "@mui/material";
import Image from "next/image";
import { SectionListType, SectionVideosType } from "core-library/types/wc/programList";
import { getSectionStatusIcons, getSectionTypeIcons, useRouter } from "core-library";

interface CustomAccordionDetailsProps {
  sections: SectionListType[];
  programId: string;
}

export const CustomAccordionDetails: React.FC<CustomAccordionDetailsProps> = ({
  sections, programId
}) => {
  const router = useRouter();
  
  const handleShowVideos = (sectionVids: SectionVideosType[], programId: string) => {
    const secVids = JSON.stringify(sectionVids);
    const encodedSecVids = encodeURIComponent(secVids);
    router.push(`/hub/programs/watch?secVids=${encodedSecVids}&programId=${programId}`);
  };

  return (
    <>
      <AccordionDetails>
        <Box className="h-auto">
          <div className="flex w-full justify-between bg-[#dbdfea] px-8 py-2">
            <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
              Sections
            </h4>
            <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
              Status
            </h4>
          </div>
        </Box>
        <Box className="flex flex-col space-y-2 bg-white px-10 pt-4">
        {sections.length > 0 ? (
          sections.map((item) => {
            const {
              sectionId,
              sectionType,
              sectionTitle,
              sectionStatus,
              sectionVideos,
            } = item;

            const hasVideos = sectionVideos && sectionVideos.length > 0;

            return (
              <div
                key={sectionId}
                className="flex justify-between items-center"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={getSectionTypeIcons(sectionType)}
                    alt={sectionType}
                    width={16}
                    height={16}
                  />
                  <h4
                    onClick={hasVideos ? () => handleShowVideos(sectionVideos, programId) : undefined}
                    className="font-ptSansNarrow font-regular text-[18px] text-[#6C6C6C] hover:underline cursor-pointer"
                  >
                    {sectionTitle}
                  </h4>
                </div>
                <Image
                  src={getSectionStatusIcons(sectionStatus)}
                  alt={sectionStatus}
                  width={16}
                  height={16}
                />
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No available sections</div>
        )}

        </Box>
      </AccordionDetails>
    </>
  );
};
