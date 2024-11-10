import axiosInstance from "./axiosConfig.ts";
import {
  LoginRequest,
  LoginResponse,
  RegisterCodeRequest,
  RegisterRequest,
  RegisterResponse,
  ResendRegisterCodeRequest,
  RestorePasswordCodeRequest,
  RestorePasswordCodeResendRequest,
  RestorePasswordEmailRequest,
  RestorePasswordEmailResponse, RestorePasswordNewPasswordRequest
} from "../types/api.ts";
import { AxiosResponse } from "axios";
import { data } from "autoprefixer";


const api = {
  async login(data: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return await axiosInstance.post("/api/login", data);
  },

  async logout(): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("/api/logout", data);
  },

  async register(data: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> {
    return await axiosInstance.post("/api/register", data);
  },

  async resendRegistrationCode(data: ResendRegisterCodeRequest): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("/api/register/resendCode", data);
  },

  async checkRegistrationCode(data: RegisterCodeRequest): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("/api/register/check", data);
  },

  async checkRestorePasswordEmail(data: RestorePasswordEmailRequest): Promise<AxiosResponse<RestorePasswordEmailResponse>> {
    return await axiosInstance.post("/api/restore/email", data);
  },

  async resendRestoreCode(data: RestorePasswordCodeResendRequest): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("/api/restore/resendCode", data);
  },

  async checkRestorePasswordCode(data: RestorePasswordCodeRequest): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("/api/restore/check", data);
  },

  async restorePasswordNewPassword(data: RestorePasswordNewPasswordRequest): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("/api/restore/password", data);
  },


}

export default api;