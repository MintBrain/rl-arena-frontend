import axiosInstance from "./axiosConfig.ts";
import {
  GetMeResponse,
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


const api = {
  async login(data: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    const urlEncodedData = new URLSearchParams({
      grant_type: "",
      username: data.username,
      password: data.password,
      scope: "",
      client_id: "",
      client_secret: "",
    });

    return await axiosInstance.post("/api/token", urlEncodedData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  async logout(): Promise<AxiosResponse<void>> {
    return await axiosInstance.post("/api/logout");
  },

  async getMe(): Promise<AxiosResponse<GetMeResponse>> {
    return await axiosInstance.get("/api/users/me");
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