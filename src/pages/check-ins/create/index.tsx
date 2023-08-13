import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCheckIn } from 'apiSdk/check-ins';
import { checkInValidationSchema } from 'validationSchema/check-ins';
import { RegistrationInterface } from 'interfaces/registration';
import { getRegistrations } from 'apiSdk/registrations';
import { CheckInInterface } from 'interfaces/check-in';

function CheckInCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CheckInInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCheckIn(values);
      resetForm();
      router.push('/check-ins');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CheckInInterface>({
    initialValues: {
      checked_in: false,
      registration_id: (router.query.registration_id as string) ?? null,
    },
    validationSchema: checkInValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Check Ins',
              link: '/check-ins',
            },
            {
              label: 'Create Check In',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Check In
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl
            id="checked_in"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.checked_in}
          >
            <FormLabel htmlFor="switch-checked_in">Checked In</FormLabel>
            <Switch
              id="switch-checked_in"
              name="checked_in"
              onChange={formik.handleChange}
              value={formik.values?.checked_in ? 1 : 0}
            />
            {formik.errors?.checked_in && <FormErrorMessage>{formik.errors?.checked_in}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<RegistrationInterface>
            formik={formik}
            name={'registration_id'}
            label={'Select Registration'}
            placeholder={'Select Registration'}
            fetcher={getRegistrations}
            labelField={'attendee_name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/check-ins')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'check_in',
    operation: AccessOperationEnum.CREATE,
  }),
)(CheckInCreatePage);
