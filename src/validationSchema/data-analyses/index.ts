import * as yup from 'yup';

export const dataAnalysisValidationSchema = yup.object().shape({
  analysis: yup.string().nullable(),
  event_id: yup.string().nullable(),
});
