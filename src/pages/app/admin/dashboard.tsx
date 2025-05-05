import { useEffect, useState } from "react";
import Logo from "../../../assets/teste.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Archive, Dock, DockIcon, Plus, UserCheck, Users2Icon } from "lucide-react";
import { Mobile } from "./menumobile";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EddUser } from "@/components/edduser_list_doc/edd_users";
import Doc from "@/components/edduser_list_doc/doclist";
import Users from "@/components/edduser_list_doc/users";
import { useUserCount } from "@/hooks/total_user";

export function Dashboard_Admin() {
  const [userName, setUserName] = useState("");
  const{data} = useUserCount()

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    if (name) setUserName(name);
  }, []);


  return (
    <>
      <Mobile />

      <div className="sm:ml-14 p-4">
        <section className="flex items-start justify-between flex-col lg:flex-row">
          <div className="p-4">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Painel do admin{" "}
              {userName && <span className="text-orange-500">({userName})</span>}
            </CardTitle>
            <span className="text-zinc-500">
              Gestão e controle de todas as actividades na plataforma
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-400">
                  <Plus className="h-4 w-4" />
                  <UserCheck />
                  Adicionar func
                </Button>
              </DialogTrigger>
              <EddUser />
            </Dialog>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Total de Documentos da Empresa
                </CardTitle>
                <Archive className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Registado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">720</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Total de Documentos Internos
                </CardTitle>
                <Archive className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Registado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">234</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Total de usuários 
                </CardTitle>
                <Users2Icon className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Registado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">{data}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Gerar Relatório PDF
                </CardTitle>
                <Dock className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Relatório geral da Empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-orange-500 hover:bg-orange-400">
                Criar <DockIcon />
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-4 flex flex-col md:flex-row gap-4">
          <Doc />
          <Users />
        </section>
      </div>
    </>
  );
}
