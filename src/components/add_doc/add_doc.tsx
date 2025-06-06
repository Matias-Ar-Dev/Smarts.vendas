import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogContent } from '../ui/dialog';
import { toast } from 'sonner'; 
import { api } from '@/lib/axios';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const uploadDocument = async (formData: FormData) => {
  const res = await api.post('/documentos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const Documento = () => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const resetForm = () => {
    setFile(null);
    setName('');
    setRole('');
  };

  const mutation = useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Documento enviado com sucesso!'); 
      resetForm();
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Erro ao enviar documento.';
      toast.error(`❌ ${message}`); // ✅ Erro
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !name.trim() || !role) {
      toast.warning('Preencha todos os campos corretamente.'); 
      return;
    }

    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('name_document', name.trim());
    formData.append('role_document', role);

    mutation.mutate(formData);
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-md">
        <h2 className="text-lg font-bold">Enviar Documento</h2>

        <Input
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
          required
        />

        <Button 
          type="submit"
          disabled={mutation.isLoading}
          className={`w-full px-4 py-2 rounded text-white transition ${
            mutation.isLoading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-400'
          }`}
        >
          {mutation.isLoading ? 'Enviando documento...' : 'Enviar documento'}
        </Button>
      </form>
    </DialogContent>
  );
};

export default Documento;
