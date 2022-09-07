import { User } from '@/store/session/types';

export type SignInRequestResponse = {
  user: User;
  token: string;
};

export type SignInRequestParams = {
  username: string;
  password: string;
};
