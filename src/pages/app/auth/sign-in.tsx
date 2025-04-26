import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

// Função para extrair o payload do token
function getPayloadFromToken(token: string) {
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = atob(payloadBase64);
    return JSON.parse(payload);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export function Sign_in() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/login_users", {
        email_user: email,
        password_user: password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        const payload = getPayloadFromToken(token);
        const role = payload?.role_user;

        if (!role) {
          toast.error("Perfil de usuário desconhecido.");
          return;
        }

        localStorage.setItem("role", role);
        toast.success("Login realizado com sucesso!");

        setTimeout(() => {
          if (role === "admin") {
            navigate("/");
          } else if (role === "user") {
            navigate("/users_func");
          } else {
            toast.error("Perfil de usuário inválido.");
          }
        }, 1000);
      } else {
        toast.error("Credenciais inválidas. Verifique e tente novamente.");
      }
    } catch (error) {
      toast.error("Erro no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-[350px] flex flex-col justify-center gap-6"
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Painel de Acesso</h1>
        <p className="text-sm text-gray-500">Gerenciamento das Actividades</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="tracking-tighter">E-mail</Label>
        <Input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="tracking-tighter">A Sua Senha</Label>
        <Input
          type="password"
          placeholder="Digite a sua senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        className="bg-orange-500 hover:bg-orange-400 flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            Acessando... <Loader className="animate-spin w-4 h-4" />
          </>
        ) : (
          "Acessar"
        )}
      </Button>
    </form>
  );
}
