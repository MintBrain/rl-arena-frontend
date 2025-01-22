import axiosInstance from "./axiosConfig.ts";
import {
  CreateCompetitionRequest, CreateCompetitionResponse,
  GetMeResponse,
  LoginRequest,
  LoginResponse,
  RegisterCodeRequest,
  RegisterRequest,
  ResendRegisterCodeRequest,
  RestorePasswordCodeRequest,
  RestorePasswordCodeResendRequest,
  RestorePasswordEmailRequest,
  RestorePasswordEmailResponse, RestorePasswordNewPasswordRequest, UpdateUserRequest
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

  async register(data: RegisterRequest): Promise<AxiosResponse<LoginResponse>> {
    const urlEncodedData = new URLSearchParams({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return await axiosInstance.post("/api/users", urlEncodedData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  async updateUser(data: UpdateUserRequest): Promise<AxiosResponse<void>> {
    const formData = new FormData();

    if (data.username) formData.append("username", data.username);
    if (data.email) formData.append("email", data.email);
    if (data.password) formData.append("password", data.password);
    if (data.country) formData.append("country", data.country);
    if (data.company) formData.append("company", data.company);
    if (data.profile_image) formData.append("profile_image", data.profile_image);

    return await axiosInstance.patch("/api/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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