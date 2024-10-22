/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import {
  Button,
  ControlledTextField,
  ControlledCheckbox,
  EvaIconButton
} from "core-library/components";
import React, { useEffect } from "react";
import { RegistrationFormType, registrationSchema } from "core-library/system";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useShowPassword } from "../ForgotPasswordBlock/ChangePasswordBlock/useShowPassword";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usePreviousValue } from "core-library/hooks";
import { RegisterBG } from "core-library/assets";

interface RegistrationFormProps {
  onSubmit: (values: RegistrationFormType) => void;
  submitLoading?: boolean;
  handleBack: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  submitLoading,
  handleBack,
}) => {
  const form = useForm<RegistrationFormType>({
    mode: "onSubmit",
    resolver: yupResolver(registrationSchema),
    defaultValues: registrationSchema.getDefault(),
  });

  const { control, watch, resetField, handleSubmit, formState } = form;
  const { isDirty, isValid } = formState;

  const hasNoMiddleName = watch("hasNoMiddleName");
  const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName);

  useEffect(() => {
    resetField("middlename");
  }, [hasNoMiddleName, hasNoMiddleNamePrevValue, resetField]);

  const {
    showPassword,
    showconfirmPassword,
    handleClickShowPassword,
    handleClickShowconfirmPassword,
  } = useShowPassword();

  return (
    <React.Fragment>
      <Box className="w-full h-auto flex justify-around">
        <Box className="w-full lg:w-1/2 flex flex-col gap-8 px-12 py-8 justify-between h-screen">
          <Box className="w-full flex justify-between items-center">
            <EvaIconButton
              id="back-icon"
              name="arrow-ios-back-outline"
              width={30}
              height={30}
              ariaHidden
              onClick={handleBack}
              size="small"
            />
            <h4 className="text-[18px] font-regular font-ptSans">
              Already have an account?{" "}
              <span className="text-[18px] font-bold underline font-mainBlue">
                <Link href="/login">Login</Link>
              </span>
            </h4>
          </Box>

          <Box className="flex flex-col leading-none text-center">
            <h4 className="text-[22px] md:text-[32px] font-ptSans font-bold uppercase text-mainBlue">
              Start Your NCLEX Journey
            </h4>
            <p className="text-[16px] md:text-[18px] font-ptSansNarrow font-regular">
              Register now to prepare for your nursing board exam and succeed in
              your career!
            </p>
          </Box>

          <Box className="flex flex-col">
            <FormProvider {...form}>
              <Box className="flex flex-col gap-2">
                <Box className="flex flex-col gap-2">
                  <Box className="w-full flex flex-col lg:flex-row gap-2">
                    <Box className="flex flex-col lg:flex-row w-full gap-2">
                      <Box className="w-full">
                        <ControlledTextField
                          control={control}
                          label="First Name"
                          name="firstname"
                          required
                          sx={{
                            borderRadius: "10px",
                            width: "100%",
                          }}
                          inputProps={{
                            style: { padding: 15, borderRadius: "10px" },
                          }}
                        />
                      </Box>
                      <Box className="flex flex-col w-full">
                        <ControlledTextField
                          control={control}
                          required={!hasNoMiddleName}
                          shouldUnregister
                          name="middlename"
                          label="Middle Initial"
                          disabled={hasNoMiddleName}
                          className="shadow-sm shadow-zinc-200"
                          sx={{
                            borderRadius: "10px",
                            width: "100%",
                          }}
                          inputProps={{
                            style: { padding: 15, borderRadius: "10px" },
                          }}
                        />
                        <ControlledCheckbox
                          control={control}
                          name="hasNoMiddleName"
                          label="I do not have a middle initial"
                          sx={{ fontSize: 12, lineHeight: 1.2 }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className="flex flex-col lg:flex-row w-full gap-2">
                    <Box className="w-full">
                      <ControlledTextField
                        control={control}
                        label="Last Name"
                        name="lastname"
                        required
                        sx={{
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        inputProps={{
                          style: { padding: 15, borderRadius: "10px" },
                        }}
                      />
                    </Box>

                    <Box className="w-full">
                      <ControlledTextField
                        control={control}
                        label="Email Address"
                        name="email"
                        required
                        sx={{
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        inputProps={{
                          style: { padding: 15, borderRadius: "10px" },
                        }}
                      />
                    </Box>
                  </Box>

                  <Box className="flex flex-col lg:flex-row gap-2 w-full">
                    <Box className="w-full">
                      <ControlledTextField
                        control={control}
                        required
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        name="password"
                        sx={{
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        inputProps={{
                          style: { padding: 15, borderRadius: "10px" },
                        }}
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
                    </Box>

                    <Box className="w-full">
                      <ControlledTextField
                        control={control}
                        required
                        type={showconfirmPassword ? "text" : "password"}
                        label="Confirm Password"
                        name="confirmpassword"
                        sx={{
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        inputProps={{
                          style: { padding: 15, borderRadius: "10px" },
                        }}
                        endAdornment={
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowconfirmPassword}
                            edge="end"
                          >
                            {showconfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        }
                      />
                    </Box>
                  </Box>
                </Box>

                <Box className="flex flex-col">
                  <ControlledCheckbox
                    name="termsofservice"
                    label="I accept Terms of Service and Privacy Policy"
                    sx={{ fontSize: "14px" }}
                  />

                  <ControlledCheckbox
                    name="consent"
                    label="I consent to the collection and use of my personal information as described in the Privacy Policy and agree to the Terms of Service"
                    sx={{ fontSize: "14px" }}
                  />
                </Box>

                <Button
                  disabled={!isDirty || !isValid || submitLoading}
                  loading={submitLoading}
                  variant="contained"
                  fullWidth
                  sx={{
                    px: 4,
                    py: 2,
                    backgroundColor: "#0F2A71",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#00173F",
                    },
                    marginY: "10px",
                  }}
                  onClick={handleSubmit(onSubmit)}
                >
                  <span className="font-ptSans font-bold">Create Account</span>
                </Button>
              </Box>
            </FormProvider>
          </Box>
        </Box>

        <Box className="bg-peach lg:w-1/2 hidden lg:flex items-center justify-center">
          <Image
            src={RegisterBG}
            alt="registration page"
            className="object-cover object-left w-[500px] h-[450px] shadow-2xl"
            style={{ borderRadius: "35% 65% 65% 35% / 35% 34% 66% 65% " }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};
