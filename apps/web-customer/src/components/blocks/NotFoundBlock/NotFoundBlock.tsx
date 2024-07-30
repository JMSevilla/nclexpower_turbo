import PageNotFound from "../../../assets/PageNotFound.jpg";
import Image from "next/image";
import { useRouter } from "next/router";

export const NotfoundBlock: React.FC = () => {
  const router = useRouter();

  const Back = () => {
    router.replace("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col font-['Poppins'] text-center p-4">
      <Image
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        src={PageNotFound}
        alt="Page Not Found"
      />
      <p className="mt-4 text-lg md:text-xl lg:text-2xl">
        The page you were looking for: <strong>{router.asPath}</strong> could
        not be found.
      </p>
      <button
        className="mt-4 text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50"
        onClick={Back}
      >
        BACK
      </button>
    </div>
  );
};
