export const ROUTES = {
  signUp: '/signup',
  login: '/login',
  landingPage: '/',
  dashboard: '/dashboard',
  createVinyl: '/create',
  passwordRecovery: '/password-recovery',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
};

// TODO: This list should be updated with coressponding auth required for new routes above
export const ROUTES_REQUIRED_AUTHENTICATION = [
  ROUTES.verifyEmail,
  ROUTES.dashboard,
];

export const AUTHENTICATING_ROUTES = [
  ROUTES.signUp,
  ROUTES.login,
  ROUTES.passwordRecovery,
  ROUTES.resetPassword,
];
