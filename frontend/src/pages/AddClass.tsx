
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Nome da turma é obrigatório"),
  grade: z.string().min(1, "Série é obrigatória"),
  shift: z.string().min(1, "Turno é obrigatório"),
  capacity: z.string().min(1, "Capacidade é obrigatória"),
  teacher: z.string().min(1, "Professor responsável é obrigatório"),
  classroom: z.string().min(1, "Sala de aula é obrigatória"),
  subjects: z.string().min(1, "Matérias são obrigatórias"),
  description: z.string().optional(),
});

const AddClass = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      grade: "",
      shift: "",
      capacity: "",
      teacher: "",
      classroom: "",
      subjects: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Nova turma criada:", values);
      toast.success("Turma criada com sucesso!");
      navigate('/classes');
    } catch (error) {
      toast.error("Erro ao criar turma. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/classes')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Adicionar Nova Turma</h1>
            <p className="text-gray-600">Preencha as informações para criar uma nova turma</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              Informações da Turma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome da Turma */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Turma</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 6º Ano A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Série */}
                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Série</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a série" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="6º Ano">6º Ano</SelectItem>
                            <SelectItem value="7º Ano">7º Ano</SelectItem>
                            <SelectItem value="8º Ano">8º Ano</SelectItem>
                            <SelectItem value="9º Ano">9º Ano</SelectItem>
                            <SelectItem value="1º Ano EM">1º Ano EM</SelectItem>
                            <SelectItem value="2º Ano EM">2º Ano EM</SelectItem>
                            <SelectItem value="3º Ano EM">3º Ano EM</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Turno */}
                  <FormField
                    control={form.control}
                    name="shift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Turno</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o turno" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Matutino">Matutino</SelectItem>
                            <SelectItem value="Vespertino">Vespertino</SelectItem>
                            <SelectItem value="Noturno">Noturno</SelectItem>
                            <SelectItem value="Integral">Integral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Capacidade */}
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidade (número de alunos)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Professor */}
                  <FormField
                    control={form.control}
                    name="teacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professor Responsável</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do professor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Sala */}
                  <FormField
                    control={form.control}
                    name="classroom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sala de Aula</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Sala 101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Matérias */}
                <FormField
                  control={form.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matérias (separadas por vírgula)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Matemática, Português, Ciências, História, Geografia" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Descrição */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição (opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Informações adicionais sobre a turma..."
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/classes')}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      "Criando..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Criar Turma
                      </>
                    )}
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

export default AddClass;
