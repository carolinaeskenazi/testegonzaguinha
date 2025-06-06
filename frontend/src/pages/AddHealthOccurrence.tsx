import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Activity, ArrowLeft } from "lucide-react";

const occurrenceSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  date: z.string().min(1, "A data é obrigatória"),
  description: z.string().min(1, "A descrição é obrigatória"),
  registeredBy: z.string().min(1, "O responsável pelo registro é obrigatório"),
});

type OccurrenceFormValues = z.infer<typeof occurrenceSchema>;

const AddHealthOccurrence = () => {
  const navigate = useNavigate();
  const { alunoId } = useParams<{ alunoId: string }>();
  const form = useForm<OccurrenceFormValues>({
    resolver: zodResolver(occurrenceSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      registeredBy: "",
    },
  });

  const onSubmit = async (data: OccurrenceFormValues) => {
    try {
      if (!alunoId) {
        console.error("ID do aluno não encontrado na URL.");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/alunos/${alunoId}/ocorrencias`, {
        titulo: data.title,
        descricao: data.description,
        data: data.date,
        registrado_por: data.registeredBy,
      });

      console.log(response.data);
      navigate(`/student-profile/${alunoId}`);
    } catch (error) {
      console.error('Erro ao registrar ocorrência:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/student-profile/${alunoId}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Nova Ocorrência de Saúde</h1>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Registro de Ocorrência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Ocorrência</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Febre e Dor de Garganta" {...field} />
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
                        <FormLabel>Data da Ocorrência</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição Detalhada</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva detalhadamente a ocorrência, incluindo sintomas, observações e qualquer informação relevante"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registeredBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registrado por</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do responsável pelo registro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/student-profile/${alunoId}`)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Salvar Ocorrência
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

export default AddHealthOccurrence;