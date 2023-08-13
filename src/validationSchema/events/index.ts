import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  name: yup.string().required(),
  client_id: yup.string().nullable(),
  manager_id: yup.string().nullable(),
});
