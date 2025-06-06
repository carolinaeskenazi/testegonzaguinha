// src/pages/StudentsManagement.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Home,
  Info,
} from "lucide-react";
import { toast } from "sonner";

const StudentsManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);

  // 1. Buscar alunos do backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/alunos`);
        setStudents(res.data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };
    fetchStudents();
  }, []);

  // Filtra pelo nome ou turma digitada
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete de aluno no backend
  const handleDeleteStudent = async (studentId, studentName) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/alunos/${studentId}`);
      setStudents((prev) =>
        prev.filter((student) => student._id !== studentId)
      );
      toast.success(`Aluno ${studentName} removido com sucesso!`);
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
      toast.error("Erro ao remover aluno.");
    }
  };

  // Configurações de badge para condições
  const getConditionBadge = (condition) => {
    const configs = {
      dietary: { label: "Restrição Alimentar", color: "bg-yellow-100 text-yellow-700" },
      disability: { label: "Deficiência", color: "bg-blue-100 text-blue-700" },
      medical: { label: "Condição Médica", color: "bg-red-100 text-red-700" },
      psychological: { label: "Psicológico", color: "bg-green-100 text-green-700" },
    };
    return configs[condition] || { label: condition, color: "bg-gray-100 text-gray-700" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header (mesmo estilo do Dashboard e do ClassesManagement) */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gerenciamento de Alunos
              </h1>
              <p className="text-gray-600">
                Adicione, edite ou remova informações dos alunos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="whitespace-nowrap"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/about-us")}
                className="whitespace-nowrap"
              >
                <Info className="w-4 h-4 mr-2" />
                Sobre Nós
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/classes")}
                className="whitespace-nowrap"
              >
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Turmas
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/students")}
                className="whitespace-nowrap"
              >
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Alunos
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="whitespace-nowrap"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo da página abaixo do Header */}
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Barra de busca e botão "Adicionar Aluno" */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou turma..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => navigate("/students/add")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Aluno
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Alunos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Lista de Alunos ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Turno</TableHead>
                  <TableHead>Condições</TableHead>
                  {/* Coluna "Contato" removida aqui */}
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    {/* Ajustamos colSpan de 7 para 6 */}
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhum aluno encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          {student.hasEmergencyProtocol && (
                            <Badge
                              variant="outline"
                              className="text-red-600 border-red-200 text-xs mt-1"
                            >
                              Protocolo de emergência
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{student.age} anos</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.class}</Badge>
                      </TableCell>
                      <TableCell>{student.shift}</TableCell>
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
                      {/* Coluna "Contato" removida aqui */}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/students/edit/${student._id}`)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remover
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover o aluno{" "}
                                  <strong>{student.name}</strong>? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteStudent(student._id, student.name)
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
  );
};

export default StudentsManagement;
