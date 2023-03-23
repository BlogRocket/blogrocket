import { axios } from "@/lib/axios";

export const logout = async (): Promise<void> => {
  return axios.delete('/logout');
}