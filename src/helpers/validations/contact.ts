import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup.string().required(),
  phone: yup.number().required(),
  email: yup.string().required(),
  message: yup.string().required(),
});
