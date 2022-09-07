import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/utils/http.util';

import { SignInRequestParams, SignInRequestResponse } from './types';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_MAIN_API }),
  tagTypes: [],
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInRequestResponse, SignInRequestParams>({
      query: (params) => ({
        url: '/sessions',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          username: params.username,
          password: params.password,
        },
      }),
    }),
  }),
});

export const { useSignInMutation } = mainApi;
