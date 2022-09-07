import config from '@config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { UserSecretQuestion } from '@utils/enums/e-secret-question';
import { axiosBaseQuery } from '@utils/http.utils';

const { mainURL } = config;

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: axiosBaseQuery({ baseUrl: mainURL }),
  tagTypes: ['User', 'Job', 'Candidature', 'Language'],
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
    createUser: builder.mutation<
      User,
      {
        name: string;
        cpf?: string;
        cnpj?: string;
        email: string;
        professionalExperiences?: string;
        contact: string;
        type: UserType;
        languagesId?: string;
        username: string;
        password: string;
        socialName?: string;
        socialReason?: string;
        secretQuestion: UserSecretQuestion;
        secretQuestionAnswer: string;
      }
    >({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        data: {
          name: user.name,
          cpf: user.cpf ?? null,
          cnpj: user.cnpj ?? null,
          email: user.email,
          professionalExperiences: user.professionalExperiences ?? null,
          contact: user.contact,
          type: user.type,
          languagesId: user.languagesId ?? '',
          username: user.username,
          password: user.password,
          socialName: user.socialName ?? null,
          socialReason: user.socialReason ?? null,
          secretQuestion: user.secretQuestion,
          secretQuestionAnswer: user.secretQuestionAnswer,
        },
      }),
    }),
    updateUser: builder.mutation<
      User,
      {
        id: number;
        name: string;
        cpf?: string;
        cnpj?: string;
        email: string;
        professionalExperiences?: string;
        contact: string;
        languagesId?: string;
        username: string;
        socialName?: string;
        socialReason?: string;
        jobsId?: string;
      }
    >({
      query: (user) => ({
        url: '/users',
        method: 'PUT',
        data: {
          id: user.id,
          name: user.name,
          cpf: user.cpf ?? null,
          cnpj: user.cnpj ?? null,
          email: user.email,
          professionalExperiences: user.professionalExperiences ?? null,
          contact: user.contact,
          languagesId: user.languagesId ?? '',
          username: user.username,
          socialName: user.socialName ?? null,
          socialReason: user.socialReason ?? null,
          jobsId: user.jobsId ?? '',
        },
      }),
    }),
    getUsers: builder.query<
      [User[], number],
      {
        name?: string;
        cpf?: string;
        cnpj?: string;
        socialName?: string;
        socialReason?: string;
        email?: string;
        professionalExperiences?: string;
        contact?: string;
        status?: UserStatus;
        type?: UserType;
        username?: string;
        lastAccess?: string;
        isDeleted?: boolean;
        offset?: number;
        isAscending?: boolean;
        limit?: number;
      }
    >({
      query: (user) => ({
        url: '/users',
        method: 'GET',
        params: {
          name: user.name ?? null,
          cpf: user.cpf ?? null,
          cnpj: user.cnpj ?? null,
          socialName: user.socialName ?? null,
          socialReason: user.socialReason ?? null,
          email: user.email ?? null,
          professionalExperiences: user.professionalExperiences ?? null,
          contact: user.contact ?? null,
          status: user.status ?? null,
          type: user.type ?? null,
          username: user.username ?? null,
          lastAccess: user.lastAccess ?? null,
          isDeleted: user.isDeleted ?? null,
          offset: user.offset ?? null,
          isAscending: user.isAscending ?? null,
          limit: user.limit ?? null,
        },
      }),
      providesTags: ['User'],
    }),
    inactiveUser: builder.mutation<void, { ids: string }>({
      query: ({ ids }) => ({
        url: '/users/inactive',
        method: 'PATCH',
        data: {
          ids,
        },
      }),
      invalidatesTags: ['User'],
    }),
    recoverUser: builder.mutation<void, { ids: string }>({
      query: ({ ids }) => ({
        url: '/users/recover',
        method: 'PATCH',
        data: {
          ids,
        },
      }),
      invalidatesTags: ['User'],
    }),
    resetPassword: builder.mutation<
      void,
      {
        id: string;
        currentPassword: string;
        newPassword: string;
      }
    >({
      query: ({ id, currentPassword, newPassword }) => ({
        url: '/users/password',
        method: 'PATCH',
        data: {
          id,
          currentPassword,
          newPassword,
        },
      }),
    }),
    requestResetPasswordStepOne: builder.mutation<
      { secretQuestion: UserSecretQuestion },
      { email: string }
    >({
      query: ({ email }) => ({
        url: '/users/requestResetPassword/stepOne',
        method: 'PATCH',
        data: {
          email,
        },
      }),
    }),
    requestResetPasswordStepTwo: builder.mutation<
      { resetToken: string },
      { email: string; secretQuestionAnswer: string }
    >({
      query: ({ email, secretQuestionAnswer }) => ({
        url: '/users/requestResetPassword/stepTwo',
        method: 'PATCH',
        data: {
          email,
          secretQuestionAnswer,
        },
      }),
    }),
    requestResetPasswordStepThree: builder.mutation<
      { username: string },
      {
        resetToken: string;
        newPassword: string;
      }
    >({
      query: ({ resetToken, newPassword }) => ({
        url: '/users/requestResetPassword/stepThree',
        method: 'PATCH',
        data: {
          resetToken,
          newPassword,
        },
      }),
    }),
    removeUser: builder.mutation<void, { ids: string }>({
      query: (user) => ({
        url: '/users/remove',
        method: 'DELETE',
        data: {
          ids: user.ids,
        },
      }),
      invalidatesTags: ['User'],
    }),
    getJobs: builder.query<[Job[], number], { name?: string; createdById?: string }>({
      query: ({ name }) => ({
        url: '/jobs',
        method: 'GET',
        params: {
          name,
        },
      }),
      providesTags: ['Job'],
    }),
    createJob: builder.mutation<
      Job,
      {
        name: string;
        complement: string;
        experience: string;
        quantity: number;
        requirements: string;
        skills: string;
        workload: string;
        languagesId: string;
      }
    >({
      query: ({
        name,
        complement,
        experience,
        quantity,
        requirements,
        skills,
        workload,
        languagesId,
      }) => ({
        url: '/jobs',
        method: 'POST',
        data: {
          name,
          complement,
          experience,
          quantity,
          requirements,
          skills,
          workload,
          languagesId,
        },
      }),
      invalidatesTags: ['Job'],
    }),
    updateJob: builder.mutation<
      Job,
      {
        id: number;
        name: string;
        complement: string;
        experience: string;
        quantity: number;
        requirements: string;
        skills: string;
        workload: string;
        languagesId: string;
      }
    >({
      query: (job) => ({
        url: '/jobs',
        method: 'PUT',
        data: {
          id: job.id,
          name: job.name,
          complement: job.complement,
          experience: job.experience,
          quantity: job.quantity,
          requirements: job.requirements,
          skills: job.skills,
          workload: job.workload,
          languagesId: job.languagesId,
        },
      }),
      invalidatesTags: ['Job'],
    }),
    removeJob: builder.mutation<void, { ids: string }>({
      query: ({ ids }) => ({
        url: '/jobs',
        method: 'DELETE',
        data: {
          ids,
        },
      }),
      invalidatesTags: ['Job'],
    }),
    getCandidatures: builder.query<[Candidature[], number], { userId?: string; jobId?: string }>({
      query: ({ userId, jobId }) => ({
        url: '/candidatures',
        method: 'GET',
        params: {
          userId,
          jobId,
        },
      }),
      providesTags: ['Candidature'],
    }),
    createCandidature: builder.mutation<void, { userId: string; jobId: string }>({
      query: ({ userId, jobId }) => ({
        url: '/candidatures',
        method: 'POST',
        data: {
          userId,
          jobId,
        },
      }),
      invalidatesTags: ['Candidature'],
    }),
    removeCandidature: builder.mutation<void, { candidatureId: string }>({
      query: ({ candidatureId }) => ({
        url: '/candidatures',
        method: 'DELETE',
        data: {
          candidatureId,
        },
      }),
      invalidatesTags: ['Candidature'],
    }),
    getLanguages: builder.query<[Language[], number], { name?: string }>({
      query: () => ({
        url: '/languages',
      }),
      providesTags: ['Language'],
    }),
    createLanguage: builder.mutation<Language, Pick<Language, 'name'>>({
      query: ({ name }) => ({
        url: '/languages',
        method: 'POST',
        data: {
          name,
        },
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useInactiveUserMutation,
  useRecoverUserMutation,
  useResetPasswordMutation,
  useRequestResetPasswordStepOneMutation,
  useRequestResetPasswordStepTwoMutation,
  useRequestResetPasswordStepThreeMutation,
  useRemoveUserMutation,
  useGetJobsQuery,
  useLazyGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useRemoveJobMutation,
  useGetCandidaturesQuery,
  useLazyGetCandidaturesQuery,
  useCreateCandidatureMutation,
  useRemoveCandidatureMutation,
  useGetLanguagesQuery,
  useLazyGetLanguagesQuery,
  useCreateLanguageMutation,
} = mainApi;
