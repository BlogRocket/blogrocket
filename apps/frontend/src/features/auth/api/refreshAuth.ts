import { axios } from "@/lib/axios";

export type RefreshAuthDTO = {
  refresh: string
}

export const refreshAuth = async (data: RefreshAuthDTO): Promise<{ access: string, refresh: string }> => {
  return axios.post('/refresh', data);
}