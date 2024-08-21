import { NotFoundPage } from "core-library/assets";
import Image from "next/image";
import { useRouter } from "next/router";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const NotfoundBlock: React.FC = () => {
  const router = useRouter();

  const Back = () => {
    router.back();
  };

  return (
    <div className="h-screen flex items-center justify-center font-['Poppins'] text-center p-4 ">
      <div className="w-[643.5px] h-[637px] flex-shrink-0 mr-10">
        <Image src={NotFoundPage} alt="Page Not Found" />
      </div>
      <div className="flex flex-col gap-y-2 justify-center items-center">
        <h1 className="W-[547px] text-[#3562D8] font-Poppins text-center text-[200px] font-bold leading-[108%]">
          404
        </h1>

        <h1 className="font-Rajdhani text-center text-[#232323] text-[80px] font-bold leading-[100%] pb-4">
          Page not found
        </h1>

        <p className="text-center text-[23px] font-ptSans font-normal leading-[36px] text-[#9A9A9A] w-[560px] pb-3">
          Were’ sorry, the page you requested could not be found. Please go back
          to the previous page.
        </p>

        <div className="flex justify-center">
          <button
            className="mt-4 flex w-[120px] h-[55px] py-[13px] justify-center items-center flex-shrink-0 bg-[#0F2A71] rounded-[10px] text-[#FFFDF1] text-center font-ptSansNarrow font-bold leading-[36px]"
            onClick={Back}
          >
            GO BACK
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
