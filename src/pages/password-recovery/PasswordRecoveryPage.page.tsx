import BackButton from '@components/BackButton/BackButton';

import PasswordRecoveryForm from './components/PasswordRecoveryForm';
import styles from './PasswordRecoveryPage.module.scss';

type TPasswordRecoveryPageProps = {
  className?: string;
};

const PasswordRecoveryPage: React.FC<TPasswordRecoveryPageProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.backButtonContainer}>
        <BackButton className={styles.backButton} variant='secondary' />
      </div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          Recover
          <br /> Password
        </h1>
        <PasswordRecoveryForm />
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
