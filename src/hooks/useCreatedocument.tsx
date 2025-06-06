import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/axios';

type CreateDocumentData = {
  name_document: string;
  file: File;
  role_document: string;
  categoria_document: string;
};

export function useCreateDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDocument = async (data: CreateDocumentData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name_document', data.name_document);
      formData.append('file', data.file);
      formData.append('role_document', data.role_document);
      formData.append('categoria_document', data.categoria_document);

      const response = await api.post('/documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Documento criado com sucesso!');
      setLoading(false);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erro ao criar documento';
      toast.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      throw err;
    }
  };

  return { createDocument, loading, error };
}
