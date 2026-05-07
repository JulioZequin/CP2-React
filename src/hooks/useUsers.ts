import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { User } from '../types/user';

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: userService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
