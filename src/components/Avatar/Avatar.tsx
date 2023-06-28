import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './Avatar.module.scss';

export type TAvatarProps = {
  src: string;
  className?: string;
  size?: 'large' | 'middle';
  width?: number;
  height?: number;
  userName?: string;
  userNameClass?: string;
  containerClass?: string;
  alt?: string;
};

const Avatar = (props: TAvatarProps) => {
  const {
    className,
    src,
    size = 'middle',
    alt = 'Avatar',
    width,
    height,
    userName,
    userNameClass,
    containerClass,
  } = props;
  const containerClasses = classNames(styles.container, containerClass);
  const classes = classNames(styles.root, className);
  const userNameClasses = classNames(styles.userName, userNameClass);

  const getSize = () => {
    if (width && height)
      return {
        width,
        height,
      };

    switch (size) {
      case 'large':
        return {
          width: 56,
          height: 56,
        };

      case 'middle':
      default:
        return {
          width: 32,
          height: 32,
        };
    }
  };

  const avatarProps = {
    src,
    alt,
    className: classes,
    width: getSize().width,
    height: getSize().height,
  };
  return (
    <div className={containerClasses}>
      <Image {...avatarProps} />
      {userName && <p className={userNameClasses}>{userName}</p>}
    </div>
  );
};

export default Avatar;
