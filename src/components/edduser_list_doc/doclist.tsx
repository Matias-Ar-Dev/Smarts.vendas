import {
  ChevronLeft,
  ChevronRight,
  DownloadCloud,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePaginationDocuments } from "@/hooks/usePagitanioDoc";
import { useFilterDocuments } from "@/hooks/useFilterDoc";

function Doc() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const isSearching = search.trim().length > 0;

  const {
    data: filteredData,
    isLoading: isFiltering,
    isError: isFilterError,
  } = useFilterDocuments(isSearching, search);

  const {
    data: paginatedData,
    isLoading: isPaginating,
    isError: isPaginateError,
  } = usePaginationDocuments(page, search);

  const data = isSearching ? filteredData : paginatedData?.data;
  const isLoading = isSearching ? isFiltering : isPaginating;
  const isError = isSearching ? isFilterError : isPaginateError;

  const handleNextPage = () => {
    if (!isSearching && paginatedData?.lastPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (!isSearching && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

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

  return (
    <Card className="w-full md:w-1/2 max-w-600px">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Transferências de Documentos
          </CardTitle>
          <div className="ml-auto w-72">
            <Input
              placeholder="Pesquisar por documentos..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reinicia a página ao buscar
              }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {data?.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum documento encontrado.</p>
        ) : (
          data?.map((doc: any) => (
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
                <button
                  onClick={() => handleDownload(doc.id_document, doc.name_document)}
                  className="text-[12px] sm:text-sm text-gray-400 cursor-pointer flex items-center gap-1"
                >
                  <DownloadCloud className="w-4 h-4 text-orange-600 font-bold sm:w-5 sm:h-5" />
                  Baixar
                </button>
              </div>
            </article>
          ))
        )}

        {!isSearching && (
          <div className="flex justify-between mt-4">
            <Button
              className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-400 rounded"
              onClick={handlePrevPage}
              disabled={page === 1 || isLoading}
            >
              <ChevronLeft /> Anterior
            </Button>

            <Button
              className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-400 rounded"
              onClick={handleNextPage}
              disabled={page === paginatedData?.lastPage || isLoading}
            >
              Próxima <ChevronRight />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Doc;
