import * as React from 'react';
import Box from '@mui/material/Box';
import { CloseIcon } from "core-library/assets";
import Image from 'next/image';
import { SectionListType } from '../../../../core/types/programList';
import { getSectionTypeIcons, getSectionStatusIcons } from "../../../../utils";

interface Props {
  title: string;
  closeModal: () => void;
  sections: SectionListType[];
}

export const ProgramGridContent: React.FC<Props> = ({title, sections, closeModal}) => {
  const mappedSections = sections.map(({ sectionType, sectionTitle, sectionStatus }) => ({
    type: sectionType,
    title: sectionTitle,
    status: sectionStatus,
  }));

  return (
    <div>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full">
          <div className="flex justify-between items-center w-full bg-gradient-to-r from-mainBlue to-[#181E2F] px-4 py-2">
            <h4 className="font-bold font-ptSansNarrow text-[20px] text-white">
              {title}
            </h4>
            <Image
              src={CloseIcon}
              alt="Close"
              width={16}
              height={16}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col w-full px-8 py-2 gap-4">
            <div className="flex justify-between w-full">
              <h4 className="font-ptSansNarrow text-black font-regular text-[16px]">
                Section
              </h4>
              <h4 className="font-ptSansNarrow text-black font-regular text-[16px]">
                Status
              </h4>
            </div>
            {mappedSections.map((item, index) => {
                const {type, title, status} = item;
              return (
                <>
                  <div className="flex justify-between px-2" key={index}>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={getSectionTypeIcons(type)}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                      <h4 className="font-ptSansNarrow font-regular text-[16px] text-[#6C6C6C] hover:underline cursor-pointer">
                        {title}
                      </h4>
                    </div>
                    <Image
                      src={getSectionStatusIcons(status)}
                      alt="status"
                      width={16}
                      height={16}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </Box>
    </div>
  );
};