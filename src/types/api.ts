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
  email: string;
  date_registered: string;
  role: string;
  profile_image: string;
  country: string;
  company: string | undefined;
}