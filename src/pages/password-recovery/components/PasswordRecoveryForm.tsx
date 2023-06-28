import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { EMAIL_REGEX } from '@common/utils/validations';
import Button from '@components/Button/Button';
import ErrorMessage, {
  TErrorWithDataProps,
} from '@components/ErrorMessage/ErrorMessage';
import FieldTextInput from '@components/Fields/FieldTextInput/FieldTextInput';
import { useRecoveryPasswordMutation } from '@services/api/userAPI';

import styles from './PasswordRecoveryForm.module.scss';

type TPasswordRecoveryFormValues = {
  email: string;
};

type TPasswordRecoveryFormProps = {
  className?: string;
};

const PasswordRecoveryForm: React.FC<TPasswordRecoveryFormProps> = ({
  className,
}) => {
  const formMethods = useForm<TPasswordRecoveryFormValues>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  const [recoveryPassword, { isSuccess, error }] =
    useRecoveryPasswordMutation();

  const onSubmit = async (values: TPasswordRecoveryFormValues) => {
    await recoveryPassword(values);
  };

  const rootStyles = classNames(styles.root, className);
  const submitDisabled = isSubmitting;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={rootStyles}>
        <FieldTextInput
          name='email'
          label='Email'
          id='email'
          placeholder='you@email.com'
          error={errors.email}
          registerOptions={{
            required: 'Please fill in a valid email address',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please fill in a valid email address',
            },
          }}
          className={styles.field}
        />
        <ErrorMessage error={error as TErrorWithDataProps} />
        <Button
          data-testId='submit-btn'
          className={styles.button}
          type='submit'
          variant='primary'
          isSuccessful={isSuccess}
          isLoading={isSubmitting}
          disabled={submitDisabled}>
          Send Recovery Instructions
        </Button>
      </form>
    </FormProvider>
  );
};

export default PasswordRecoveryForm;
