import {
  RegisterOptions,
  useFormContext,
  ValidationValueMessage,
} from 'react-hook-form';
import classNames from 'classnames';

import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import styles from './FieldTextInput.module.scss';

export type TFieldTextInputProps = {
  className?: string;
  fieldWrapperClassName?: string;
  label?: string;
  name: string;
  id?: string;
  placeholder?: string;
  error?: any;
  inputWrapperClassName?: string;
  labelWrapperClassName?: string;
  errorMessageClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  defaultValue?: string;
  registerOptions?: RegisterOptions;
  disabled?: boolean;
  uncontrolled?: boolean;
  autoComplete?:
    | 'off'
    | 'on'
    | 'name'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password';
  type?: 'text' | 'email' | 'password';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const FieldTextInput: React.FC<TFieldTextInputProps> = (props) => {
  const {
    className,
    inputWrapperClassName,
    labelWrapperClassName,
    labelClassName,
    fieldWrapperClassName,
    label,
    name,
    id,
    placeholder,
    error,
    errorMessageClassName,
    inputClassName,
    defaultValue,
    registerOptions,
    disabled = false,
    uncontrolled = false,
    autoComplete,
    type = 'text',
    leftIcon,
    rightIcon,
  } = props;
  const { register, watch } = useFormContext() || {};
  const value = watch(name);

  if (label && !id) {
    throw new Error('id required when a label is given');
  }

  const inputWrapperClasses = classNames(
    styles.inputWrapper,
    inputWrapperClassName
  );
  const labelWrapperClasses = classNames(
    styles.labelWrapper,
    labelWrapperClassName
  );
  const labelClasses = classNames(styles.label, labelClassName);
  const inputFieldClasses = classNames(
    styles.input,
    { [styles.filledInput]: value && value.length > 0 },
    { [styles.inputWithLeftIcon]: !!leftIcon },
    { [styles.inputWithRightIcon]: !!rightIcon },
    inputClassName
  );

  const inputProps = {
    type,
    id,
    className: inputFieldClasses,
    placeholder,
    defaultValue,
    disabled,
    autoComplete,
  };

  const maxLengthOption = registerOptions?.maxLength as ValidationValueMessage;
  const maxLength = maxLengthOption?.value || registerOptions?.maxLength;
  const currentLength = value?.length || 0;
  const currentLengthText = maxLength ? `${currentLength}/${maxLength}` : '';
  const maxLengthError =
    maxLength && currentLength > maxLength
      ? maxLengthOption?.message || 'Please fill in less characters'
      : null;

  return (
    <div
      className={classNames(styles.root, className, {
        [styles.error]: error || maxLengthError,
      })}>
      <div className={classNames(styles.fieldWrapper, fieldWrapperClassName)}>
        <div className={labelWrapperClasses}>
          {label ? (
            <label htmlFor={id} className={labelClasses}>
              {label}
            </label>
          ) : null}
          {maxLength ? (
            <span className={styles.currentLengthText}>
              {currentLengthText}
            </span>
          ) : null}
        </div>

        <div className={inputWrapperClasses}>
          {uncontrolled ? (
            <input {...inputProps} />
          ) : (
            <input {...inputProps} {...register(name, registerOptions)} />
          )}
          {leftIcon ? <div className={styles.leftIcon}>{leftIcon}</div> : null}
          {rightIcon ? (
            <div className={styles.rightIcon}>{rightIcon}</div>
          ) : null}
        </div>

        <ErrorMessage
          error={maxLengthError || error}
          className={errorMessageClassName}
        />
      </div>
    </div>
  );
};

export default FieldTextInput;
