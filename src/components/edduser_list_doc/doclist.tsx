import { CircleArrowRight, DownloadCloud } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useUploads } from "@/hooks/uploads"
import { useState } from "react"

function Doc() {
  const [page, setPage] = useState(1)

  // Utiliza o hook para carregar os uploads com base na página atual
  const { data, isLoading, isError } = useUploads({ page, limit: 6 })

  // Função para ir para a próxima página
  const handleNextPage = () => {
    if (data?.lastPage > page) {
      setPage(prevPage => prevPage + 1)
    }
  }

  // Função para voltar para a página anterior
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1)
    }
  }

  return (
    <Card className="w-full md:w-1/2 max-w-600px">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Transferências de Documentos
          </CardTitle>
          <div className="ml-auto w-4 h-4">
            <span className="cursor-pointer">
              <CircleArrowRight className="text-orange-500" />
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && <p className="text-sm text-gray-500">Carregando...</p>}
        {isError && <p className="text-sm text-red-500">Erro ao carregar os documentos.</p>}

        {data?.data.length === 0 && !isLoading && !isError && (
          <p className="text-sm text-gray-400">Nenhum documento encontrado.</p>
        )}

        {data?.data.map((doc) => (
          <article
            key={doc.id_uploads}
            className="flex items-center gap-2 border-b py-2 justify-between"
          >
            <div>
              <p className="text-sm sm:text-base font-semibold capitalize">
                {doc.original_name}
              </p>
              <span className="text-[12px] sm:text-sm text-gray-400">
                {new Date(doc.upload_date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center flex-col justify-center gap-3 mr-9 sm:flex-row">
                <p className="text-sm sm:text-base font-semibold">transferir</p>
                <a
                  href={`http://localhost:3000/download/${doc.id_uploads}`} // ajuste conforme backend
                  download
                  className="text-[12px] sm:text-sm text-gray-400 cursor-pointer"
                >
                  <DownloadCloud className="w-4 h-4 text-primary font-bold sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </article>
        ))}

        {/* Controles de Navegação */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded"
            onClick={handlePrevPage}
            disabled={page === 1 || isLoading}
          >
            Anterior
          </button>

          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded"
            onClick={handleNextPage}
            disabled={page === data?.lastPage || isLoading}
          >
            Próxima
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Doc
