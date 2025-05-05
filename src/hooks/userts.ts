import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export type Usuario = {
  id_user: number;
  name_user: string;
  email_user: string;
  password_user: string;
}

type PaginatedResponse = {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  data: Usuario[];
}

export function useUsers(page: number) {
  return useQuery<PaginatedResponse>({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await api.get(`/list_users?page=${page}&limit=6`)
      return response.data
    },
  })
}
