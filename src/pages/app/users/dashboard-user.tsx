import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Mobile_user } from "./menuMobile";
import { Archive, Dock, DockIcon} from "lucide-react";
import Doc from "@/components/edduser_list_doc/doclist";
export function Dashboard_user (){
    return (
        <>
        <Mobile_user/>
        <div  className="sm:ml-14 p-4">
             <section className="flex items-start justify-between flex-col lg:flex-row ">
                      <div className="p-4">
                        <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                          Painel de actividades
                        </CardTitle>
                        <span className="text-zinc-500">
                          Gestão e controle de todas as actividades na plataforma
                        </span>
                      </div>
                      <div className=" flex items-center justify-between gap-4 p-4 ">
                        <Dialog>
                          <DialogTrigger asChild>
                          
                          </DialogTrigger>
                          
                        </Dialog>
                      </div>
                    </section>

  <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Total de Documentos da Empresa{" "}
                </CardTitle>
                <Archive className="ml-auto w-4 h-4" />
              </div>
              <CardDescription>Registado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold ">720</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Total de Documentos Internos
                </CardTitle>
                <Archive className="ml-auto w-4 h-4 " />
              </div>
              <CardDescription>Registado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold ">234</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Total de Documento Externo
                </CardTitle>
                <Archive className="ml-auto w-4 h-4 " />
              </div>
              <CardDescription>Registado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold ">1000 </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Gerar Relatório PFD
                </CardTitle>
                <Dock className="ml-auto w-4 h-4 " />
              </div>
              <CardDescription>Relatório geral da Empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold ">
                <Button className="bg-orange-500 hover:bg-orange-400">
                  Criar <DockIcon />
                </Button>
              </p>
            </CardContent>
          </Card>
        </section>
           <section className="mt-4 flex flex-col md:flex-row gap-4">
                  <Doc/>
                  
                </section>

        </div>
        </>
    )
}