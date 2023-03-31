
import { axios } from "@/lib/axios"
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";

export type GetPostsResponse = {
  posts: Post[];
  total: number;
  page: number;
}

export const getPosts = async (page = 1): Promise<GetPostsResponse> => {
  const request = await axios.get(`/post?page=${page}`) as GetPostsResponse;
  return request;
}

type QueryFnType = typeof getPosts;

type UsePostsOptions = {
  config?: QueryConfig<QueryFnType>;
  page?: number;
};

export const usePosts = ({ config, page = 1 }: UsePostsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
    keepPreviousData: true
  });
};