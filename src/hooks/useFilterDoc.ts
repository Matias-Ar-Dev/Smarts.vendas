import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

type Document = {
  id_document: number;
  name_document: string;
  path_document: string;
  role_document: string;
  document_size: string;
  data_create: string;
};

export const useFilterDocuments = (enabled: boolean, name: string) => {
  return useQuery<Document[]>({
    queryKey: ['filter-documents', name],
    queryFn: async () => {
      const response = await api.get('/filter_documentos', {
        params: { name_document: name },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` || '',
        },
      });
      return response.data;
    },
    enabled,
  });
};
