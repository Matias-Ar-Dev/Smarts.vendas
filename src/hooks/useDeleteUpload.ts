import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner"; // Importa o Sonner para notificações

export function useDeleteUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id_uploads: number) => {
      const response = await api.delete(`/upload/${id_uploads}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Arquivo excluído com sucesso!"); // Notificação de sucesso
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    },
    onError: () => {
      toast.error("Erro ao excluir o arquivo."); // Notificação de erro
    },
  });
}
