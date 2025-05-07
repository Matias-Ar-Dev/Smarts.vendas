import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function useUpload() {
  const [loading, setLoading] = useState(false);

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      toast.warning("Por favor, selecione ao menos um arquivo.");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("arquivo", file);
    });

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Arquivos enviados com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar os arquivos.");
    } finally {
      setLoading(false);
    }
  };

  return { uploadFiles, loading };
}
