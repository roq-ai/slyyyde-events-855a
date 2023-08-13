import * as yup from 'yup';

export const registrationValidationSchema = yup.object().shape({
  attendee_name: yup.string().required(),
  event_id: yup.string().nullable(),
});
