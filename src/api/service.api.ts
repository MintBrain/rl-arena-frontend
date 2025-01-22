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

  async createCompetition(data: CreateCompetitionRequest): Promise<AxiosResponse<CreateCompetitionResponse>> {
    const formData = new FormData();

    // Append regular fields
    formData.append('name', data.name);
    formData.append('subtitle', data.subtitle);
    formData.append('url', data.url);
    formData.append('competitionType', data.competitionType);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('shortDescription', data.shortDescription);
    formData.append('detailedDescription', data.detailedDescription);
    formData.append('goals', data.goals);
    formData.append('rules', data.rules);
    formData.append('prizeAmount', data.prizeAmount.toString());
    formData.append('prizeInfo', data.prizeInfo || '');
    formData.append('tags', data.tags.join(','));

    // Append optional files
    if (data.backgroundImage) {
      formData.append('backgroundImage', data.backgroundImage);
    }
    if (data.documentation) {
      data.documentation.forEach((file) => {
        formData.append(`documentation`, file);
      });
    }
    if (data.rlPublicFiles) {
      data.rlPublicFiles.forEach((file) => {
        formData.append(`rlPublicFiles`, file);
      });
    }
    if (data.mlPublicDataset) {
      formData.append('mlPublicDataset', data.mlPublicDataset);
    }
    if (data.mlPrivateDataset) {
      formData.append('mlPrivateDataset', data.mlPrivateDataset);
    }

    // Append other fields
    formData.append('rlRepository', data.rlRepository);
    formData.append('rlSolutionExtension', data.rlSolutionExtension);
    formData.append('mlMetric', data.mlMetric);
    formData.append('mlTargetVariable', data.mlTargetVariable);
    formData.append('visibility', data.visibility);
    formData.append('participation', data.participation);


      return await axiosInstance.post('/api/competition', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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