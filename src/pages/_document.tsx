import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import env from '@server/configs/env';

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/static/icons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/static/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/static/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/static/icons/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/static/icons/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <link rel='shortcut icon' href='/static/icons/favicon.ico' />
        <meta name='msapplication-TileColor' content='#fff' />
        <meta
          name='msapplication-config'
          content='/static/icons/browserconfig.xml'></meta>
        <Script
          src='https://accounts.google.com/gsi/client'
          async
          defer></Script>

        <Script
          strategy='lazyOnload'
          src={`https://www.googletagmanager.com/gtag/js?id=${env.google.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}></Script>
        <Script strategy='lazyOnload' id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${env.google.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
            `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
