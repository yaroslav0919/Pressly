import React, { ReactElement } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import styles from './Button.module.scss';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
  iconClassName?: string;
  variant?: 'primary' | 'secondary' | 'text' | 'icon' | 'important';
  size?: 'small' | 'medium';
  isLoading?: boolean;
  isSuccessful?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    className: rootClassname,
    icon,
    iconPosition = 'right',
    iconClassName,
    variant,
    size,
    children,
    isLoading,
    isSuccessful,
    disabled,
    ...rest
  } = props;

  const rootClassNamesByVariant = () => {
    switch (variant) {
      case 'important':
        return styles.rootImportant;
      case 'secondary':
        return styles.rootSecondary;
      case 'text':
        return styles.rootText;
      case 'icon':
        return styles.rootIconBtn;
      case 'primary':
      default:
        return styles.rootPrimary;
    }
  };

  const rootClassNamesBySize = () => {
    switch (size) {
      case 'small':
        return styles.rootSmall;
      default:
        return '';
    }
  };

  const rootClasses = classNames(
    styles.root,
    rootClassNamesByVariant(),
    rootClassNamesBySize(),
    rootClassname
  );
  const iconClasses = classNames(
    styles.icon,
    {
      [styles.iconStyleOfButtonIcon]: variant === 'icon',
      [styles.leftIcon]: iconPosition === 'left',
      [styles.rightIcon]: iconPosition === 'right',
    },
    iconClassName
  );

  const renderContent = () => {
    if (icon)
      return (
        <>
          {iconPosition === 'left' && <div className={iconClasses}>{icon}</div>}
          {children}
          {iconPosition === 'right' && (
            <div className={iconClasses}>{icon}</div>
          )}
        </>
      );

    return (
      <>
        {isLoading ? (
          <AiOutlineLoading3Quarters
            color='inherit'
            style={{ width: '25px', height: '25px' }}
            className='mr-4 animate-spin'
          />
        ) : isSuccessful ? (
          <MdDone
            className={classNames(styles.icon, styles.leftIcon)}
            color='#C1DEC4'
          />
        ) : null}
        {children}
      </>
    );
  };

  return (
    <button
      data-cy='cy-test-button'
      className={rootClasses}
      {...rest}
      disabled={isSuccessful || disabled}>
      {variant === 'important' && (
        <motion.div
          className={styles.importantButtonSpreadingShadow}
          initial={{
            filter: 'blur(26px)',
            opacity: 0.4,
          }}
          animate={{
            filter: 'blur(42px)',
            opacity: 0.7,
          }}
          transition={{
            delay: 0.1,
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}></motion.div>
      )}
      {renderContent()}
    </button>
  );
};

export default Button;
