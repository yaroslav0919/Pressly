import localFont from '@next/font/local';
import classNames from 'classnames';

const fontDrukWideMedium = localFont({
  src: [
    {
      path: '../../../public/static/fonts/DrukWide-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  adjustFontFallback: false,
  variable: '--font-drukWide',
});
const fontFavoritStdBook = localFont({
  src: [
    {
      path: '../../../public/static/fonts/FavoritStd-Book.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  adjustFontFallback: false,
  variable: '--font-favoritStd',
});
const fontNTDapperRegular = localFont({
  src: [
    {
      path: '../../../public/static/fonts/NTDapper-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  adjustFontFallback: false,
  variable: '--font-ntDapper',
});

export const preloadFontClassNames = classNames(
  fontDrukWideMedium.variable,
  fontFavoritStdBook.variable,
  fontNTDapperRegular.variable
);
