import * as yup from 'yup';

export const resultSchema = yup.object().shape({
  details: yup.string().required(),
  POCApproval: yup.string().matches(/^\d+$/),
  SEApproval: yup.string().matches(/^\d+$/),
  evidence: yup.string().required(),
  testId: yup.string().required(),
});