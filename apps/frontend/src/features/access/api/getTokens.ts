
import { axios } from "@/lib/axios"
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { Token } from "../types";

export const getTokens = async (): Promise<Token[]> => {
  return axios.get("/token");
}

type QueryFnType = typeof getTokens;

type UseTokensOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTokens = ({ config }: UseTokensOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tokens'],
    queryFn: () => getTokens(),
  });
};