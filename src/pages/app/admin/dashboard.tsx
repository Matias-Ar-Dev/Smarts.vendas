import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Archive, Plus, UserCheck, Users2Icon } from "lucide-react";
import { Mobile } from "./menumobile";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EddUser } from "@/components/edduser_list_doc/edd_users";
import Doc from "@/components/edduser_list_doc/doclist";
import Users from "@/components/edduser_list_doc/users";
import { useUserCount } from "@/hooks/total_user";
import { useDocumentCount } from "@/hooks/total_documentos";
import { useDocumentsByCategory } from "@/hooks/total_role_documents";



export function Dashboard_Admin() {
  const{data} = useUserCount()
  const {data: totalDocs} = useDocumentCount()
  const {data: totalDocsRole} = useDocumentsByCategory()
  const totalCliente = totalDocsRole?.find(item => item.categoria === 'cliente')?.total || 0;
  const totalEmpresa = totalDocsRole?.find(item => item.categoria === 'empresa')?.total || 0;

  


  return (
    <>
      <Mobile />

      <div className="sm:ml-14 p-4">
        <section className="flex items-start justify-between flex-col lg:flex-row">
          <div className="p-4">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Painel do admin
            </CardTitle>

            
            
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
            <p className="text-base sm:text-lg font-bold">
  {totalDocs !== undefined ? totalDocs : '...'}
</p>

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
              <p className="text-base sm:text-lg font-bold">{totalEmpresa}</p>
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
                  Total de Documento dos clientes
                </CardTitle>
                <Archive className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Registado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">{totalCliente}</p>
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
