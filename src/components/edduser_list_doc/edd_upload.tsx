import React, { useState, ChangeEvent, FormEvent } from "react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { useUpload } from "@/hooks/useUploas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paperclip } from "lucide-react";


const CreateUploadForm: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const { uploadFiles, loading } = useUpload()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    uploadFiles(files); // Chama o hook para realizar o upload
  };

  return (
    <DialogContent>
      <div className="p-4 max-w-md">
        <DialogHeader>
        <h1 className="text-lg font-semibold mb-4">Adicionar  Arquivos</h1>
        </DialogHeader>
       
        <form onSubmit={handleSubmit} className="space-y-4">

          <Input type="file" multiple onChange={handleFileChange} className="hidden"
          id="file_" />
          <label htmlFor="file_">

            <div  className="flex items-center justify-center  border p-4 rounded-full cursor-pointer"
              title="Clique para enviar arquivos">
                  {loading ? (
                <span>Enviando...</span>
              ) : (
                <Paperclip className="text-orange-500 text-2xl" />
              )}

            </div>
          </label>
          <Button

            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Enviando..." : "Enviar Arquivos"}
          </Button>
        </form>
      </div>
    </DialogContent>
  );
};

export default CreateUploadForm;
