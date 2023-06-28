import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { AUTHENTICATING_ROUTES, ROUTES } from '@common/routes';
import Button from '@components/Button/Button';
import Navbar from '@components/Navbar/Navbar';
import UserProfileDropdown from '@components/Navbar/UserProfileDropdown/UserProfileDropdown';
import useToggle from '@hooks/useToggle';

import AuthenticationModal from './components/AuthenticationModal';
import styles from './Layout.module.scss';
import Seo from './Seo';

type TLayoutProps = PropsWithChildren & {
  className?: string;
};

const Layout: React.FC<TLayoutProps> = ({ children, className }) => {
  const router = useRouter();
  const { pathname, isReady } = router;
  const isAuthenticatingRoute = AUTHENTICATING_ROUTES.some(
    (route) => route === pathname
  );
  const {
    isShow: isOpenModalForAuthentication,
    onOpen: onOpenModalForAuthentication,
    onClose: onCloseModalForAuthentication,
  } = useToggle();

  const { data: session } = useSession();

  const rootWithHeader = classNames(styles.root, className);
  const rootWithoutHeader = classNames(styles.rootWithoutHeader, className);
  const [rootClasses, setRootClasses] = useState(rootWithoutHeader);

  // TODO: Should be replace when implement save vinyl feature
  const [isSaveProgressSuccess, setIsSaveProgressSuccess] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const headerRef = document.getElementById('header');
    if (!headerRef) {
      setRootClasses(rootWithoutHeader);
      return;
    }

    setRootClasses(rootWithHeader);
  }, [pathname, isReady]);

  const handleClickSaveProgress = () => {
    if (!session) {
      onOpenModalForAuthentication();
    }
    //TODO: Call mutation save vinyl here
    console.log('Save vinyl');
    setIsSaveProgressSuccess(true);
  };
  const headerRightContentByRoute = () => {
    switch (pathname) {
      case ROUTES.createVinyl:
        return (
          <Button
            variant='secondary'
            className={styles.saveProgressBtn}
            onClick={handleClickSaveProgress}
            isSuccessful={isSaveProgressSuccess}>
            Save progress
          </Button>
        );
      case ROUTES.landingPage: {
        return <></>;
      }
      default:
        return session && !isAuthenticatingRoute ? (
          <UserProfileDropdown />
        ) : (
          <></>
        );
    }
  };

  const headerByRoute = () => {
    switch (pathname) {
      case ROUTES.passwordRecovery:
      case ROUTES.resetPassword:
        return <></>;
      default:
        return <Navbar rightContent={headerRightContentByRoute()} />;
    }
  };

  const bgCircleByRoute = () => {
    switch (pathname) {
      case ROUTES.signUp:
      case ROUTES.login:
      case ROUTES.passwordRecovery:
      case ROUTES.resetPassword:
      case ROUTES.verifyEmail:
        return (
          <div className={styles.bgCircleOfAccountPagesContainer}>
            <div className={styles.bgCircleOfAccountPages} />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Seo />
      {headerByRoute()}
      <div className={rootClasses}>
        {bgCircleByRoute()}
        <main>{children}</main>
        <ToastContainer
          position='top-left'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          theme='light'
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>

      <AuthenticationModal
        isOpen={isOpenModalForAuthentication}
        onCloseModal={onCloseModalForAuthentication}
      />
    </>
  );
};

export default Layout;
