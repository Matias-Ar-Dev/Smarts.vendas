import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';


export function useDocumentCount() {
  return useQuery({
    queryKey: ['documentCount'],
    queryFn: async () => {
      const response = await api.get('/total_documentos');
      return response.data.total;
    }
  });
}
