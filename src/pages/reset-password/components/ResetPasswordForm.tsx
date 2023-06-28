import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

import Button from '@components/Button/Button';
import ErrorMessage, {
  TErrorWithDataProps,
} from '@components/ErrorMessage/ErrorMessage';
import FieldPasswordInput from '@components/Fields/FieldPasswordInput/FieldPasswordInput';
import { useResetPasswordMutation } from '@services/api/userAPI';
import { ROUTES } from '@common/routes';

import styles from './ResetPasswordForm.module.scss';

type TResetPasswordFormValues = {
  'new-password': string;
  'confirm-password': string;
};

type TResetPasswordFormProps = {
  className?: string;
};

const DELAY_REDIRECT_TIME = 2000;

const ResetPasswordForm: React.FC<TResetPasswordFormProps> = ({
  className,
}) => {
  const router = useRouter();
  const { query } = router;
  const { t: token, e: email } = query;

  const [err, setErr] = useState('');

  const formMethods = useForm<TResetPasswordFormValues>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = formMethods;

  const [resetPassword, { isSuccess, error }] = useResetPasswordMutation();
  const onSubmit = async (values: TResetPasswordFormValues) => {
    try {
      const response = await resetPassword({
        ...values,
        token,
        email: decodeURIComponent(email as string),
      });
      //@ts-ignore
      if (response?.error?.data) {
        //@ts-ignore
        setErr(response?.error?.data?.message);
      }

      setTimeout(() => {
        router.push(ROUTES.login);
      }, DELAY_REDIRECT_TIME);
    } catch (error) {
      console.log('Reset-password error: ', error);
      setErr('Sorry, something happened, please try again...');
    }
  };

  const rootStyles = classNames(styles.root, className);
  const submitDisabled = isSubmitting;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={rootStyles}>
        <FieldPasswordInput
          name='new-password'
          label='New Password'
          id='new-password'
          autoComplete='new-password'
          placeholder='Your password'
          error={errors['new-password']}
          className={styles.field}
        />
        <FieldPasswordInput
          name='confirm-password'
          label='Confirm New Password'
          id='confirm-password'
          placeholder='This is the password'
          error={errors['confirm-password']}
          className={styles.field}
          registerOptions={{
            validate: (value) =>
              value === watch('new-password') || 'Passwords do not match',
          }}
        />
        <ErrorMessage error={(error as TErrorWithDataProps) || err} />
        <Button
          className={styles.button}
          type='submit'
          variant='primary'
          isSuccessful={isSuccess}
          isLoading={isSubmitting}
          disabled={submitDisabled}>
          Confirm New Password
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
