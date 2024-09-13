import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CloseIcon } from "core-library/assets";
import Image from 'next/image';
import { SectionListType } from '../../core/types/programList';
import { getSectionTypeIcons, getSectionStatusIcons } from "../../utils";

interface Props {
  title: string;
  showModal: boolean;
  closeModal: () => void;
  sections: SectionListType[];
}

export const CustomModal: React.FC<Props> = ({title, sections, showModal, closeModal}) => {
  const mappedSections = sections.map(({ sectionType, sectionTitle, sectionStatus }) => ({
    type: sectionType,
    title: sectionTitle,
    status: sectionStatus,
  }));

  return (
    <div>
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[350px] md:w-[493px] bg-white rounded-[16px]">
          <div className="flex justify-between items-center w-full bg-gradient-to-r from-mainBlue to-[#181E2F] px-4 py-2 rounded-t-[16px]">
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
          <div className="flex flex-col w-full px-8 py-4 gap-4">
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
      </Modal>
    </div>
  );
};