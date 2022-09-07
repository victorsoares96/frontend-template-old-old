export enum UserStatus {
  Deleted = 2,
  Active = 1,
  Inactive = 0,
}

export enum UserType {
  Developer = 1,
  Business = 2,
}

export type Language = {
  id: number;
  name: string;
  createdAt: string;
};

export type InitialSessionState = {
  user: User | null;
  token: string | null;
  authenticated: boolean;
};

export type User = {
  id: number;
  name: string;
  cpf: string | null;
  cnpj: string | null;
  socialName: string | null;
  socialReason: string | null;
  email: string;
  professionalExperiences: string | null;
  contact: string;
  status: UserStatus;
  type: UserType;
  createdAt: string;
  updatedAt: string;
  deletionDate: string | null;
  lastAccess: string | null;
  username: string;
  languages: Language[];
};

export type Session = {
  token: string;
  authenticated: boolean;
  user: User;
};

export type SignInRequestResponse = {
  user: User;
  token: string;
};

export type SignInRequestParams = {
  username: string;
  password: string;
};
