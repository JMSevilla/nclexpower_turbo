import PageNotFound from "../../../assets/PageNotFound.jpg";
import Image from "next/image";
import { useRouter } from "next/router";

export const NotfoundBlock: React.FC = () => {
  const router = useRouter();

  const BackToHome = () => {
    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col font-['Poppins']">
      <Image className="w-[700px]" src={PageNotFound} alt="ImageOne" />
      <button
        className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
        onClick={BackToHome}
      >
        BACK TO HOMEPAGE
      </button>
    </div>
  );
};
