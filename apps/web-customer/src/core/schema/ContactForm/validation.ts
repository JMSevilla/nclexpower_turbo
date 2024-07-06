import * as yup from 'yup';

export const contactSchema = yup.object({
  firstName: yup.string().required('First Name is required').default(''),
  lastName: yup.string().required('Last name is required').default(''),
  email: yup.string().email('Invalid email').required('Email is required').default(''),
  message: yup.string().required('Message is required').default('')
})

export type ContactFormType = yup.InferType<typeof contactSchema>;