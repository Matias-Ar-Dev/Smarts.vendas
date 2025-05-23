import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  ChevronLeft,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useUsers } from '@/hooks/userts';
import { useDeleteUser } from '@/hooks/userDelete';
import { Skeleton } from '../ui/skeleton';
import { Input } from '../ui/input';

function Users () {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError } = useUsers(page);
  const deleteUser = useDeleteUser();

  // Dados da API
  const users = data?.data ?? [];
  const totalPages = data?.lastPage ?? 1;

  // Filtro local por nome ou email
  const filteredUsers = users.filter(user =>
    user.name_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email_user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Carregando
  if (isLoading) {
    return (
      <Card className='flex-1 p-6'>
        <div>
          <p>Carregando...</p>
          <div className="pt-9">
            <Skeleton className="h-4 w-40 mb-3" />
            <div className="flex gap-4 flex-col">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-10 w-32" /><br />
              <Skeleton className="h-10 w-1/2" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Erro ao carregar
  if (isError) {
    return (
      <Card className='flex-1 p-6'>
        <p className='text-red-600'>Erro ao Carregar Usuários...</p>
      </Card>
    );
  }

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='text-lg sm:text-xl text-gray-800'>Funcionários Cadastrados</CardTitle>
        <CardDescription>Painel de funcionários registrados na plataforma</CardDescription>
        <Input
          placeholder='Pesquisar por nome ou email'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CardHeader>

      <CardContent>
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-gray-500 mt-4">Nenhum usuário encontrado.</p>
        ) : (
          filteredUsers.map(user => (
            <article
              key={user.id_user}
              className='flex items-center gap-2 border-b py-2 justify-between'
            >
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
          ))
        )}

        {/* Paginação */}
        <div className='flex justify-end gap-2 mt-4'>
          <Button
            className="bg-orange-400 hover:bg-orange-500"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft />
          </Button>
          <span className='text-sm text-gray-600 self-center'>Página {page}</span>
          <Button
            className="bg-orange-400 hover:bg-orange-500"
            onClick={() => setPage(p => p + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Users;
