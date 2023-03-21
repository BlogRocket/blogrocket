import { axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export type RefreshAuthDTO = {
  refresh: string
}

export const refreshAuth = async (data: RefreshAuthDTO): Promise<AxiosResponse<{ access: string, refresh: string }>> => {
  return axios.post('/refresh', data);
}