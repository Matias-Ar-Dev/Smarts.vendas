// src/hooks/useUserCount.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useUserCount() {
  return useQuery({
    queryKey: ['userCount'],
    queryFn: async () => {
      const response = await api.get('/count_users') // Chama o novo endpoint
      return response.data.totalUsers
    },
  })
}
