import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditProfile } from '@/hooks/profile_user';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { toast } from 'sonner';

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

    // Validação do email (somente @gmail.com ou @googlemail.com)
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|googlemail\.com)$/;
    const isValidEmail = gmailRegex.test(email_user);

    // Senha: permite vazio, mas se preencher, precisa ter no mínimo 8 caracteres
    const isPasswordValid = password_user.trim() === '' || password_user.length >= 8;

    if (!isValidEmail) {
      toast.error('O e-mail precisa ser um Gmail válido (ex: exemplo@gmail.com)');
      return;
    }

    if (!isPasswordValid) {
      toast.error('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    mutation.mutate(
      {
        name_user,
        email_user,
        password_user: password_user.trim() === '' ? undefined : password_user,
      },
      {
        onSuccess: () => {
          toast.success('Perfil atualizado com sucesso!');
          setForm({ name_user: '', email_user: '', password_user: '' });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Erro ao atualizar o perfil'
          );
        },
      }
    );
  };

  return (
    <section className="sm:ml-14 p-4 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[350px] flex flex-col justify-center gap-6">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

        <div className="flex flex-col gap-2">
          <Label className="tracking-tighter">Nome</Label>
          <Input
            type="text"
            name="name_user"
            placeholder="Nome"
            value={form.name_user}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="tracking-tighter">E-mail novo</Label>
          <Input
            type="email"
            name="email_user"
            placeholder="Email (ex: exemplo@gmail.com)"
            value={form.email_user}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="tracking-tighter">Senha nova</Label>
          <Input
            type="password"
            name="password_user"
            placeholder="Nova senha (opcional, min 8 caracteres)"
            value={form.password_user}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-300"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </section>
  );
};
