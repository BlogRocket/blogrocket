import { axios } from "@/lib/axios";
import { UserResponse } from "../types";

export type RegisterCredentialsDTO = {
  code: string;
  email: string;
  password: string;
}

export const registerWithEmailAndPassword = async (data: RegisterCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/signup', data);
}