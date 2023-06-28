import { NextSeo } from 'next-seo';

import configEnv from '@server/configs/env';
import { PRIMARY_COLOR } from '@common/utils/styles';

type TSeoProps = {
  title?: string;
  description?: string;
};

const SEO_DESCRIPTION =
  'Pressly is the platform for artists to crowdpress their records via a designer tool, launchpad, storefront and handling of logistics.';

const Seo: React.FC<TSeoProps> = (props) => {
  const { title, description = SEO_DESCRIPTION } = props;

  return (
    <NextSeo
      defaultTitle={configEnv.app.NEXT_PUBLIC_MARKETPLACE_NAME}
      titleTemplate={`%s | ${configEnv.app.NEXT_PUBLIC_MARKETPLACE_NAME}`}
      title={title}
      description={description}
      canonical={configEnv.app.NEXT_PUBLIC_CANONICAL_ROOT_URL}
      themeColor={PRIMARY_COLOR}
      openGraph={{
        title,
        description,
        type: 'website',
        url: configEnv.app.NEXT_PUBLIC_CANONICAL_ROOT_URL,
        locale: configEnv.app.NEXT_PUBLIC_LOCALE,
        siteName: configEnv.app.NEXT_PUBLIC_MARKETPLACE_NAME,
        images: [
          {
            url: `${configEnv.app.NEXT_PUBLIC_CANONICAL_ROOT_URL}/static/images/pressly.png`,
            width: 1920,
            height: 960,
            alt: configEnv.app.NEXT_PUBLIC_MARKETPLACE_NAME,
            type: 'image/png',
          },
        ],
      }}
      twitter={{
        handle: configEnv.app.NEXT_PUBLIC_TWITTER_HANDLE,
        site: configEnv.app.NEXT_PUBLIC_TWITTER_HANDLE,
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default Seo;
