import { HTTP_METHODS } from '@common/utils/http';

import { baseAPI } from './baseAPI';

const BASE_VINYL_URL = '/vinyls';

const vinylAPI = baseAPI.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    createVinyl: builder.mutation({
      query: ({ body }) => ({
        url: BASE_VINYL_URL,
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    updateVinyl: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BASE_VINYL_URL}/${id}`,
        method: HTTP_METHODS.PUT,
        body: body,
      }),
    }),
  }),
});

export const { useCreateVinylMutation, useUpdateVinylMutation } = vinylAPI;
