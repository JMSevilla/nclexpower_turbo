import { Box, IconButton } from "@mui/material";
import { Alert } from "core-library/components";
import {
  securityQuestionAndAnswerSchema,
  SecurityQuestionAndAnswerType,
  changePasswordSchema,
  ChangePasswordType,
} from "../../../../core/schema/ChangePasswordForm/validation";
import { TextField } from "core-library/components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "core-library/components";
import Link from "next/link";
import Lottie from "lottie-react";
import { ChangePasswordImage } from "core-library/assets";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ControlledSelectField } from "core-library/components";
import { SecurityQuestionAndAnswer } from "../../../../core/constant/mockSecurityQuestionAndAnswer";

interface Props {
  onSubmit: (values: ChangePasswordType) => void;
  onSecQandASubmit: (values: SecurityQuestionAndAnswerType) => void;
  validSecQAndSecA?: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleClickShowPassword: () => void;
  handleClickShowConfirmPassword: () => void;
  showAlert?: boolean;
}

const formattedSecurityQuestions = SecurityQuestionAndAnswer.map((item) => ({
  label: item.question,
  value: item.questionId.toString(),
  xvalue: item.questionId,
}));

export const ChangePasswordForm: React.FC<Props> = ({
  onSubmit,
  onSecQandASubmit,
  validSecQAndSecA,
  showPassword,
  showConfirmPassword,
  handleClickShowPassword,
  handleClickShowConfirmPassword,
  showAlert,
}) => {
  const secQuestionAndAnswerForm = useForm({
    mode: "onSubmit",
    resolver: yupResolver(securityQuestionAndAnswerSchema),
    defaultValues: securityQuestionAndAnswerSchema.getDefault(),
  });

  const changePasswordForm = useForm({
    mode: "onSubmit",
    resolver: yupResolver(changePasswordSchema),
    defaultValues: changePasswordSchema.getDefault(),
  });

  const {
    control: secQandAcontrol,
    handleSubmit: handleSubmitQandA,
    formState: formStateQandA,
  } = secQuestionAndAnswerForm;

  const {
    control: changePasswordcontrol,
    handleSubmit: handleSubmitPassword,
    formState: formStatePassword,
  } = changePasswordForm;

  const isSecQandAValid = formStateQandA.isValid;
  const isChangePasswordValid = formStatePassword.isValid;

  return (
    <section className="w-full h-full flex justify-center items-center">
      <Box className="container-sm flex flex-col lg:flex-row items-center justify-center w-full space-x-0 px-8 lg:space-x-14 lg:px-4">
        <Box className="flex flex-col order-2 lg:order-1">
          <Box className="flex flex-col text-center mt-4 mb-0">
            <p className="leading-none uppercase text-xl font-semibold lg:text-2xl">
              Change your
              <span className="ml-1 text-blue">Password</span>
            </p>

            {!showAlert ? (
              <p className="leading-none text-[14px] lg:text-[16px] text-curveGray">
                Select a security question and provide your answer.
              </p>
            ) : (
              <Alert
                severity="success"
                title="Security question and answer verified successfully."
              />
            )}
          </Box>

          <FormProvider {...secQuestionAndAnswerForm}>
            <ControlledSelectField
              name="securityQuestion"
              control={secQandAcontrol}
              options={formattedSecurityQuestions}
              placeholder="Select Question"
              disabled={validSecQAndSecA}
              sx={{ width: "100%", borderRadius: "10px" }}
            />
            <TextField
              control={secQandAcontrol}
              placeholder="Security Answer"
              name="securityAnswer"
              disabled={validSecQAndSecA}
              sx={{
                width: "100%",
                marginBottom: "20px",
              }}
              inputProps={{ style: { padding: 15 } }}
            />
          </FormProvider>

          {validSecQAndSecA && (
            <>
              <p className="leading-none text-center text-[16px] text-curveGray">
                Please enter your new password to continue with the reset.
              </p>
              <FormProvider {...changePasswordForm}>
                <TextField
                  control={changePasswordcontrol}
                  placeholder="New Password"
                  name="newPassword"
                  sx={{
                    width: "100%",
                  }}
                  inputProps={{ style: { padding: 15 } }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                />
                <TextField
                  control={changePasswordcontrol}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  sx={{
                    width: "100%",
                  }}
                  inputProps={{ style: { padding: 15 } }}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                />
              </FormProvider>
            </>
          )}

          <div className="mt-5">
            <Button
              variant="contained"
              fullWidth
              disabled={!isSecQandAValid}
              onClick={
                !validSecQAndSecA
                  ? handleSubmitQandA(onSecQandASubmit)
                  : handleSubmitPassword(onSubmit)
              }
              sx={{
                px: 4,
                py: 2,
                borderRadius: "10px",
                backgroundColor: "#0F2A71",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              {validSecQAndSecA ? "Change Password" : "Submit"}
            </Button>
          </div>

          <Box className="flex items-center justify-left w-full gap-2 mt-4">
            <Link
              href="/account/forgot-password"
              className="text-[16px] lg:text-md font-semibold text-blue"
            >
              <ArrowBackIosNewIcon fontSize="inherit" /> Change Email
            </Link>
          </Box>
        </Box>
        <div className="flex order-1 lg:order-2">
          <Lottie
            animationData={ChangePasswordImage}
            style={{ width: 300, height: 300 }}
          />
        </div>
      </Box>
    </section>
  );
};
