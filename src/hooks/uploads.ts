// src/hooks/useUploads.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import axios from 'axios'
export type doc = {
    id_uploads: number;
original_name:  string;
stored_name :string;
file_path : string;
mime_type: string;
upload_date: string;
}
export function useUploads() {
  return useQuery <doc[]>({
    queryKey: ['uploads'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:000/uploads')
      return response.data
    }
  })
}
