import { ChevronLeft, ChevronRight, CircleArrowRight, DownloadCloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useUploads } from "@/hooks/uploads";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { api } from '@/lib/axios'; // import axios configurado
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function Doc() {
  const [page, setPage] = useState(1);

  // Hook customizado para carregar uploads
  const { data, isLoading, isError } = useUploads({ page, limit: 6 });

  const handleNextPage = () => {
    if (data?.lastPage > page) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Função para fazer download via Blob (adaptada do seu outro componente)
  const handleDownload = async (id: number, filename: string) => {
    try {
      const response = await api.get(`/documentos/download/${id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const contentType = response.headers["content-type"] || "application/octet-stream";
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar o documento:", error);
      alert("Erro ao baixar o documento");
    }
  };

  if (isLoading)
    return (
      <Card className="flex-1 p-6">
        <div>
          <p>carregar...</p>
          <div className="pt-9">
            <Skeleton className=" h-4 w-40 mb-3" />
            <div className="flex gap-4 flex-col">
              <Skeleton className=" h-12 w-full" />
              <Skeleton className=" h-10 w-32" />
              <br />
              <Skeleton className=" h-10 w-1/2" />
            </div>
          </div>
        </div>
      </Card>
    );

  if (isError)
    return (
      <Card className="flex-1 p-6">
        <p className="text-red-600">Erro ao Carregar documentos...</p>
      </Card>
    );

  return (
    <Card className="w-full md:w-1/2 max-w-600px ">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Transferências de Documentos
          </CardTitle>
          <div className="ml-auto w-72">
            <span className="cursor-pointer">
              <Input placeholder="pesquisa por documentos..."/>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
       

        {data?.data.map((doc) => (
          <article
            key={doc.id_document}
            className="flex items-center gap-2 border-b border-orange-600 py-2 justify-between"
          >
            <div>
              <p className="text-sm sm:text-base font-semibold capitalize">
                {doc.name_document}
              </p>
              <span className="text-[12px] sm:text-sm text-gray-400">
                {new Date(doc.data_create).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center flex-col justify-center gap-3 mr-9 sm:flex-row">
                
                <button
                  onClick={() => handleDownload(doc.id_document, doc.name_document)}
                  className="text-[12px] sm:text-sm text-gray-400 cursor-pointer flex items-center gap-1"
                >
                  <DownloadCloud className="w-4 h-4 text-orange-600 font-bold sm:w-5 sm:h-5" />
                  Baixar
                </button>
              </div>
            </div>
          </article>
        ))}

        {/* Controles de Navegação */}
        <div className="flex justify-between mt-4">
          <Button
            className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-400  rounded"
            onClick={handlePrevPage}
            disabled={page === 1 || isLoading}
          >
          <ChevronLeft/>  Anterior 
          </Button>

          <Button
            className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-400 rounded"
            onClick={handleNextPage}
            disabled={page === data?.lastPage || isLoading}
          >
            Próxima <ChevronRight/>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Doc;
