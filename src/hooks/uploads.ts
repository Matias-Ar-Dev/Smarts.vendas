import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export type doc = {
  id_uploads: number;
  original_name: string;
  stored_name: string;
  file_path: string;
  mime_type: string;
  upload_date: string;
}

type PaginatedResponse = {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  data: doc[];
}

interface UseUploadsProps {
  page?: number;
  limit?: number;
}

export function useUploads({ page = 1, limit = 6 }: UseUploadsProps) {
  return useQuery<PaginatedResponse>({
    queryKey: ['uploads', page], // Identificador da query para os uploads
    queryFn: async () => {
      const response = await api.get('/uploads', {
        params: { page, limit } // Parâmetros de paginação
      })
      return response.data // Retorna a estrutura paginada
    },
    // Remover o keepPreviousData: true aqui
  })
}
