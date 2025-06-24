import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import UploadForm from '@/components/add_doc/add_doc';
import EditDocumento from '@/components/add_doc/editar_doc';
import { useCreateDocument } from '@/hooks/useCreatedocument';
import { useDeleteDocument } from '@/hooks/useDeleteDoc';
import { Mobile_user } from '../menuMobile';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/axios';
import { usePaginationDocuments } from '@/hooks/usePagitanioDoc';
import { useFilterDocuments } from '@/hooks/useFilterDoc';


type Document = {
  id_document: number;
  name_document: string;
  path_document: string;
  role_document: string;
  document_size: string;
  data_create: string;
  categoria_document: string;
};

const Document_List_User = () => {
  const [page, setPage] = useState(1);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEnabled, setFilterEnabled] = useState(false);

  const { createDocument, loading: creating, error: createError } = useCreateDocument();
  const { mutate: deleteDocument, isPending: deleting } = useDeleteDocument();

  const { data, isLoading, isError, refetch } = usePaginationDocuments(page);
  const { data: filteredDocs, isFetching: searching } = useFilterDocuments(filterEnabled, searchTerm);

  const docsToShow = filterEnabled && filteredDocs ? filteredDocs : data?.data || [];

  const handleDelete = (id_document: number) => {
    deleteDocument(id_document, {
      onSuccess: () => {
        toast.success("Documento excluído com sucesso.");
        refetch();
      },
      onError: () => {
        toast.error("Erro ao excluir documento.");
      }
    });
  };

  const handleDownload = async (id: number, filename: string) => {
    try {
      const response = await api.get(`/documentos/download/${id}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Download iniciado');
    } catch (error) {
      console.error('Erro ao baixar o documento:', error);
      toast.error('Erro ao baixar o documento');
    }
  };

  const formatSize = (sizeInBytes: string) => {
    const size = parseInt(sizeInBytes, 10);
    if (isNaN(size)) return sizeInBytes;
    if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
    if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
    return size + ' bytes';
  };

  const nextPage = () => {
    if (data?.lastPage && page < data.lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setFilterEnabled(true);
    } else {
      setFilterEnabled(false);
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar documentos.</p>;

  return (
    <section>
      <Mobile_user />
      <div className="sm:ml-14 p-4">
        <header className="flex items-start justify-between flex-col lg:flex-row">
          <div className="p-4">
            <h2 className="text-lg sm:text-xl text-gray-800 select-none">
              Painel de actividades
            </h2>
            <span className="text-zinc-500">
              Gestão e controle de todas as actividades na plataforma
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-orange-600 hover:bg-orange-400' disabled={creating}>
                  {creating ? 'Enviando documento...' : 'Adicionar Documento'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Documento</DialogTitle>
                </DialogHeader>
                <UploadForm
                  onSubmit={async (formData) => {
                    try {
                      await createDocument(formData);
                      toast.success('Documento criado com sucesso!');
                      refetch();
                    } catch {
                      toast.error('Erro ao criar documento');
                    }
                  }}
                />
                {createError && <p className="text-red-600 mt-2">{createError}</p>}
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="space-y-4">
          <Card className="flex items-center p-2 gap-2">
            <Input
            className=''
              placeholder="Pesquisar por documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              className="bg-orange-600 hover:bg-orange-400"
              onClick={handleSearch}
              disabled={searching}
            >
              <Search className="w-4 h-4 mr-1" />
              {searching ? 'Buscando...' : 'Pesquisar'}
            </Button>
          </Card>

          {docsToShow.map((doc) => (
            <article
              key={doc.id_document}
              className="flex items-center gap-2 border-b border-orange-500 py-2 justify-between"
            >
              <div>
                <p className="text-sm sm:text-base font-semibold capitalize">{doc.name_document}</p>
                <span className="text-[12px] sm:text-sm text-gray-400">Papel: {doc.role_document}</span>
              </div>

              <div>
                <p className="text-sm sm:text-base font-semibold capitalize">{formatSize(doc.document_size)}</p>
                <span className="text-[12px] sm:text-sm text-gray-400">
                  criado em: {new Date(doc.data_create).toLocaleDateString()}
                </span>
              </div>

              <div>
                <button
                  className="text-orange-600 hover:underline"
                  onClick={() => handleDownload(doc.id_document, doc.name_document)}
                >
                  Download
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 mr-9 sm:flex-row">
               <Dialog onOpenChange={(open) => {
  if (!open) setEditingDoc(null);
}}>
  <DialogTrigger asChild>
    <Button
      variant='outline'
      onClick={() => setEditingDoc(doc)}
    >
      <Edit
        className="w-4 h-4 text-orange-600 font-bold sm:w-5 sm:h-5 cursor-pointer"
      />
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar Documento</DialogTitle>
    </DialogHeader>
    {editingDoc && (
      <EditDocumento
        document={editingDoc}
        onClose={() => setEditingDoc(null)}
        onUpdated={() => refetch()}
      />
    )}
  </DialogContent>
</Dialog>


                <Button
                  variant='outline'
                  onClick={() => handleDelete(doc.id_document)}
                  title="Apagar Documento"
                  className="text-red-600 hover:text-red-800"
                  disabled={deleting}
                >
                  {deleting ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </article>
          ))}
        </main>

        {!filterEnabled && (
          <footer className="flex justify-between items-center mt-6">
            <Button
              onClick={prevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-400 text-white rounded disabled:bg-gray-300"
            >
              <ChevronLeft /> Anterior
            </Button>

            <span className="text-sm">
              Página {page} de {data?.lastPage ?? '...'}
            </span>

            <Button
              onClick={nextPage}
              disabled={!data?.lastPage || page === data.lastPage}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-400 text-white rounded disabled:bg-gray-300"
            >
              Próxima <ChevronRight />
            </Button>
          </footer>
        )}
      </div>
    </section>
  );
};

export default Document_List_User;
