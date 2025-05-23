import { useEditProfile } from '@/hooks/ed';
import React, { useState } from 'react';


export const EditProfile = () => {
  const [form, setForm] = useState({
    name_user: '',
    email_user: '',
    password_user: '',
  });

  const mutation = useEditProfile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name_user, email_user, password_user } = form;

    mutation.mutate({
      name_user,
      email_user,
      password_user: password_user.trim() === '' ? undefined : password_user,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

      <input
        type="text"
        name="name_user"
        placeholder="Nome"
        value={form.name_user}
        onChange={handleChange}
        className="block w-full mb-3 border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email_user"
        placeholder="Email"
        value={form.email_user}
        onChange={handleChange}
        className="block w-full mb-3 border p-2 rounded"
        required
      />

      <input
        type="password"
        name="password_user"
        placeholder="Nova senha (opcional)"
        value={form.password_user}
        onChange={handleChange}
        className="block w-full mb-3 border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
      </button>

      {mutation.isSuccess && (
        <p className="text-green-600 mt-2">Perfil atualizado com sucesso!</p>
      )}
      {mutation.isError && (
        <p className="text-red-600 mt-2">
          Erro: {(mutation.error as any).response?.data?.message || 'Erro ao atualizar'}
        </p>
      )}
    </form>
  );
};
