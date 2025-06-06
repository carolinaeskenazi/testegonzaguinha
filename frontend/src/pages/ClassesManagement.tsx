// src/pages/ClassesManagement.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Trash2,
  Users,
  Home,
  Info,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

const ClassesManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [newClassName, setNewClassName] = useState("");

  // 1. Buscar turmas do backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/turmas`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch(() => setClasses([]));
  }, []);

  // Função para extrair o número do início do nome da turma
  const parseTurma = (nome: string): [number, string] => {
    const match = nome.match(/^(\d{1,2})º Ano ([A-Z])$/);
    if (!match || match.length < 3) return [99, "Z"];
    return [parseInt(match[1]), match[2]];
  };
  

  // Ordena as turmas pelo número no início do nome
  const orderedClasses = [...classes].sort((a, b) => {
    const [numA, letraA] = parseTurma(a.nome);
    const [numB, letraB] = parseTurma(b.nome);
  
    if (numA !== numB) return numA - numB;
    return letraA.localeCompare(letraB);
  });
  

  // 2. Adicionar turma no backend
  const handleAddClass = async () => {
    const nomeFormatado = newClassName.trim().toLowerCase();
    if (!nomeFormatado) return;

    // Verifica se já existe turma com esse nome
    const exists = classes.some(
      (turma) => turma.nome.trim().toLowerCase() === nomeFormatado
    );
    if (exists) {
      toast.error("Já existe uma turma com esse nome!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/turmas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: newClassName }),
      });
      if (res.ok) {
        const turma = await res.json();
        setClasses((prev) => [...prev, { _id: turma.id, nome: newClassName }]);
        setNewClassName("");
        toast.success("Turma adicionada com sucesso!");
      } else {
        toast.error("Erro ao adicionar turma.");
      }
    } catch {
      toast.error("Erro de conexão com o servidor.");
    }
  };

  // 3. Remover turma no backend
  const handleDeleteClass = async (classId: string, className: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/turmas/${classId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setClasses((prev) => prev.filter((classItem) => classItem._id !== classId));
        toast.success(`Turma ${className} removida com sucesso!`);
      } else {
        toast.error("Erro ao remover turma.");
      }
    } catch {
      toast.error("Erro de conexão com o servidor.");
    }
  };

  const filteredClasses = orderedClasses.filter((classItem) =>
    classItem.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header (idêntico ao do Dashboard) */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gerenciamento de Turmas
              </h1>
              <p className="text-gray-600">Adicione ou remova turmas</p>
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
        {/* Actions Bar: nova turma + busca */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por turma..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Exemplo: 6º Ano A"
                  value={newClassName}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Se começa com dígito e não tem º, adiciona automaticamente
                    value = value.replace(/^(\d{1,2})(?!º)/, "$1º");
                    setNewClassName(value);
                  }}
                  className="max-w-xs"
                />
                <Button
                  onClick={handleAddClass}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Turma
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de turmas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              Lista de Turmas ({filteredClasses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Turma</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-gray-500">
                      Nenhuma turma encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClasses.map((classItem) => (
                    <TableRow key={classItem._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{classItem.nome}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
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
                                  Tem certeza que deseja remover a turma{" "}
                                  <strong>{classItem.nome}</strong>?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteClass(classItem._id, classItem.nome)
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

export default ClassesManagement;
