import { SectionVideosType } from "../../../../../core/types/programList";
import ReactPlayer from "react-player";
import { useMediaQuery } from "@mui/material";

interface VideoPlayerProps {
  isWideScreen: boolean;
  selectedVid: SectionVideosType | null;
  toggleWideScreen: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isWideScreen,
  selectedVid,
  toggleWideScreen,
}) => {
  const isMdScreen = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!selectedVid) return null;

  const playerWidth = isWideScreen
    ? "1050px"
    : isMdScreen
    ? "900px"
    : isMobile
    ? "100%"
    : "700px";

  const playerHeight = isWideScreen
    ? "588px"
    : isMdScreen
    ? "450px"
    : isMobile
    ? "225px"
    : "386px";

  return (
    <div
      className={`${isWideScreen ? "col-span-3" : "col-span-3 lg:col-span-2"} flex flex-col gap-4`}
    >
      <div className="flex rounded-[10px] overflow-hidden">
        <ReactPlayer
          url={selectedVid.secVidUrl}
          controls={true}
          playsinline={true}
          pip={true}
          stopOnUnmount={false}
          width={playerWidth}
          height={playerHeight}
        />
      </div>

      <div className="hidden lg:flex items-center">
        <p
          onClick={toggleWideScreen}
          className="cursor-pointer font-ptSansNarrow text-[14px] text-black font-bold bg-white p-2 rounded-[10px]"
        >
          Theater Mode {""}
          <span className={isWideScreen ? "text-red-500" : "text-green-500"}>
            {isWideScreen ? "OFF" : "ON"}
          </span>
        </p>
      </div>
    </div>
  );
};
