import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/axios";


export function Form() {
  const [formData, setFormData] = useState({
    name_user: "",
    email_user: "",
    password_user: "",
    role_user: "",
  });

  const token = localStorage.getItem("token");
  const user = token ? getPayloadFromToken(token) : null;
  const id_user = user?.id_user;

  useEffect(() => {
    if (user) {
      setFormData({
        name_user: user.name_user,
        email_user: user.email_user,
        password_user: "",
        role_user: user.role_user,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/edit_user/${id_user}`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      toast.success("Usuário atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar usuário.");
    }
  };

  if (!user) return <p>Carregando dados do usuário...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
      <Input
        name="name_user"
        value={formData.name_user}
        onChange={handleChange}
        placeholder="Nome"
      />
      <Input
        name="email_user"
        value={formData.email_user}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />
      <Input
        name="password_user"
        value={formData.password_user}
        onChange={handleChange}
        placeholder="Nova Senha (opcional)"
        type="password"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white">
        Atualizar Dados
      </Button>
    </form>
  );
}
function getPayloadFromToken(token: string) {
    throw new Error("Function not implemented.");
}

