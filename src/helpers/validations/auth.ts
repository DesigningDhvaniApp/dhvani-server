import * as yup from 'yup';

export const memberSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.number().required(),
  userName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  address: yup.object({
    addressLine: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    country: yup.string().required(),
    zipCode: yup.number().required(),
  }),
});
