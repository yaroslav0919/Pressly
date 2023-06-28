import { useForm } from 'react-hook-form';

import Button from '@components/Button/Button';

import styles from './SubscribeEmailForm.module.scss';

type TSubscribeEmailFormProps = {
  onSubmit: (values: TSubscribeFormValues) => void;
  loading: boolean;
};

export type TSubscribeFormValues = {
  email: string;
};
const SubscribeEmailForm: React.FC<TSubscribeEmailFormProps> = ({
  onSubmit,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      email: '',
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-center'>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={`h-[3.7rem] w-full max-w-lg rounded-lg bg-white/10 px-4 py-2 text-sm placeholder-gray-500 shadow-md outline-none md:text-base ${
            errors.email ? 'border border-red-500' : ''
          }`}
          placeholder='Enter your email'
        />

        <Button
          type='submit'
          variant='primary'
          size='small'
          className={styles.submitBtn + ' ' + styles.arrow}
          isLoading={loading}>
          Notify Me
        </Button>
      </div>
      {errors.email && (
        <p className='mt-3 text-sm text-gray-300'>{errors.email.message}</p>
      )}
    </form>
  );
};

export default SubscribeEmailForm;
