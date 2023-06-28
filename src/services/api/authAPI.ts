import { HTTP_METHODS } from '@common/utils/http';
import { buildAPIUrl } from '@common/utils/url';

import { baseAPI } from './baseAPI';

const baseURL = '/auth';

const userAPI = baseAPI.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: buildAPIUrl(baseURL, '/signup'),
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
  }),
});

export const { useSignupMutation } = userAPI;
