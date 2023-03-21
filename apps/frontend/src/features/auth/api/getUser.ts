import { axios } from "@/lib/axios";
import { User } from "../types";

export const getUser = async (): Promise<{ user: User }> => {
  return axios.get('/me');
}