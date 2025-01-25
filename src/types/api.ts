export type LoginRequest = {
  username: string;
  password: string;
}

export type LoginResponse = {
  access_token: string;
  token_type: string;
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
}

export type RegisterResponse = {
  access_token: string;
}

export type ResendRegisterCodeRequest = {
  email: string;
}

export type RegisterCodeRequest = {
  email: string;
  verificationCode: number;
}

export type RestorePasswordEmailRequest = {
  email: string;
}

export type RestorePasswordEmailResponse = {
  restoreToken: string;
}

export type RestorePasswordCodeResendRequest = {
  email: string;
  restoreToken: string;
}

export type RestorePasswordCodeRequest = {
  email: string;
  restoreToken: string;
  restoreCode: number;
}

export type RestorePasswordNewPasswordRequest = {
  email: string;
  password: string;
  restoreToken: string;
}

export type GetMeResponse = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  date_registered: string;
  role: string;
  profile_image: string;
  country: string;
  company: string | undefined;
}

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  password?: string;
  country?: string;
  company?: string;
  profile_image?: File | null;
}

export type CreateCompetitionRequest = {
  name: string;
  subtitle: string;
  url: string;
  competitionType: string;
  startDate: string;
  endDate: string;
  backgroundImage?: File | null;

  shortDescription: string;
  detailedDescription: string;
  goals: string;
  rules: string;
  prizeAmount: number;
  prizeInfo?: string;
  documentation?: File[] | null;
  tags: string[];

  rlRepository?: string;
  rlSolutionExtension?: string;
  rlPublicFiles?: File[] | null;

  mlMetric?: string;
  mlTargetVariable?: string;
  mlPublicDataset?: File | null;
  mlPrivateDataset?: File | null;

  visibility: string;
  participation: string;
}

export type CreateCompetitionResponse = {
  id: number;
  message: string;
  url: string;
}

export type User = {
  id: number;
  username: string;
  fullName: string;
  profileImage: string;
}

export type CompetitionData = {
  id: number;
  author: User;

  name: string;
  subtitle: string;
  url: string;
  competitionType: string;
  startDate: string;
  endDate: string;
  backgroundImage?: string; // Url

  shortDescription: string;
  detailedDescription: string;
  goals: string;
  rules: string;
  prizeAmount: number;
  prizeInfo?: string;
  documentation?: string[]; // Urls list
  tags: string[];

  rlRepository?: string; // Site url
  rlSolutionExtension?: string;
  rlPublicFiles?: string[]; // Urls list

  mlMetric?: string;
  mlTargetVariable?: string;
  mlPublicDataset?: string; // Url
  mlPrivateDataset?: string[]; // Url

  visibility: string;
  participation: string;
  creationDate: string;
}