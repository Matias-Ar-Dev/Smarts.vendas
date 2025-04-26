import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { CircleDollarSign, Delete, DeleteIcon, Edit, Edit2, Edit2Icon, Heading, Heart, Search, Trash, User, UserCheck2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { EddUser } from './edd_users'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useFetch } from '@/api/useFetch'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { toast } from 'sonner'
type Usuario = {
  id_user: number;
  name_user: string;
  email_user: string;
  password_user: string;
  
  
}

function Users ()  {
 //const {users} =useFetch<Usuario>('/list_users')
//   useQuery<Usuario[]>('repos', async () => {
//     const response = await axios.get('http://localhost:3000/list_users')

//     return response.data
  //})
  const {data } = useQuery<Usuario[]>(
    {
      queryKey: ['users'],
      queryFn: async () => {
        const response = await api.get('/list_users');
        return response.data;
      }
    }
  )
  const deleteUser = useMutation({
    mutationFn: async (id_user: Number) => {
      await api.delete(`/delete_user/${id_user}`);
    }
    , 
    onSuccess:() => {
      queryClient.invalidateQueries([ 'users' ]);
      toast.success('Usuário apagado com sucesso!')
    },
    onError: () => {
toast.error("erro ao apagar o usuário.")
    }
  })

  
  return (
    <Card className='flex-1'>
        <CardHeader>
      <div className='flex items-center justify-center'>
        <CardTitle className='text-lg sm:text-xl text-gray-800'>
Funcionários Cadastrados
        </CardTitle>
        <div className='ml-auto '>
          <Button variant='outline'><Search/></Button>
        </div>
      </div>
    
<CardDescription>
    Painel de funcionários registados na plataforma
</CardDescription>
      </CardHeader>

      <CardContent>
        {data?.map((user, index) => (

     

<article  key={index} className='flex items-center gap-2 border-b py-2 items-center justify-between'>
    <div>
        <p className='text-sm sm:text-base font-semibold capitalize'>{user.name_user}</p>
        <span className='text-[12px] sm:text-sm text-gray-400'>{user.email_user}</span>
        
    </div>
    
   <div className='flex items-center justify-center gap-6'>

    <Dialog>
        <DialogTrigger asChild>
        <div className='flex flex-col items-center justify-center gap-3 mr-9' >   <p className='text-sm sm:text-base font-semibold'>Editar</p>
        <span className='text-[12px] sm:text-sm text-gray-400 cursor-pointer'><Edit className='w-4 h-4 text-primary font-bold sm:w-5 sm:h-5'/></span></div>
        </DialogTrigger>
        <EddUser></EddUser>
      </Dialog>

    <div className='flex flex-col items-center justify-center gap-3 mr-9'>    <p className='text-sm sm:text-base font-semibold'>Excluir</p>
    <span className='text-[12px] sm:text-sm text-gray-400 cursor-pointer'><Trash onClick={()=>deleteUser.mutate(user.id_user)} className='w-4 h-4 text-red-600 font-bold sm:w-5 sm:h-5'/></span></div>
        
    </div>
     
    

</article>
   ))
}


      </CardContent>
    </Card>

  )
}

export default Users
