import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

const CreateUploadForm: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!files || files.length === 0) {
      setMessage('Por favor, selecione ao menos um arquivo.')
      return
    }

    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append('arquivo', file)
    })

    setLoading(true)
    setMessage('Enviando arquivos...')

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setMessage('Arquivos enviados com sucesso!')
      console.log(response.data)
    } catch (error) {
      console.error(error)
      setMessage('Erro ao enviar os arquivos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-lg font-semibold mb-4">Upload de Arquivos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" multiple onChange={handleFileChange} />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Enviando...' : 'Enviar Arquivos'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  )
}

export default CreateUploadForm
