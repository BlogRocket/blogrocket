import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

type RevokeTokenDTO = {
  _id: string;
}

export const revokeToken = (data: RevokeTokenDTO): Promise<any> => {
  return axios.delete(`/token/${data._id}`);
}

type UseRevokeTokenOptions = {
  config?: MutationConfig<typeof revokeToken>;
}

export const useRevokeToken = ({ config }: UseRevokeTokenOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries('tokens');
    },
    ...config,
    mutationFn: revokeToken
  })
}