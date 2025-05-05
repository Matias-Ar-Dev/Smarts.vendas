import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useUsers } from '@/hooks/userts'
import { useDeleteUser } from '@/hooks/userDelete'

function Users () {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useUsers(page)
  const deleteUser = useDeleteUser()

  // Verificando se a resposta está no formato correto (data.users e data.totalPages)
  const users = data?.data ?? []
  const totalPages = data?.lastPage ?? 1

  // Verificando se os dados foram carregados com sucesso
  if (isLoading) return <p>Carregando...</p>
  if (isError) return <p>Erro ao carregar...</p>

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='text-lg sm:text-xl text-gray-800'>Funcionários Cadastrados</CardTitle>
        <CardDescription>Painel de funcionários registrados na plataforma</CardDescription>
      </CardHeader>

      <CardContent>
        {users.map(user => (
          <article key={user.id_user} className='flex items-center gap-2 border-b py-2 justify-between'>
            <div>
              <p className='text-sm sm:text-base font-semibold capitalize'>{user.name_user}</p>
              <span className='text-[12px] sm:text-sm text-gray-400'>{user.email_user}</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-3 mr-9 sm:flex-row'>
              <p className='text-sm sm:text-base font-semibold'>Excluir</p>
              <Trash2
                onClick={() => deleteUser.mutate(user.id_user)}
                className='w-4 h-4 text-red-600 font-bold sm:w-5 sm:h-5 cursor-pointer'
              />
            </div>
          </article>
        ))}

        {/* Paginação */}
        <div className='flex justify-end gap-2 mt-4'>
          <Button className="bg-orange-400 hover:bg-orange-500" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft/>
          </Button>
          <span className='text-sm text-gray-600 self-center'>Página {page}</span>
          <Button className="bg-orange-400 hover:bg-orange-500" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
            <ChevronRight/>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Users
