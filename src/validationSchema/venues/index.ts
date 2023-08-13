import * as yup from 'yup';

export const venueValidationSchema = yup.object().shape({
  name: yup.string().required(),
  event_id: yup.string().nullable(),
});
