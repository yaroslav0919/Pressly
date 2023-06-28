export enum USER_ROLE {
  regularUser = 'regular_user',
}
// export const SESSION_MAX_AGE = 60 * 2; //2mins for testing
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; //30days
export const SESSION_UPDATE_AGE = 24 * 60 * 60; //24h
export const SESSION_TOKEN_NAME = 'next-auth.session-token';
