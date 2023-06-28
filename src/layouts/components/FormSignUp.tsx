import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';

import { TSignUpFormValues } from '@common/definitions/forms';
import { EMAIL_REGEX } from '@common/utils/validations';
import Button from '@components/Button/Button';
import ErrorMessage, {
  TErrorWithDataProps,
} from '@components/ErrorMessage/ErrorMessage';
import FieldPasswordInput from '@components/Fields/FieldPasswordInput/FieldPasswordInput';
import FieldTextInput from '@components/Fields/FieldTextInput/FieldTextInput';
import GoogleIcon from '@components/Icons/GoogleIcon';
import { useSignupMutation } from '@services/api/authAPI';

import styles from './AuthenticationModal.module.scss';
import { DELAY_TIME_CLOSE_MODAL } from './FormLogin';

export type AuthenticationBaseFormType = {
  switchToOtherForm: () => void;
  closeModal: () => void;
};

const FormSignUp: React.FC<AuthenticationBaseFormType> = ({
  switchToOtherForm,
  closeModal,
}) => {
  const formMethods = useForm<TSignUpFormValues>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  const [signup, { isSuccess, error }] = useSignupMutation();

  const onSubmit = async (values: TSignUpFormValues) => {
    try {
      await signup(values).unwrap();

      const { name, ...paramsForLogin } = values;
      const loginStatus = await signIn('credentials', {
        redirect: false,
        ...paramsForLogin,
      });

      if (!loginStatus?.ok) return;
      setTimeout(() => {
        closeModal();
      }, DELAY_TIME_CLOSE_MODAL);
    } catch (error) {
      console.error('Signup error: ', error);
    }
  };

  const handleClickGoogleSignIn = () => {
    signIn('google');
  };

  const submitDisabled = isSubmitting;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldsWrapper}>
          <FieldTextInput
            name='name'
            label='Name'
            id='label'
            placeholder='Your full name'
            error={errors.name}
            registerOptions={{ required: 'Please fill in your full name' }}
            className={styles.field}
          />
          <FieldTextInput
            name='email'
            label='Email'
            id='email'
            placeholder='you@email.com'
            error={errors.email}
            registerOptions={{
              required: 'Please fill in your email',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Please fill in a valid email address',
              },
            }}
            className={styles.field}
          />
          <FieldPasswordInput
            name='password'
            label='Password'
            id='password'
            autoComplete='new-password'
            placeholder='Your password'
            error={errors.password}
            className={styles.field}
          />
        </div>

        <ErrorMessage error={error as TErrorWithDataProps} />

        <div className={styles.buttonsWrapper}>
          <Button
            type='submit'
            disabled={submitDisabled}
            isSuccessful={isSuccess}
            isLoading={isSubmitting}
            className={styles.submitButton}>
            Create Account
          </Button>
          <Button
            variant='secondary'
            icon={<GoogleIcon />}
            iconPosition='left'
            type='button'
            onClick={handleClickGoogleSignIn}
            className={styles.googleButton}>
            Sign up with Google
          </Button>
        </div>

        <p className={styles.redirectToLogin}>
          Already have an account?{' '}
          <span
            className={styles.switchModalButton}
            onClick={switchToOtherForm}>
            Sign in
          </span>
        </p>
      </form>
    </FormProvider>
  );
};

export default FormSignUp;
