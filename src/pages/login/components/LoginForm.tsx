import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import classNames from 'classnames';

import Button from '@components/Button/Button';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import FieldCheckbox from '@components/Fields/FieldCheckbox/FieldCheckbox';
import FieldPasswordInput from '@components/Fields/FieldPasswordInput/FieldPasswordInput';
import FieldTextInput from '@components/Fields/FieldTextInput/FieldTextInput';
import GoogleIcon from '@components/Icons/GoogleIcon';
import { EMAIL_REGEX } from '@common/utils/validations';
import { TLoginFormValues } from '@common/definitions/forms';

import styles from './LoginForm.module.scss';

type TLoginFormProps = {
  className?: string;
};

const LoginForm: React.FC<TLoginFormProps> = ({ className }) => {
  const [submitError, setSubmitError] = useState<string>('');

  const router = useRouter();
  const handleClickGoogleSignIn = () => {
    signIn('google');
  };

  const onSubmit = async (values: TLoginFormValues) => {
    try {
      const body = { email: values.email, password: values.password };
      const status = await signIn('credentials', {
        redirect: false,
        ...body,
        callbackUrl: '/dashboard',
      });
      if (status?.ok) {
        router.push(`${status?.url}`);
      } else {
        setSubmitError('Invalid email or password');
      }
    } catch (err) {
      setSubmitError(`There's something wrong. Please try again.`);
    }
  };

  const formMethods = useForm<TLoginFormValues>();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = formMethods;

  const rootStyles = classNames(styles.root, className);
  const submitDisabled = isSubmitting;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={rootStyles}>
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

        <div className={styles.row}>
          <FieldCheckbox
            name='remember'
            label='Remember me'
            id='remember'
            className={styles.field}
          />
          <Link href='/password-recovery' className={styles.link}>
            Forgot password
          </Link>
        </div>

        <ErrorMessage error={submitError} />

        <div className={styles.buttonsWrapper}>
          <Button
            type='submit'
            disabled={submitDisabled}
            isLoading={isSubmitting}
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
          <Link className={styles.link} href='/signup'>
            Sign Up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
