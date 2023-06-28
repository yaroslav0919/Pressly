import Image from 'next/image';

import LoginForm from './components/LoginForm';
import styles from './LoginPage.module.scss';

type TLoginPageProps = {
  className?: string;
};

const LoginPage: React.FC<TLoginPageProps> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Welcome back!</h1>
        <p className={styles.description}>
          Continue with Google or enter your details
        </p>
        <LoginForm />
      </div>
      <div className={styles.imageWrapper}>
        <Image src='/static/images/login-hero.png' fill alt='login' />
      </div>
    </div>
  );
};

export default LoginPage;
