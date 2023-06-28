import { ReactElement } from 'react';

import Layout from '@layouts/Layout';

import PasswordRecoveryPage from './PasswordRecoveryPage.page';
import styles from './PasswordRecoveryPage.module.scss';

const PasswordRecoveryRoute = () => {
  return <PasswordRecoveryPage />;
};

PasswordRecoveryRoute.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={styles.page}>{page}</Layout>;
};

export default PasswordRecoveryRoute;
