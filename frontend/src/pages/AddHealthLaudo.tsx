import React from 'react';
import { useState, useCallback } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Activity, ArrowLeft, Plus } from "lucide-react";

const occurrenceSchema = z.object({
  type: z.string().min(1, "O tipo é obrigatório"),
  date: z.string().min(1, "A data é obrigatória"),
  description: z.string().min(1, "A descrição é obrigatória"),
  doctor: z.string().min(1, "O médico é obrigatório"),
  status: z.string().min(1, "O status é obrigatório"),
  file: z.custom<File | undefined>((val) => val instanceof File, {
    message: "O arquivo é obrigatório",
  }),
});

type OccurrenceFormValues = z.infer<typeof occurrenceSchema>;

const AddHealthLaudo = () => {
  const navigate = useNavigate();
  const { alunoId } = useParams<{ alunoId: string }>();
  const form = useForm<OccurrenceFormValues>({
    resolver: zodResolver(occurrenceSchema),
    defaultValues: {
      type: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      doctor: "",
      status: "",
      file: undefined,
    },
  });
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [fileType, setFileType] = React.useState<string | null>(null);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        form.setValue("file", file);
      }
    },
    [form]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

const handleDragLeave = () => setDragOver(false);

  React.useEffect(() => {
    const file = form.watch("file");
    if (file) {
      setFileType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setFileType(null);
    }
  }, [form.watch("file")]);

  const laudoStatus = ["Válido", "Inválido", "Em análise"];

  const onSubmit = async (data: OccurrenceFormValues) => {
  try {
    if (!alunoId) {
      console.error("ID do aluno não encontrado na URL.");
      return;
    }

    const formData = new FormData();
    formData.append("tipo", data.type);
    formData.append("data", data.date);
    formData.append("descricao", data.description);
    formData.append("medico", data.doctor);
    formData.append("status", data.status);
    formData.append("file", data.file); 

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/alunos/${alunoId}/laudos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    navigate(`/student-profile/${alunoId}`);
  } catch (error) {
    console.error("Erro ao registrar laudo:", error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/student-profile/${alunoId}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Novo Laudo Médico</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Registro de Laudo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo do Laudo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Oftalmológico, Psicológico, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data do Laudo</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Médico</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do médico" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {laudoStatus.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva brevemente o problema"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pré-visualização do arquivo */}
                {form.watch("file") && (
                  <div className="flex flex-col items-center mt-4 space-y-4">
                    <span className="text-sm text-gray-600 text-center">
                      Arquivo selecionado: {form.watch("file")?.name}
                    </span>

                    {fileType?.startsWith("image/") && previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Prévia do arquivo"
                        className="max-w-xs max-h-64 rounded shadow"
                      />
                    )}

                    {fileType === "application/pdf" && previewUrl && (
                      <iframe
                        src={previewUrl}
                        title="Prévia do PDF"
                        className="w-full max-w-md h-64 border rounded shadow"
                      />
                    )}
                  </div>
                )}

                
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-md p-6 transition-all ${
                      dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                  >
                    <p className="text-center text-sm text-gray-500 mb-2">
                      Arraste e solte o arquivo aqui, ou
                    </p>
                    <label htmlFor="file-upload-inline" className="flex justify-center">
                      <div className="flex items-center gap-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                        <Plus className="w-5 h-5" />
                        <span className="text-base font-medium">
                          {form.watch("file") ? "Trocar Arquivo" : "Adicionar Arquivo"}
                        </span>
                      </div>
                      <input
                        id="file-upload-inline"
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const selected = e.target.files?.[0];
                          if (selected) {
                            form.setValue("file", selected);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Botões */}
                  <div className="flex justify-end gap-4 mt-4">
                    <Button type="submit">
                      Salvar Laudo
                    </Button>
                  </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddHealthLaudo;