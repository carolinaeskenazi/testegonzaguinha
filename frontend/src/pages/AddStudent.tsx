import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ArrowLeft, UserPlus, Phone, Mail, MapPin, User, Stethoscope, Plus } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const studentSchema = z.object({
  // Informações Básicas (Obrigatórias)
  photo: z.string().optional(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  age: z.number().min(6, "Idade mínima é 6 anos").max(100, "Idade máxima é 100 anos"),
  class: z.string().min(1, "Selecione uma turma"),
  shift: z.string().min(1, "Selecione um turno"),
  eolCode: z.string().min(1, "Código EOL é obrigatório"),

  // Todos os outros campos opcionais
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianEmail: z.string().optional(),
  guardianAddress: z.string().optional(),
  guardianRelationship: z.string().optional(),
  doctorName: z.string().optional(),
  doctorPhone: z.string().optional(),
  doctorEmail: z.string().optional(),
  medicalStatus: z.string().optional(),
  medicalAbsences: z.number().optional(),
  totalAbsences: z.number().optional(),
  attendancePercentage: z.number().optional(),
  conditions: z.array(z.string()).optional(),
  quadroClinico: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  medications: z.string().optional(),
  emergencyActions: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

const AddStudent = () => {
  const navigate = useNavigate();
  const [turmas, setTurmas] = useState<{ _id: string, nome: string }[]>([]);
  
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      photo: "",
      name: "",
      age: 0,
      class: "",
      shift: "",
      eolCode: "",
      guardianName: "",
      guardianPhone: "",
      guardianEmail: "",
      guardianAddress: "",
      guardianRelationship: "",
      doctorName: "",
      doctorPhone: "",
      doctorEmail: "",
      medicalStatus: "",
      medicalAbsences: 0,
      totalAbsences: 0,
      attendancePercentage: 100,
      conditions: [],
      dietaryRestrictions: "",
      medications: "",
      emergencyActions: "",
      quadroClinico: "",
    },
  });

  const conditionsOptions = [
    { id: "dietary", label: "Restrição Alimentar" },
    { id: "disability", label: "Deficiência" },
    { id: "medical", label: "Condição Médica" },
    { id: "psychological", label: "Acompanhamento Psicológico" },
  ];

  const classes = [
    "6º Ano A", "6º Ano B", "6º Ano C",
    "7º Ano A", "7º Ano B", "7º Ano C",
    "8º Ano A", "8º Ano B", "8º Ano C",
    "9º Ano A", "9º Ano B", "9º Ano C"
  ];

  const relationshipOptions = [
    "Mãe",
    "Pai",
    "Avó",
    "Avô",
    "Tio(a)",
    "Irmão(a)",
    "Responsável Legal",
    "Outro"
  ];

  const medicalStatusOptions = [
    "Regular",
    "Acompanhamento",
    "Emergencial"
  ];

  const frequencyOptions = [
    "Regular",
    "Irregular",
    "Monitorado",
    "Suspenso"
  ];

  useEffect(() => {
    fetch("http://localhost:5001/api/turmas")
      .then(res => res.json())
      .then(data => setTurmas(data))
      .catch(() => setTurmas([]));
  }, []);

  const onSubmit = async (data: StudentFormData) => {
    try {
      const response = await fetch("http://localhost:5001/api/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(`Aluno ${data.name} adicionado com sucesso!`);
        navigate('/');
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao adicionar aluno.");
      }
    } catch (err) {
      toast.error("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/students')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Adicionar Novo Aluno</h1>
            <p className="text-gray-600">Preencha as informações do aluno</p>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Foto do Estudante */}
                  <div className="md:col-span-2 flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarImage src={form.watch("photo")} alt="Foto do estudante" />
                        <AvatarFallback className="bg-blue-500 text-white text-2xl">
                          {form.watch("name") ? form.watch("name").split(' ').map(n => n[0]).join('') : "FT"}
                        </AvatarFallback>
                      </Avatar>
                      <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="absolute bottom-0 right-0">
                                <label htmlFor="photo-upload" className="cursor-pointer">
                                  <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                                    <Plus className="w-4 h-4" />
                                  </div>
                                  <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          field.onChange(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <p className="text-sm text-gray-500">Clique no ícone + para adicionar uma foto</p>
                  </div>

                  {/* Nome Completo */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo do aluno" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Digite a idade"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Turma</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma turma" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {turmas.map((turma) => (
                              <SelectItem key={turma._id} value={turma.nome}>
                                {turma.nome}
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
                    name="shift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Turno</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um turno" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Matutino">Matutino</SelectItem>
                            <SelectItem value="Vespertino">Vespertino</SelectItem>
                            <SelectItem value="Noturno">Noturno</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eolCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código EOL</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o código EOL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Responsável */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Responsável
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Responsável</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parentesco</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o parentesco" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {relationshipOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
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
                    name="guardianPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianAddress"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Endereço completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Médico de Referência */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-blue-500" />
                  Médico de Referência
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="doctorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Médico</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doctorPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doctorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Informações Médicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-blue-500" />
                  Informações Médicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="medicalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Médico</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {medicalStatusOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
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
                    name="medicalAbsences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faltas Médicas</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Quantidade de faltas médicas"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalAbsences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total de Faltas</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Quantidade total de faltas"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attendancePercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência Geral (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Porcentagem de frequência"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Condições de Saúde */}
                  <FormField
                    control={form.control}
                    name="conditions"
                    render={() => (
                      <FormItem className="md:col-span-2">
                        <div className="mb-4">
                          <FormLabel>Condições de Saúde</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {conditionsOptions.map((condition) => (
                            <FormField
                              key={condition.id}
                              control={form.control}
                              name="conditions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={condition.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(condition.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], condition.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== condition.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {condition.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Restrições Alimentares */}
                  <FormField
                    control={form.control}
                    name="quadroClinico"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Quadro Clínico</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva o quadro clínico do aluno (doenças, condições, histórico, etc.)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Restrições Alimentares</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva as restrições alimentares do aluno (alergias, intolerâncias, etc.)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Medicamentos */}
                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Medicamentos</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Liste os medicamentos que o aluno utiliza regularmente, incluindo dosagem e horários" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Ações Emergenciais */}
                  <FormField
                    control={form.control}
                    name="emergencyActions"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Ações Emergenciais</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva as ações a serem tomadas em caso de emergência (procedimentos específicos, contatos prioritários, etc.)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                <UserPlus className="w-4 h-4 mr-2" />
                Adicionar Aluno
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddStudent;
