import { Box } from "@mui/material";
import { Alert } from "../../../../../../../components";

interface HeaderProps {
  showAlert?: boolean;
}

export function Header({ showAlert }: HeaderProps) {
  return (
    <>
      <Box className="flex flex-col text-center mt-4 mb-0">
        <p className="leading-none uppercase text-xl font-semibold lg:text-2xl">
          Change your
          <span className="ml-1 text-blue">Password</span>
        </p>

        {!showAlert ? (
          <p className="leading-none text-[14px] lg:text-[16px] text-curveGray">
            Select a security question and provide answer for verification.
          </p>
        ) : (
          <Alert
            severity="success"
            title="Security question and answer verified successfully."
          />
        )}
      </Box>
    </>
  );
}
