import React, { useState, FormEvent } from 'react'
import axios from 'axios'

interface Props {
  id_uploads: number
  currentName: string
  currentMime: string
}

const EditUploadForm: React.FC<Props> = ({ id_uploads, currentName, currentMime }) => {
  const [originalname, setOriginalname] = useState(currentName)
  const [mimetype, setMimetype] = useState(currentMime)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('Salvando...')

    try {
      const response = await axios.put(`http://localhost:3000/upload/${id_uploads}`, {
        originalname,
        mimetype
      })

      setMessage(response.data.message || 'Atualizado com sucesso!')
    } catch (error: any) {
      setMessage('Erro ao atualizar.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md ml-36">
      <h2 className="text-lg font-semibold">Editar Documento</h2>

      <label className="flex flex-col">
        Nome do Arquivo
        <input
          type="text"
          value={originalname}
          onChange={(e) => setOriginalname(e.target.value)}
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Tipo MIME
        <select
          value={mimetype}
          onChange={(e) => setMimetype(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="application/pdf">PDF</option>
          <option value="image/png">Imagem PNG</option>
          <option value="image/jpeg">Imagem JPEG</option>
          <option value="text/plain">Texto (.txt)</option>
          <option value="application/msword">Word</option>
        </select>
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Salvar Alterações'}
      </button>

      {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
    </form>
  )
}

export default EditUploadForm
