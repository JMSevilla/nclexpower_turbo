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
import { Box, TextField } from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
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
      <div className="flex items-center justify-end w-full h-screen bg-[#f3f4f8]">
        <div className="flex flex-col items-center justify-center gap-5 ">
          <Image
            src={CoreZigma}
            alt="CoreZigma"
            style={{
              width: "100px",
              height: "auto",
            }}
          />
          <div className="flex items-center w-full justify-center flex-col gap-5">
            <div className="flex items-start justify-start flex-col w-1/2 gap-5">
              <p className="text-center text-[30px] pt-sans-bold font-bold text-[#0F2A71]">
                Password reset request sent
              </p>

              <p className="text-start justify-start pt-sans-narrow-regular">
                We&apos;ve sent password reset instructions to :
              </p>

              <p className=" pt-sans-narrow-regular rounded-md p-3 px-20 border-2 border-[#dddfeb] w-100px bg-[#e7eaf1] text-[#0F2A71]">
                nclexPower_2024@gmail.com
              </p>

              <p className="w-50px pt-sans-narrow-regular">
                If you don't see the email, check other places it might be, like
                your junk, spam, or social folder, or{" "}
                <span className="text-[#0F2A71] pt-sans-narrow-bold">
                  send the email again.
                </span>
                <div className="w-50px flex flex-row text-start">
                  <HelpOutlineRoundedIcon className=" text-[#0F2A71] gap-4" />
                  <p className="text-[16px] pt-sans-narrow-bold text-[#0F2A71]">
                    Need Help?
                  </p>
                  <p>
                    Our customer support team is here for you. Contact Support
                  </p>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
