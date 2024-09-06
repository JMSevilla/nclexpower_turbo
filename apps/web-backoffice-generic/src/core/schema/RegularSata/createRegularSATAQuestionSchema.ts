import * as yup from 'yup'

export const createRegularSATAQuestionSchema = yup.object().shape({
    client_needs: yup.string().required("Client Needs Category is required"),
    content_area: yup.string().required("Content Area is required"),
    cognitive_level: yup.string().required("Cognitive Level is required"),
});