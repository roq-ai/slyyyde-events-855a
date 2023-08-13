import * as yup from 'yup';

export const promotionValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  event_id: yup.string().nullable(),
});
