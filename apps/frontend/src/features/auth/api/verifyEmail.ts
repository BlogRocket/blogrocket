import { axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export type VerifyEmailDTO = {
  email: string
}

export const verifyEmail = async (data: VerifyEmailDTO): Promise<AxiosResponse<{ status: string }>> => {
  return axios.post('/verify', data);
}