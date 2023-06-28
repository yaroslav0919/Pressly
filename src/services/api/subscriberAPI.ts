import { HTTP_METHODS } from '@common/utils/http';

import { baseAPI } from './baseAPI';

const baseURL = '/subscribers';

const subscriberAPI = baseAPI.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    subscribeEmail: builder.mutation({
      query: (body) => {
        return {
          url: baseURL,
          method: HTTP_METHODS.POST,
          body: body,
        };
      },
    }),
  }),
});

export const { useSubscribeEmailMutation } = subscriberAPI;
