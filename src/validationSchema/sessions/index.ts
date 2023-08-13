import * as yup from 'yup';

export const sessionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  event_id: yup.string().nullable(),
});
