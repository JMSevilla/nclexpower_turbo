import * as yup from "yup";
import {
  QuestionSelectionOptions,
  RegularQuestionSelectionOptions,
} from "../../../types";

export const answerOptionsSchema = yup.object().shape({
  answers: yup
    .array(
      yup.object().shape({
        answer: yup.string().required("This field is required").default(""),
        answerKey: yup
          .boolean()
          .required("This field is required")
          .default(false),
      })
    )
    .when("$type", {
      is: "SATA",
      then: (schema) =>
        schema
          .min(5)
          .max(8)
          .required()
          .test(
            "select-atleast-2",
            "You must select atleast 2 correct answer",
            (val) => val.filter((val) => val.answerKey === true).length >= 2
          ),
      otherwise: (schema) =>
        schema
          .max(4)
          .required()
          .test(
            "select-atleast-1",
            "Select ateleast 1 corrrect answer",
            (val) => {
              if (val.some((val) => val.answerKey === true)) return true;
            }
          ),
    }),
});

export const regularQuestionsFormSchema = yup.object({
  questionnaires: yup.array(
    yup
      .object({
        cognitiveLevel: yup
          .string()
          .required("Cognitive level is required")
          .default(""),
        clientNeeds: yup
          .string()
          .required("Client needs is required")
          .default(""),
        contentArea: yup
          .string()
          .default("")
          .required("Content area is required"),
        question: yup.string().required("Question is required").default(""),
      })
      .concat(answerOptionsSchema)
  ),
});

export const containedRegularQuestionSchema = yup
  .object({
    type: yup.mixed<RegularQuestionSelectionOptions>().required(),
    main_type: yup.mixed<QuestionSelectionOptions>().default("Regular"),
  })
  .required()
  .concat(regularQuestionsFormSchema);

/* Case study schema */

export const containedCaseStudyQuestionSchema = yup
  .object({
    caseName: yup
      .array()
      .min(1, "Please select atleast 1 case name")
      .required("Select atleast 1 case name")
      .default([]),
  })
  .required();
