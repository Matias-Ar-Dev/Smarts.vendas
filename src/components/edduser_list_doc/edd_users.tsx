import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

type Usuario = {
  id_user: number;
  name_user: string;
  email_user: string;
  password_user: string;
  role_user: 'admin' | 'user';
};

export function EddUser() {
  const queryClient = useQueryClient();

  const [newUser, setNewUser] = useState({
    name_user: '',
    email_user: '',
    role_user: 'user', // valor padrão
    password_user: '',
  });

  // Função de validação dos campos
  const validateFields = () => {
    const { name_user, email_user, password_user, role_user } = newUser;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Validação de campos obrigatórios
    if (!name_user || !email_user || !password_user || !role_user) {
      toast.warn("Preencha todos os campos para adicionar um usuário.");
      return false;
    }

    // Validação de senha
    if (password_user.length < 8) {
      toast.warn("A senha deve conter pelo menos 8 caracteres.");
      return false;
    }

    // Validação de email
    if (!gmailRegex.test(email_user)) {
      toast.warn("O email deve ser um endereço válido do Gmail (ex: exemplo@gmail.com).");
      return false;
    }

    return true; // Se todas as validações passaram
  };

  // Função de criação de usuário
  const createUserMutation = useMutation({
    mutationFn: async (newUser: Usuario) => {
      await api.post('/create_users', newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success("Usuário adicionado com sucesso!");
      setNewUser({
        name_user: '',
        email_user: '',
        role_user: 'user',
        password_user: '',
      });
    },
    onError: () => {
      toast.error('Erro ao adicionar o usuário.');
    },
  });

  // Função que lida com o envio do formulário
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o envio do formulário

    if (validateFields()) {
      createUserMutation.mutate(newUser); // Chama a mutação se a validação passar
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastrar usuário</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleCreateUser}>
        <div className="space-y-2">
          <div className="flex flex-col gap-3 mb-1">
            <Input
              type="text"
              placeholder="Seu nome"
              value={newUser.name_user}
              onChange={(e) => setNewUser({ ...newUser, name_user: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Seu email (Gmail)"
              value={newUser.email_user}
              onChange={(e) => setNewUser({ ...newUser, email_user: e.target.value })}
            />
            <select
              value={newUser.role_user}
              onChange={(e) => setNewUser({ ...newUser, role_user: e.target.value as 'admin' | 'user' })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="admin">Administrador</option>
              <option value="user">Funcionário</option>
            </select>
            <Input
              type="password"
              placeholder="Sua senha (mínimo 8 caracteres)"
              value={newUser.password_user}
              onChange={(e) => setNewUser({ ...newUser, password_user: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse mt-4">
          <Button className="bg-orange-500 hover:bg-orange-400" type="submit">
            Cadastrar
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
