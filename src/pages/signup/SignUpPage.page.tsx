import Image from 'next/image';

import SignUpForm from './components/SignUpForm/SignUpForm';
import styles from './SignUpPage.module.scss';

type TSignUpPageProps = {
  className?: string;
};

const SignUpPage: React.FC<TSignUpPageProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.description}>
          Let’s create awesome vinyls, together.
        </p>
        <SignUpForm />
      </div>
      <div className={styles.imageWrapper}>
        <Image src='/static/images/signup-hero.png' fill alt='signup' />
      </div>
    </div>
  );
};

export default SignUpPage;
