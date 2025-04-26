import { useEffect, useState } from "react";
import { Mobile } from "./menumobile";
import {
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";

import { EddUser } from "@/components/edduser_list_doc/edd_users";
import { Button } from "@/components/ui/button";
import {
  Delete,
  Edit,
  LoaderCircleIcon,
  Plus,
  UserCheck
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useFetch } from "@/api/useFetch";
import { Skeleton } from "@/components/ui/skeleton";



// Tipagem dos usuários
type Usuario = {
  id_user: number;
  name_user: string;
  email_user: string;
  role_user: string;
  
  
}

export function Dashboard_Admin_Users() {

  const {users, isFetching} = useFetch<Usuario> (`/list_users`)

  // Chamada da API no carregamento
  

  return (
    <>
      <Mobile />
      <div className="sm:ml-14 p-4">
        <section className="flex items-start justify-between flex-col lg:flex-row ">
          <div className="p-4">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Painel do admin
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
        {isFetching && <p className="flex items-center justify-center"> carregar....
            <LoaderCircleIcon className="animate-spin text-orange-600 w-11 h-11"/>
          </p> }
          {/* <div className="pt-9">
                                  <Skeleton className=" h-4 w-40"/> <br />
                                  <div className="flex gap-2 flex-col">
                                  <Skeleton className=" h-4 w-4"/>
                                  <Skeleton className=" h-10 w-32"/><br />
                                  <Skeleton className=" h-4 w-40"/> 
                                  </div> 
              </div> */}

        <Table className="text-nowrap border rounded-md">
          <TableHeader className="bg-orange-200">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Editar/Excluir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((usuario) => (
              <TableRow key={usuario.id_user} className="bg-gray-100">
                <TableCell className="capitalize">{usuario.name_user}</TableCell>
                <TableCell>{usuario.email_user}</TableCell>
                <TableCell>{usuario.role_user}</TableCell>
                <TableCell>
                  <Button className="bg-orange-400 hover:bg-orange-600 mr-2">
                    <Edit />
                  </Button>
                  <Button className=" bg-orange-400 hover:bg-orange-600">
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
