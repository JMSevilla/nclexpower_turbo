import { SectionVideosType } from "../../../../../core/types/programList";
import Image from "next/image";

interface VideoDetailsProps {
  selectedVid: SectionVideosType | null;
  isWideScreen: boolean;
}

export const VideoDetails: React.FC<VideoDetailsProps> = ({
  selectedVid,
  isWideScreen,
}) => {
  return (
    <>
      {selectedVid ? (
        <div
          className={`${isWideScreen ? "col-span-3 lg:col-span-2 order-1" : "col-span-3 lg:col-span-1 order-2"} flex flex-col gap-2 w-full lg:w-[622px]`}
        >
          <h4 className="text-black font-ptSans text-[22px] lg:text-[28px] font-bold">
            {selectedVid.secVidTitle}
          </h4>
          <hr className="text-[#9A9A9A]" />
          <div className="flex items-center gap-2">
            <Image src={selectedVid.secVidAuthorImg} alt="author-pic" />
            <div className="flex flex-col">
              <p className="font-ptSans text-black font-bold text-[14px]">
                {selectedVid.secVidAuthor}
              </p>
              <p className="italic text-darkGray text-[14px]">Author</p>
            </div>
          </div>
          <h4 className="text-black font-ptSans text-[14px] font-regular px-4 lg:px-0">
            {selectedVid.secVidDescription || "No description available."}
          </h4>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="font-ptSansNarrow">No video details.</p>
          </div>
        </>
      )}
    </>
  );
};
