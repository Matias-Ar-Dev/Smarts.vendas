import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

type UpdateUploadDTO = {
  id_uploads: number
  original_name: string
  mime_type: string
}

export function useUpdateUpload() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id_uploads, original_name, mime_type }: UpdateUploadDTO) => {
      try {
        const response = await api.put(`/upload/${id_uploads}`, {
          originalname: original_name,
          mimetype: mime_type,
        })
        return response.data
      } catch (error) {
        throw new Error('Erro ao atualizar o upload: ' + error.message)
      }
    },
    onSuccess: () => {
      // Após o sucesso, invalida a query dos uploads e força uma nova busca
      queryClient.invalidateQueries({ queryKey: ['uploads'] })
    },
    onError: (error: any) => {
      console.error('Erro na atualização do upload:', error.message)
    }
  })
}
