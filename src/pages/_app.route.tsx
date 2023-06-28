// eslint-disable-next-line
import '@styles/globals.scss';

import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import FormContextProvider from '@context/FormContext';
import Layout from '@layouts/Layout';
import env from '@server/configs/env';
import AuthProvider from '@src/providers/AuthProvider';
import store from '@store/store';
import { preloadFontClassNames } from '@common/utils/preloadFonts';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page: JSX.Element) => <Layout>{page}</Layout>);

  const router = useRouter();

  if (env.app.ENVIRONMENT === 'production' && router.pathname !== '/') {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <p className='font-drukWide text-5xl'> 404 Page Not Found</p>
      </div>
    );
  }
  return (
    <div className={preloadFontClassNames}>
      <SessionProvider session={session}>
        <AuthProvider>
          <FormContextProvider>
            <Provider store={store}>
              {getLayout(<Component {...pageProps} />)}
            </Provider>
          </FormContextProvider>
        </AuthProvider>
      </SessionProvider>
    </div>
  );
}
