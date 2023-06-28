import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TLoginFormValues } from '@common/definitions/forms';
import { EMAIL_REGEX } from '@common/utils/validations';
import Button from '@components/Button/Button';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import FieldPasswordInput from '@components/Fields/FieldPasswordInput/FieldPasswordInput';
import FieldTextInput from '@components/Fields/FieldTextInput/FieldTextInput';
import GoogleIcon from '@components/Icons/GoogleIcon';

import styles from './AuthenticationModal.module.scss';
import { AuthenticationBaseFormType } from './FormSignUp';

export const DELAY_TIME_CLOSE_MODAL = 1000;

const FormLogin: React.FC<AuthenticationBaseFormType> = ({
  switchToOtherForm,
  closeModal,
}) => {
  const [submitError, setSubmitError] = useState<string>('');
  const [loginSucccess, setLoginSucccess] = useState(false);

  const handleClickGoogleSignIn = async () => {
    await signIn('google');
    closeModal();
  };

  const onSubmit = async (values: TLoginFormValues) => {
    try {
      const body = { email: values.email, password: values.password };
      const status = await signIn('credentials', {
        redirect: false,
        ...body,
      });

      if (status?.ok) {
        setLoginSucccess(true);
        setTimeout(() => {
          closeModal();
        }, DELAY_TIME_CLOSE_MODAL);
      } else {
        setSubmitError('Invalid email or password');
      }
    } catch (err) {
      console.log('Login error: ', err);
      setSubmitError(`There's something wrong. Please try again.`);
    }
  };

  const formMethods = useForm<TLoginFormValues>();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = formMethods;

  const submitDisabled = isSubmitting;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldsWrapper}>
          <FieldTextInput
            label='Email'
            name='email'
            id='email'
            placeholder='email@email.com'
            error={errors.email}
            className={styles.field}
            registerOptions={{
              required: 'Please fill in your email',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Please fill in a valid email address',
              },
            }}
          />
          <FieldPasswordInput
            autoComplete='current-password'
            id='password'
            label='Password'
            name='password'
            placeholder='Password'
            error={errors.password}
            className={styles.field}
          />
        </div>

        <ErrorMessage error={submitError} />

        <div className={styles.buttonsWrapper}>
          <Button
            type='submit'
            disabled={submitDisabled}
            isLoading={isSubmitting}
            isSuccessful={loginSucccess}
            className={styles.submitButton}>
            Sign In
          </Button>
          <Button
            variant='secondary'
            icon={<GoogleIcon />}
            iconPosition='left'
            type='button'
            onClick={handleClickGoogleSignIn}
            className={styles.googleButton}>
            Sign in with Google
          </Button>
        </div>

        <p className={styles.redirectToLogin}>
          {`Don't have an account? `}
          <span
            onClick={switchToOtherForm}
            className={styles.switchModalButton}>
            Sign Up
          </span>
        </p>
      </form>
    </FormProvider>
  );
};

export default FormLogin;
