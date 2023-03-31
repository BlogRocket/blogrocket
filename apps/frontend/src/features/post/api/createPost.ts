import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { Post } from "../types";

export type CreatePostDTO = {
  title: string;
  body: string;
}

export const createPost = async (data: CreatePostDTO): Promise<Post> => {
  const response = await axios.post('/post', data) as any;
  return response.post;
}

type UseCreatePostOptions = {
  config?: MutationConfig<typeof createPost>;
}

export const useCreatePost = ({ config }: UseCreatePostOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries('posts');
    },
    ...config,
    mutationFn: createPost
  })
}