import * as yup from "yup";

const containedCaseStudyQuestionTypeMockSchema = yup.object().shape({
  caseName: yup.array().of(yup.mixed()), // Assuming `any` could be of any type, so we use `yup.mixed()`
  nurseNotes: yup.array().of(
    yup.object().shape({
      seqNum: yup.number().integer().nullable(),
      seqContent: yup.string().nullable(),
    })
  ),
  hxPhy: yup.array().of(
    yup.object().shape({
      seqNum: yup.number().integer().nullable(),
      seqContent: yup.string().nullable(),
    })
  ),
  labs: yup.array().of(
    yup.object().shape({
      seqNum: yup.number().integer().nullable(),
      seqContent: yup.string().nullable(),
    })
  ),
  orders: yup.array().of(
    yup.object().shape({
      seqNum: yup.number().integer().nullable(),
      seqContent: yup.string().nullable(),
    })
  ),
  questionnaires: yup
    .array()
    .of(
      yup.object().shape({
        maxPoints: yup.number().required(),
        sequenceNum: yup.number().required(),
        questionType: yup.string().required(),
        itemNumber: yup.number().required(),
        itemStem: yup.string().required(),
        transitionHeader: yup.string().nullable(),
        answerOptions: yup
          .array()
          .of(
            yup.object().shape({
              optionName: yup.string().required(),
              options: yup
                .array()
                .of(
                  yup.object().shape({
                    answer: yup.string().required(),
                    answerKey: yup.boolean().required(),
                  })
                )
                .required(),
            })
          )
          .nullable(),
      })
    )
    .required(),
});

export type ContainedCaseStudyQuestionMockType = yup.InferType<
  typeof containedCaseStudyQuestionTypeMockSchema
>;
