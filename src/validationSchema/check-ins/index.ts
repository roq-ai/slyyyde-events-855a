import * as yup from 'yup';

export const checkInValidationSchema = yup.object().shape({
  checked_in: yup.boolean().nullable(),
  registration_id: yup.string().nullable(),
});
