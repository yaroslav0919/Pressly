import { FieldError } from 'react-hook-form';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './ErrorMessage.module.scss';

export type TErrorWithDataProps = {
  data: {
    message?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

type TErrorMessageProps = {
  className?: string;
  error?: string | FieldError | TErrorWithDataProps;
};

const ErrorMessage: React.FC<TErrorMessageProps> = (props) => {
  const { className, error } = props;

  const isFieldError = (error: any): error is FieldError => {
    return error && error.type && error.message;
  };

  const isErrorWithDataProp = (error: any): error is TErrorWithDataProps => {
    return error && error.data;
  };

  const rootClassNames = classNames(
    styles.root,
    { [styles.errorWithDataProp]: isErrorWithDataProp(error) },
    className
  );

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          variants={{
            visible: { opacity: 1, height: 'auto' },
            hidden: { opacity: 0, height: 0 },
          }}
          initial='hidden'
          animate='visible'
          exit='hidden'>
          <motion.div role='alert'>
            <p className={rootClassNames} data-testId='error-message'>
              {typeof error === 'string'
                ? error
                : isFieldError(error)
                ? error.message
                : isErrorWithDataProp(error)
                ? error.data.message
                : 'Some unknown error occurs'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
