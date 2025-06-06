// src/components/edit_doc/EditDocumento.tsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogContent } from '../ui/dialog';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

interface EditDocumentoProps {
  document: {
    id_document: number;
    name_document: string;
    role_document: string;
  };
}

const EditDocumento = ({ document }: EditDocumentoProps) => {
  const [name, setName] = useState(document.name_document);
  const [role, setRole] = useState(document.role_document);
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.put(
        `/documentos/${document.id_document}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['documents']);
      toast.success('📝 Documento editado com sucesso!');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || ' Erro ao editar documento.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name_document', name);
    formData.append('role_document', role);
    if (file) {
      formData.append('arquivo', file);
    }

    mutation.mutate(formData);
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
        <h2 className="text-lg font-bold">Editar Documento</h2>

        <input
          type="text"
          placeholder="Nome do Documento"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione o tipo de papel</option>
          <option value="empresa">Empresa</option>
          <option value="cliente">Cliente</option>
        </select>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />

        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`w-full px-4 py-2 rounded text-white transition ${
            mutation.isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {mutation.isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </DialogContent>
  );
};

export default EditDocumento;
