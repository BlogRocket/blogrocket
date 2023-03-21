import { axios } from "@/lib/axios";
import { UserResponse } from "../types";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
}

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/login', data);
}