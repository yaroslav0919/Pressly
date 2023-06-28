import { HTTP_METHODS } from '@common/utils/http';
import { buildAPIUrl } from '@common/utils/url';

import { baseAPI } from './baseAPI';

const baseURL = '/users';

export const userAPI = baseAPI.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: buildAPIUrl(baseURL, '/verify-email'),
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    recoveryPassword: builder.mutation({
      query: (body) => ({
        url: buildAPIUrl(baseURL, '/recovery-password'),
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: buildAPIUrl(baseURL, '/reset-password'),
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  useRecoveryPasswordMutation,
  useResetPasswordMutation,
} = userAPI;
