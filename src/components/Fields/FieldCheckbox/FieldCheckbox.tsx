import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import styles from './FieldCheckbox.module.scss';

type TFieldCheckboxProps = {
  className?: string;
  label: string;
  name: string;
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  required?: boolean;
  error?: any;
};

const FieldCheckbox: React.FC<TFieldCheckboxProps> = (props) => {
  const {
    className,
    label,
    name,
    id,
    checked,
    defaultChecked,
    onChange,
    disabled,
    required,
    error,
  } = props;
  const { register } = useFormContext() || {};

  return (
    <div className={classNames(styles.root, className)}>
      <input
        type='checkbox'
        className={styles.input}
        id={id}
        defaultChecked={defaultChecked}
        checked={checked}
        disabled={disabled}
        {...register(name, {
          required: {
            value: required as boolean,
            message: 'This field is required!',
          },
          onChange,
        })}
      />
      <label htmlFor={id} className={styles.label}>
        <span className={styles.checkmark}></span>
        {label}
      </label>

      <ErrorMessage error={error} />
    </div>
  );
};

export default FieldCheckbox;
