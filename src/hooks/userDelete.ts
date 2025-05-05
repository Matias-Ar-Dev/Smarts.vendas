// src/hooks/useDeleteUser.ts
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { toast } from 'sonner'

export function useDeleteUser() {
  return useMutation({
    mutationFn: async (id_user: number) => {
      await api.delete(`/delete_user/${id_user}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      toast.success('Usuário apagado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao apagar o usuário.')
    },
  })
}
