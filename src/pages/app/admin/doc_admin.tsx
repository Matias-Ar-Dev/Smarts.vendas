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
import CreateUploadForm from "@/components/edduser_list_doc/edd_upload";
import { useDeleteUpload } from "@/hooks/useDeleteUpload";

import { Toaster } from "sonner";
import { useUpdateUpload } from "@/hooks/updadeUpload";
import { Helmet } from "react-helmet-async";

export function Dashboard_admin_doc() {
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar a edição
  const [editData, setEditData] = useState({ id_uploads: 0, original_name: "", mime_type: "" }); // Dados para edição

  const { data, isLoading, isError } = useUploads({ page, limit: 5 });
  const uploads = data?.data ?? [];
  const lastPage = data?.lastPage ?? 1;

  const { mutate: deleteUpload, isLoading: isDeleting } = useDeleteUpload();
  const { mutate: updateUpload, isLoading: isUpdating } = useUpdateUpload(); // Hook de atualização

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

  const handleEdit = (doc: any) => {
    setIsEditing(true);
    setEditData({ id_uploads: doc.id_uploads, original_name: doc.original_name, mime_type: doc.mime_type });
  };

  const handleSaveEdit = () => {
    updateUpload(editData); // Atualiza o upload com os novos dados
    setIsEditing(false);
  };

  return (
    <>
      <Mobile />
      <section className="sm:ml-14 p-4">
        
        <Toaster richColors position="top-right" /> {/* Sonner ativado */}
        <section className="flex items-start justify-between flex-col lg:flex-row">
          <div className="p-4">
            <CardTitle className="text-lg sm:text-xl  text-gray-800 select-none">
              Painel do admin
            </CardTitle>
            <span className="text-zinc-500">
              Gestão e controle de todas as atividades na plataforma
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
              <CreateUploadForm />
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
                  <Button
                    onClick={() => handleEdit(doc)} // Inicia a edição
                    className="bg-orange-400 hover:bg-orange-500 mr-2"
                  >
                    <Edit />
                  </Button>
                  <Button
                    onClick={() => { deleteUpload(doc.id_uploads); }}
                    className="bg-orange-400 hover:bg-orange-500"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "..." : <Trash2 className="text-red-500 font-bold" />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Controles de Navegação */}
        <div className="flex justify-end mt-4">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1 || isLoading}
            className=" bg-orange-500 hover:bg-orange-300"
          >
            <ChevronLeft />
          </Button>
          <span className="text-sm text-gray-500 mt-2">
            Página {page} de {lastPage}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={page === lastPage || isLoading}
            className=" bg-orange-500 hover:bg-orange-300"
          >
            <ChevronRight />
          </Button>
        </div>

        {/* Dialog de Edição */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-400">
              Editar Documento
            </Button>
          </DialogTrigger>
          <div className="p-4">
            <h2 className="text-lg font-bold">Editar Documento</h2>
            <input
              type="text"
              value={editData.original_name}
              onChange={(e) => setEditData({ ...editData, original_name: e.target.value })}
              className="w-full p-2 mt-2 border rounded-md"
              placeholder="Novo nome do arquivo"
            />
            <input
              type="text"
              value={editData.mime_type}
              onChange={(e) => setEditData({ ...editData, mime_type: e.target.value })}
              className="w-full p-2 mt-2 border rounded-md"
              placeholder="Novo tipo MIME"
            />
            <Button
              onClick={handleSaveEdit} // Salva as alterações
              className="bg-green-500 hover:bg-green-400 mt-4"
              disabled={isUpdating}
            >
              {isUpdating ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </Dialog>
      </section>
    </>
  );
}
