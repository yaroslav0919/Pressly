import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ROOT_API } from '@common/constants';

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ROOT_API }),
  endpoints: () => ({}),
});
