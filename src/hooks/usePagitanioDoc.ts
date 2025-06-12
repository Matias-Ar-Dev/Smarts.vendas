// src/hooks/useFetchDocuments.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export type Document = {
  id_document: number;
  name_document: string;
  path_document: string;
  role_document: string;
  document_size: string;
  data_create: string;
};

type DocumentResponse = {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  data: Document[];
};

const fetchDocuments = async (page: number, limit = 6): Promise<DocumentResponse> => {
  const response = await api.get(`/documentos?page=${page}&limit=${limit}`);
  return response.data;
};

export const usePaginationDocuments = (page: number, limit = 6) => {
  return useQuery<DocumentResponse>({
    queryKey: ['documents', page],
    queryFn: () => fetchDocuments(page, limit),
    placeholderData: keepPreviousData,
  });
};
