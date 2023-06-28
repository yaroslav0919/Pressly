import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { ROUTES } from '@common/routes';
import LogoNoText from '@components/Logo/LogoNoText';
import configEnv from '@server/configs/env';

import styles from './Navbar.module.scss';

type NavbarPropsType = {
  rightContent?: ReactElement;
};

const Navbar: React.FC<NavbarPropsType> = ({ rightContent }) => {
  const router = useRouter();

  const shouldUseTransparentBg = router.pathname === ROUTES.landingPage;
  const showText = router.pathname === ROUTES.landingPage;
  const rootClassnames = classNames({
    [styles.transparentBgr]: shouldUseTransparentBg,
    [styles.layoutWithRightContent]: !!rightContent,
  });

  return (
    <>
      <header className={rootClassnames} id='header'>
        <Link
          aria-label={configEnv.app.NEXT_PUBLIC_MARKETPLACE_NAME}
          href={ROUTES.landingPage}
          className={`${!showText ? '' : 'mt-0 sm:mt-2'}`}>
          <LogoNoText hideText={showText} />
        </Link>
        {rightContent}
      </header>

      <div className='h-32'></div>
    </>
  );
};

export default Navbar;
