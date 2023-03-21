import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export type CreateTokenDTO = {
  name: string;
  expires: string;
}

export const createToken = (data: CreateTokenDTO): Promise<any> => {
  return axios.post('/token', data);
}

type UseCreateTokenOptions = {
  config?: MutationConfig<typeof createToken>;
}

export const useCreateToken = ({ config }: UseCreateTokenOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries('tokens');
    },
    ...config,
    mutationFn: createToken
  })
}