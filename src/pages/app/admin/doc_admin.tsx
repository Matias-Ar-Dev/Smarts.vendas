import { CardTitle } from "@/components/ui/card";
import { Mobile } from "./menumobile";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Archive, ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUploads } from "@/hooks/uploads";
import CreateUploadForm, { EddUploads, UploadForm } from "@/components/edduser_list_doc/edd_upload";

export function Dashboard_admin_doc() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUploads({ page, limit: 5 });
  const uploads = data?.data ?? [];
  const lastPage = data?.lastPage ?? 1;

  const handleNextPage = () => {
    if (page < lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Mobile />
      <section className="sm:ml-14 p-4">
        <section className="flex items-start justify-between flex-col lg:flex-row">
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
                  <Archive />
                  Adicionar Arquivo
                </Button>
              </DialogTrigger>
              <CreateUploadForm/>
            </Dialog>
          </div>
        </section>

        <Table className="text-nowrap border rounded-md">
          <TableHeader className="bg-orange-200">
            <TableRow>
              <TableHead>Nome do Arquivo</TableHead>
              <TableHead>Extensão do Arquivo</TableHead>
              <TableHead>Data do Arquivo</TableHead>
              <TableHead>Editar/Excluir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>Carregando...</TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={4}>Erro ao carregar dados.</TableCell>
              </TableRow>
            )}
            {uploads.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={4}>Nenhum documento encontrado.</TableCell>
              </TableRow>
            )}
            {uploads.map((doc) => (
              <TableRow key={doc.id_uploads} className="bg-gray-100">
                <TableCell className="capitalize">{doc.original_name}</TableCell>
                <TableCell>{doc.stored_name}</TableCell>
                <TableCell>
                  {new Date(doc.upload_date).toLocaleDateString("pt-AO")}
                </TableCell>
                <TableCell>
                  <Button className="bg-orange-400 hover:bg-orange-500 mr-2">
                    <Edit />
                  </Button>
                  <Button className="bg-orange-400 hover:bg-orange-500">
                    <Trash2 className="text-red-500 font-bold" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Controles de Navegação */}
        <div className="flex justify-between mt-4">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1 || isLoading}
            className=" bg-orange-500 hover:bg-orange-300"
          >
            <ChevronLeft/>
            Anterior
          </Button>
          <span className="text-sm text-gray-500 mt-2">
            Página {page} de {lastPage}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={page === lastPage || isLoading}
            className=" bg-orange-500 hover:bg-orange-300"
          >
            <ChevronRight/>
            Próxima
          </Button>
        </div>
      </section>
    </>
  );
}
