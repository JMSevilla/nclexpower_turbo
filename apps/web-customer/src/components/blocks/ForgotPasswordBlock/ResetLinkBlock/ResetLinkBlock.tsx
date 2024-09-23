import { useRouter } from "core-library/core/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import Emailsent from "../../../../assets/message.png";
import Link from "next/link";
import { useAtom } from "jotai";
import { ForgotPasswordAtom } from "@/core";
import { NotFoundBlock } from "../../NotFoundBlock/NotFoundBlock";
import { resetLink } from "core-library/assets";
import CoreZigma from "../../../images/CoreZigma.png";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const ResetLinkBlock: React.FC = () => {
  const [email] = useAtom(ForgotPasswordAtom);
  const router = useRouter();

  const handleBack = () => {
    router.replace((route) => route.login);
  };

  // if (!email?.email) {
  //   return <NotFoundBlock />;
  // }

  return (
    <div className="flex items-center justify-between w-full h-screen">
      <div className="w-full hidden lg:block">
        <Image
          src={resetLink}
          style={{ width: "1000px", height: "auto" }}
          alt="resetLink"
        />
      </div>
      <div className="flex flex-col items-center text-center p-10 justify-start w-full h-screen bg-[#f3f4f8]">
        <div className="md:my-60 mx-10 space-y-10">
          <div className="flex flex-col items-center justify-center md:ex">
            <Image
              src={CoreZigma}
              alt="CoreZigma"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="">
            <p className="text-[30px] pt-sans-bold font-bold text-[#0F2A71]">
              Password reset request sent
            </p>
            <p className="text-[18px] text-start justify-start pt-sans-narrow-regular text-[#393A3A]">
              We&apos;ve sent password reset instructions to :
            </p>
            <p className="text-[18px] pt-sans-narrow-bold rounded-md p-3 px-20 border-2 border-[#dddfeb] w-100px bg-[#e7eaf1] text-[#0F2A71]">
              n{email?.email ?? "[[no-email]]"}
            </p>
            <p className="text-[18px] pt-sans-narrow-regular">
              If you don&apos;t see the email, check other places it might be,
              like your junk, spam, or social folder, or{" "}
              <span className="text-[#0F2A71] pt-sans-narrow-bold">
                send the email again.
              </span>
            </p>
            <div className="w-full px-4 py-1 flex items-center bg-[#D9D9D966] rounded-lg gap-4">
              <HelpOutlineRoundedIcon className=" text-[#0F2A71] gap-4" />
              <div className="text-start">
                <p className="text-[18px] pt-sans-narrow-bold text-[#0F2A71]">
                  Need Help?
                </p>
                <p>
                  Our customer support team is here for you. Contact Support
                </p>
              </div>
            </div>
            <div
              className="flex items-center justify-end cursor-pointer text-darkBlue mt-5"
              onClick={handleBack}
            >
              <div className="">
                <ArrowBackIosNewIcon fontSize="medium" />
                <span className="text-[18px] pt-sans-narrow-regular ml-1 underline underline-offset-1">
                  Return to login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
