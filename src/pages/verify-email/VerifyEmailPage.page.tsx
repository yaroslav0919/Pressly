import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ROUTES } from '@common/routes';
import ErrorMessage, {
  TErrorWithDataProps,
} from '@components/ErrorMessage/ErrorMessage';
import { useVerifyEmailMutation } from '@services/api/userAPI';

import styles from './VerifyEmailPage.module.scss';

type TVerifyEmailPageProps = {
  className?: string;
};

const VerifyEmailPage: React.FC<TVerifyEmailPageProps> = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { t: token } = query;

  const [verifyEmail, { isLoading, isSuccess, error }] =
    useVerifyEmailMutation();

  useEffect(() => {
    if (isReady && token) verifyEmail({ token });
  }, [isReady, token, verifyEmail]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push(ROUTES.dashboard);
      }, 3000);
    }
  }, [isSuccess, router]);
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Verify Email</h1>

        {isLoading && (
          <>
            <Image
              src='/static/images/loading.png'
              alt='loading iconic'
              width={104}
              height={104}
              className={styles.loadingImage}
            />
            <p className={styles.loadingText}>
              We are verifying your email ...
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <p className={styles.successText}>
              You have verified email successfully
            </p>
            <p className={styles.successText}>Redirecting to dashboard...</p>
          </>
        )}

        <ErrorMessage
          className={styles.error}
          error={
            (isReady && !token
              ? `There's something wrong. Please visit this page by the link provided in your email.`
              : null) || (error as TErrorWithDataProps)
          }
        />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
