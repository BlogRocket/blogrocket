
import { axios } from "@/lib/axios"
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";

export const getPost = async (id: string): Promise<Post> => {
  const request = await axios.get(`/post/${id}`) as any;
  return request.post;
}

type QueryFnType = typeof getPost;

type UsePostsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePost = (id: string, { config }: UsePostsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    keepPreviousData: true
  });
};