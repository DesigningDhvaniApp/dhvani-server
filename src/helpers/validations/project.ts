import * as yup from 'yup';

export const projectSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  goalAmount: yup.number().required(),
  fundRaised: yup.number().required(),
  aboutTheCause: yup.string().required(),
  planOfAction: yup.string().optional(),
  flyer: yup.string().optional(),
});
