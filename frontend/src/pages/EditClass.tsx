
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowLeft, Save, GraduationCap, Users, UserPlus, UserMinus } from "lucide-react";
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

const EditClass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [studentsInClass, setStudentsInClass] = useState([
    {
      id: "001",
      name: "Ana Clara Silva Santos",
      age: 15,
      conditions: ["dietary", "medical"],
      hasEmergencyProtocol: true,
    },
    {
      id: "002", 
      name: "Pedro Henrique Costa",
      age: 15,
      conditions: ["disability"],
      hasEmergencyProtocol: false,
    }
  ]);

  // Mock data - em uma aplicação real, buscaria da API
  const mockClassData = {
    id: "001",
    name: "6º Ano A",
    grade: "6º Ano",
    shift: "Matutino",
    capacity: "30",
    teacher: "Maria Silva",
    classroom: "Sala 101",
    subjects: "Matemática, Português, Ciências, História, Geografia",
    description: "Turma do ensino fundamental com foco em desenvolvimento básico"
  };

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

  useEffect(() => {
    // Simular busca dos dados da turma
    const loadClassData = async () => {
      try {
        // Em uma aplicação real, faria fetch("/api/classes/" + id)
        await new Promise(resolve => setTimeout(resolve, 500));
        form.reset(mockClassData);
      } catch (error) {
        toast.error("Erro ao carregar dados da turma");
        navigate('/classes');
      }
    };

    if (id) {
      loadClassData();
    }
  }, [id, form, navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Turma atualizada:", values);
      toast.success("Turma atualizada com sucesso!");
      navigate('/classes');
    } catch (error) {
      toast.error("Erro ao atualizar turma. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveStudent = (studentId: string, studentName: string) => {
    setStudentsInClass(prev => prev.filter(student => student.id !== studentId));
    toast.success(`${studentName} removido da turma`);
  };

  const getConditionBadge = (condition: string) => {
    const configs = {
      dietary: { label: "Restrição Alimentar", color: "bg-yellow-100 text-yellow-700" },
      disability: { label: "Deficiência", color: "bg-blue-100 text-blue-700" },
      medical: { label: "Condição Médica", color: "bg-red-100 text-red-700" },
      psychological: { label: "Psicológico", color: "bg-green-100 text-green-700" }
    };
    const config = configs[condition as keyof typeof configs];
    return config || { label: condition, color: "bg-gray-100 text-gray-700" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
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
            <h1 className="text-3xl font-bold text-gray-900">Editar Turma</h1>
            <p className="text-gray-600">Atualize as informações da turma e gerencie alunos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                  <div className="grid grid-cols-2 gap-4">
                    {/* Capacidade */}
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacidade</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="30" {...field} />
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
                          <FormLabel>Sala</FormLabel>
                          <FormControl>
                            <Input placeholder="Sala 101" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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

                  {/* Matérias */}
                  <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Matérias</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Matemática, Português, Ciências..." 
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
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Informações adicionais..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
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
                        "Salvando..."
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Students Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Alunos da Turma ({studentsInClass.length})
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Aluno
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Condições</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsInClass.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        Nenhum aluno na turma.
                      </TableCell>
                    </TableRow>
                  ) : (
                    studentsInClass.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.age} anos</div>
                            {student.hasEmergencyProtocol && (
                              <Badge variant="outline" className="text-red-600 border-red-200 text-xs mt-1">
                                Protocolo de emergência
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {student.conditions.map((condition, index) => {
                              const config = getConditionBadge(condition);
                              return (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className={`text-xs ${config.color}`}
                                >
                                  {config.label}
                                </Badge>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleRemoveStudent(student.id, student.name)}
                          >
                            <UserMinus className="w-4 h-4 mr-1" />
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditClass;
