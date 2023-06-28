import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

import {
  AUTHENTICATING_ROUTES,
  ROUTES,
  ROUTES_REQUIRED_AUTHENTICATION,
} from '@common/routes';
import ConcentricText from '@components/ConcentricText/ConcentricText';
import { useNextAuthSession } from '@hooks/useNextAuthSession';

type TAuthProviderProps = PropsWithChildren;

const AuthProvider: React.FC<TAuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  const { isLoading, isAuthenticated } = useNextAuthSession();

  const isRequiredAuthenticationRoute = ROUTES_REQUIRED_AUTHENTICATION.some(
    (route) => route === pathname
  );
  const isAuthenticatingRoute = AUTHENTICATING_ROUTES.some(
    (route) => route === pathname
  );
  const authenticatedUserAccessAuthenticatingRoutes =
    isAuthenticatingRoute && isAuthenticated;
  const unauthenticatedUserAccessRequiredAuthenRoutes =
    isRequiredAuthenticationRoute && !isAuthenticated;
  const shouldKeepLoading =
    unauthenticatedUserAccessRequiredAuthenRoutes ||
    authenticatedUserAccessAuthenticatingRoutes;

  useEffect(() => {
    if (authenticatedUserAccessAuthenticatingRoutes)
      router.push(ROUTES.dashboard);
    if (unauthenticatedUserAccessRequiredAuthenRoutes)
      router.push(ROUTES.login);
  }, [
    unauthenticatedUserAccessRequiredAuthenRoutes,
    authenticatedUserAccessAuthenticatingRoutes,
  ]);

  return (
    <>
      {isLoading || shouldKeepLoading ? (
        <div className='fixed top-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 bg-black font-drukWide text-5xl backdrop-blur-xl'>
          <Image
            src='/static/images/loading.png'
            alt='loading iconic'
            width={150}
            height={150}
            className='animate-rotate'
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AuthProvider;
