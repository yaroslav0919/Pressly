import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import EyeClosedIcon from '@components/Icons/EyeClosedIcon';
import EyeIcon from '@components/Icons/EyeIcon';
import { PASSWORD_REGEX } from '@common/utils/validations';

import FieldTextInput, {
  TFieldTextInputProps,
} from '../FieldTextInput/FieldTextInput';
import styles from './FieldPasswordInput.module.scss';

type TFieldPasswordInputProps = TFieldTextInputProps & {
  autoComplete?: 'new-password' | 'current-password';
};

const FieldPasswordInput: React.FC<TFieldPasswordInputProps> = (props) => {
  const { name, registerOptions, autoComplete } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { watch } = useFormContext() || {};
  const value = watch?.(name);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityButton = (
    <button onClick={toggleVisibility} type='button'>
      {!isVisible ? <EyeIcon /> : <EyeClosedIcon />}
    </button>
  );
  return (
    <FieldTextInput
      {...props}
      registerOptions={
        {
          required: 'Please fill in your password',
          ...(autoComplete === 'new-password' && {
            pattern: {
              value: PASSWORD_REGEX,
              message:
                'Password must be at least 8 characters, contain at least 1 uppercase letter and 1 special character',
            },
          }),
          ...registerOptions,
        } as RegisterOptions
      }
      type={isVisible ? 'text' : 'password'}
      inputClassName={classNames(styles.input, {
        [styles.password]: !isVisible && value?.length > 0,
      })}
      rightIcon={toggleVisibilityButton}
    />
  );
};

export default FieldPasswordInput;
