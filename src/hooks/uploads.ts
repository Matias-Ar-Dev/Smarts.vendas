import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'



interface UseUploadsProps {
  page?: number;
  limit?: number;
}


type Document = {
  id_document: number;
  name_document: string;
  path_document: string;
  role_document: string;
  document_size: string;
  data_create: string;
  categoria_document: string;
};

type DocumentResponse = {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  data: Document[];
};


export function useUploads({ page = 1, limit = 6 }: UseUploadsProps) {
  return useQuery<DocumentResponse>({
    queryKey: ['uploads', page], // Identificador da query para os uploads
    queryFn: async () => {
      const response = await api.get('/documentos', {
        params: { page, limit } // Parâmetros de paginação
      })
      return response.data // Retorna a estrutura paginada
    },
    placeholderData: keepPreviousData,
    
  })
}
