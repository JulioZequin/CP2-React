import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../services/postService';
import { Post, CreatePostPayload } from '../types/post';

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: postService.getAll,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.slice(0, 20), // first 20
  });
};

export const useUserPosts = (userId: number) => {
  return useQuery<Post[], Error>({
    queryKey: ['posts', 'user', userId],
    queryFn: () => postService.getByUserId(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: postService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
