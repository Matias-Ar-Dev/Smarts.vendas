// src/hooks/total_by_category.js
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";


export function useDocumentsByCategory() {
  return useQuery({
    queryKey: ["documentsByCategory"],
    queryFn: async () => {
      const { data } = await api.get("/total_por_categoria");
      return data; // [{categoria: 'cliente', total: 8}, {categoria: 'empresa', total: 12}]
    },
  });
}
