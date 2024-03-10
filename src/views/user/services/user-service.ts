import type { BaseModel } from "@/models/base-model";
import type { UserModel } from "../models/user-model";
import axios from "../../../common/axios";

export const login = (data: UserModel): Promise<BaseModel<UserModel>> => {
  return axios.post("user/login", data);
};

export const getUserList = (
  data?: UserModel
): Promise<BaseModel<UserModel[]>> => {
  return axios.get("user/getusers", { params: data });
};

export const getUserInfo = (): Promise<BaseModel<UserModel>> => {
  return axios.get("user/getUserInfo");
};

export const register = (data: UserModel): Promise<BaseModel<UserModel>> => {
  return axios.post("user/register", data);
};

export const updateUser = (data: UserModel): Promise<BaseModel<UserModel>> => {
  return axios.post("user/updateUser", data);
};

export const uploadUserImage = (
  data: FormData
): Promise<BaseModel<UserModel>> => {
  return axios.post("user/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    },
  });
};
