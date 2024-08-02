import { useRouter } from "next/router";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ResetLinkBlock: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.replace("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col  text-center p-4">
      <MarkEmailReadIcon className="text-[#0f2a71] text-[250px]" />
      <h1 className="text-[50px] pt-sans-bold">THANK YOU!!!</h1>
      <p className="pt-sans-caption text-[20px] w-96 text-[#0f2a71]">
        Your reset link was successfully sent to your Email! kindly check your
        Email!
      </p>
      <div
        className="flex items-center justify-end px-60 pt-10 cursor-pointer text-darkBlue text-[20px]"
        onClick={handleBack}
      >
        <ArrowBackIcon fontSize="small" />
        <span className="pt-sans-narrow-bold ml-1">
          Return to the login screen
        </span>
      </div>
    </div>
  );
};
