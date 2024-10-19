import * as yup from "yup";

export const registrationSchema = yup.object({
  hasNoMiddleName: yup.boolean().default(false),
  firstname: yup.string().required("First Name is required").default(""),
  middlename: yup
    .string()
    .when("hasNoMiddleName", {
        is: false,
        then: () =>
          yup
            .string()
            .required(
              "Please provide your middlename or select I do not have a middlename"
            ),
        otherwise: () => yup.string().notRequired(),
      })
    .default(""),
  lastname: yup.string().required("Last Name is required").default(""),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required")
    .default(""),
  password: yup.string().required("Password is required").default(""),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password")
    .default(""),
});

export type RegistrationFormType = yup.InferType<typeof registrationSchema>;
