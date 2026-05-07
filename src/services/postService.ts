import api from './api';
import { Post, CreatePostPayload } from '../types/post';

export const postService = {
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  getByUserId: async (userId: number): Promise<Post[]> => {
    const response = await api.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  },

  create: async (payload: CreatePostPayload): Promise<Post> => {
    const response = await api.post<Post>('/posts', payload);
    return response.data;
  },
};
