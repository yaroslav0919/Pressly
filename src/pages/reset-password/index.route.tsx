import { ReactElement } from 'react';

import Layout from '@layouts/Layout';

import ResetPasswordPage from './ResetPasswordPage.page';
import styles from './ResetPasswordPage.module.scss';

const ResetPasswordRoute = () => <ResetPasswordPage />;

ResetPasswordRoute.getLayout = function getLayout(page: ReactElement) {
  return <Layout className={styles.page}>{page}</Layout>;
};

export default ResetPasswordRoute;
