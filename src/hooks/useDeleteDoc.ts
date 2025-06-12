import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/axios';

export const useDeleteDocument = () => {
  return useMutation({
    mutationFn: async (id_document: number) => {
      await api.delete(`/documentos/${id_document}`);
    },
    onSuccess: () => {
      toast.success('Documento excluído com sucesso.');
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Erro ao apagar documento.');
    },
  });
};
