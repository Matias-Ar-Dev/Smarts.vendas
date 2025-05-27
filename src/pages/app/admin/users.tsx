import { useState, useEffect } from "react"
import axios from "axios"
import { Mobile } from "./menumobile"
import { CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog"
import { EddUser } from "@/components/edduser_list_doc/edd_users"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  LoaderCircleIcon,
  Plus,
  Trash2,
  UserCheck
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useUsers } from "@/hooks/userts"
import { useDeleteUser } from "@/hooks/userDelete"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/axios"

export function Dashboard_Admin_Users() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const { data, isLoading, isError } = useUsers(page)
  const deleteUser = useDeleteUser(page)

  const users = data?.data ?? []
  const totalPages = data?.lastPage ?? 1

  const isSearching = searchTerm.trim() !== ''

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      if (!isSearching) {
        setFilteredUsers([])
        return
      }

      try {
        const res = await api.get(`/filter_users?search=${encodeURIComponent(searchTerm)}`)
        setFilteredUsers(res.data)
      } catch (err) {
        console.error('Erro ao buscar usuários filtrados:', err)
      }
    }

    fetchFilteredUsers()
  }, [searchTerm])

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

        {/* Campo de busca */}
        <Input
          placeholder="Pesquisar por nome ou email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 max-w-sm"
        />

        {/* Carregando */}
        {isLoading && (
          <p className="flex items-center justify-center">
            carregar...
            <LoaderCircleIcon className="animate-spin text-orange-600 w-11 h-11" />
          </p>
        )}

        {/* Erro */}
        {isError && (
          <p className="text-red-500">Erro ao carregar dados.</p>
        )}

        {!isLoading && !isError && (
          <>
            {/* Tabela */}
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
                {(isSearching ? filteredUsers : users).map((user) => (
                  <TableRow key={user.id_user} className="bg-gray-100">
                    <TableCell className="capitalize">{user.name_user}</TableCell>
                    <TableCell>{user.email_user}</TableCell>
                    <TableCell>{user.role_user}</TableCell>
                    <TableCell>
                      <Button className="bg-orange-400 hover:bg-orange-500 mr-2">
                        <Edit />
                      </Button>
                      <Button
                        className="bg-orange-400 hover:bg-orange-500"
                        onClick={() => deleteUser.mutate(user.id_user)}
                      >
                        <Trash2 className="text-red-500 font-bold" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Paginação */}
            {!isSearching && (
              <div className="flex justify-end gap-2 mt-4">
                <Button className="bg-orange-400 hover:bg-orange-500" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft />
                </Button>
                <span className="text-sm text-gray-600 self-center">Página {page}</span>
                <Button className="bg-orange-400 hover:bg-orange-500" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
                  <ChevronRight />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
