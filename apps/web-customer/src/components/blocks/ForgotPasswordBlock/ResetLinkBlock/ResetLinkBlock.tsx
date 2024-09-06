import { useRouter } from "core-library/core/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import Emailsent from "../../../../assets/message.png";
import Link from "next/link";
import { useAtom } from "jotai";
import { ForgotPasswordAtom } from "@/core";
import { NotFoundBlock } from "../../NotFoundBlock/NotFoundBlock";

export const ResetLinkBlock: React.FC = () => {
  const [email] = useAtom(ForgotPasswordAtom);
  const router = useRouter();

  const handleBack = () => {
    router.replace((route) => route.login);
  };

  if (!email?.email) {
    return <NotFoundBlock />;
  }

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center gap-10 shadow-xl rounded-3xl w-6/12 h-3/5">
        <div className="relative bottom-8">
          <Image
            className="w-40 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl "
            src={Emailsent}
            alt="EmailSent"
          />
        </div>
        <div>
          <div className=" relative bottom-10 right-20 ">
            <h1 className="text-[30px] pt-sans-bold pt-10 text-[#0f2a71]">
              Password reset request sent
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <div className="pb-5">
              <p className="pt-sans-caption text-[18px]  text-[#0f2a71]">
                We’ve sent password reset instructions to:
              </p>
              <p className="pt-sans-bold text-[22px] w-96 text-[#0f2a71] ">
                {email?.email ?? "[[no-email]]"}
              </p>
            </div>
            <div className="pb-2">
              <p className="pt-sans-caption text-[18px] text-[#0f2a71]">
                If it doesn’t arrive soon. Check your spam folder or
              </p>
              <Link
                href="/account/forgot-password"
                className="ml-1 font pt-sans-narrow-bold text-darkBlue cursor-pointer text-[18px] "
              >
                send the email again.
              </Link>
            </div>

            <p className="pb-6 pt-sans-caption text-[18px] text-[#0f2a71]  ">
              Need help?
              <span className="ml-1 font pt-sans-narrow-bold text-darkBlue cursor-pointer underline">
                <Link href="/contact"> Contact Support</Link>
              </span>
            </p>

            <div
              className="cursor-pointer text-darkBlue text-[18px] relative top-8 "
              onClick={handleBack}
            >
              <ArrowBackIcon fontSize="small" />
              <span className="pt-sans-narrow-bold ml-1">
                Return to the login screen
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
