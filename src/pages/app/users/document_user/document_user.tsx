import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

import UploadForm from '@/components/add_doc/add_doc';
import EditDocumento from '@/components/add_doc/editar_doc';
import { useCreateDocument } from '@/hooks/useCreatedocument';
import { api } from '@/lib/axios';
import { Mobile_user } from '../menuMobile';

type Document = {
  id_document: number;
  name_document: string;
  path_document: string;
  role_document: string;
  document_size: string;
  data_create: string;
  categoria_document: string;
};

type DocumentResponse = {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  data: Document[];
};

const fetchDocuments = async (page: number): Promise<DocumentResponse> => {
  const res = await api.get(`/documentos?page=${page}&limit=6`);
  return res.data;
};

const Document_List_User = () => {
  const [page, setPage] = useState(1);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const { createDocument, loading: creating, error: createError } = useCreateDocument();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['documents', page],
    queryFn: () => fetchDocuments(page),
    keepPreviousData: true,
  });

  const handleDelete = async (id_document: number) => {
    if (!confirm('Tem certeza que deseja apagar este documento?')) return;

    try {
      await api.delete(`/documentos/${id_document}`);
      alert('Documento excluído com sucesso.');
      refetch();
    } catch (error) {
      alert('Erro ao apagar documento');
      console.error(error);
    }
  };

  const handleDownload = async (id: number, filename: string) => {
    try {
      const response = await api.get(`/documentos/download/${id}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const contentType = response.headers['content-type'] || 'application/octet-stream';

      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o documento:', error);
      alert('Erro ao baixar o documento');
    }
  };

  const formatSize = (sizeInBytes: string) => {
    const size = parseInt(sizeInBytes, 10);
    if (isNaN(size)) return sizeInBytes;
    if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
    if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
    return size + ' bytes';
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar documentos.</p>;

  return (
    <section>
         <Mobile_user/>
      <div className="sm:ml-14 p-4">
     
        <header className="flex items-start justify-between flex-col lg:flex-row ">
          <div className="p-4">
            <h2 className="text-lg sm:text-xl text-gray-800 select-none">
              Painel de actividades
            </h2>
            <span className="text-zinc-500">
              Gestão e controle de todas as actividades na plataforma
            </span>
          </div>

          {/* Modal para criar documento */}
          <div className="flex items-center justify-between gap-4 p-4 ">
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-orange-600 hover:bg-orange-400' disabled={creating}>{creating ? 'Enviando documento...' : 'Adicionar Documento'}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Documento</DialogTitle>
                </DialogHeader>
                <UploadForm
                  onSubmit={async (formData) => {
                    try {
                      await createDocument(formData);
                      alert('Documento criado com sucesso!');
                      refetch();
                    } catch {
                      alert('Erro ao criar documento');
                    }

                  }}
                />
                {createError && <p className="text-red-600 mt-2">{createError}</p>}
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main>
          {data?.data.map((doc) => (
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
                <Dialog open={editingDoc?.id_document === doc.id_document} onOpenChange={(open) => !open && setEditingDoc(null)}>
                  <DialogTrigger asChild>
                    <Edit
                      className="w-4 h-4 text-orange-600 font-bold sm:w-5 sm:h-5 cursor-pointer"
                      onClick={() => setEditingDoc(doc)}
                    />
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

                <button
                  onClick={() => handleDelete(doc.id_document)}
                  title="Apagar Documento"
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </article>
          ))}
        </main>

        <footer className="flex justify-between items-center mt-6">
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-400  text-white rounded disabled:bg-gray-300"
          >
             <ChevronLeft/> Anterior
          </Button>

          <span className="text-sm">
            Página {page} de {data?.lastPage ?? '...'}
          </span>

          <Button
            onClick={() => setPage((p) => Math.min(p + 1, data?.lastPage ?? p))}
            disabled={!data?.lastPage || page === data.lastPage}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-400 text-white rounded disabled:bg-gray-300"
          >
            Próxima <ChevronRight/>
          </Button>
        </footer>
      </div>
    </section>
  );
};

export default Document_List_User;
