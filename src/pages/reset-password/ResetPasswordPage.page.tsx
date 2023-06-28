import BackButton from '@components/BackButton/BackButton';

import ResetPasswordForm from './components/ResetPasswordForm';
import styles from './ResetPasswordPage.module.scss';

type TResetPasswordPageProps = {
  className?: string;
};

const ResetPasswordPage: React.FC<TResetPasswordPageProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.backButtonContainer}>
        <BackButton className={styles.backButton} variant='secondary' />
      </div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          New
          <br /> Password
        </h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
