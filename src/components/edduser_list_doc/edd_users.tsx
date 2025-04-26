import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";
import { Select } from "../ui/select";

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

  const createUserMutation = useMutation({
    mutationFn: async (newUser: {
      name_user: string;
      email_user: string;
      password_user: string;
      role_user: 'admin' | 'user';
    }) => {
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

  const handleCreateUser = () => {
    if (!newUser.name_user || !newUser.email_user || !newUser.password_user || !newUser.role_user) {
      toast.warn("Preencha todos os campos para adicionar um usuário.");
      return;
    }
    createUserMutation.mutate(newUser);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>cadastrar usuário</DialogTitle>
      </DialogHeader>
      <form>
        <div className="space-y-2">
          <div className="flex flex-col gap-3 mb-1">
            <Input className=""
              type="text"
              placeholder="Seu nome"
              value={newUser.name_user}
              onChange={(e) => setNewUser({ ...newUser, name_user: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Seu email"
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
              placeholder="Sua senha"
              value={newUser.password_user}
              onChange={(e) => setNewUser({ ...newUser, password_user: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse mt-4" onClick={handleCreateUser}>
          <Button className="bg-orange-500 hover:bg-orange-400">Cadastrar</Button>
        </div>
      </form>
    </DialogContent>
  );
}
