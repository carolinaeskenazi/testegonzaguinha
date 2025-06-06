import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TableRow 
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
import { Plus, Search, Edit, Trash2, Users, ArrowLeft, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import AppHeader from "@/components/AppHeader";

const ClassesManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [newClassName, setNewClassName] = useState("");

  // 1. Buscar turmas do backend
  useEffect(() => {
    fetch("http://localhost:5001/api/turmas")
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(() => setClasses([]));
  }, []);

  // Função para extrair o número do início do nome da turma
  function getTurmaNumero(nome: string) {
    const match = nome.match(/^(\d{1,2})/);
    return match ? parseInt(match[1], 10) : 99; // 99 para turmas sem número, vão para o final
  }

  // Ordena as turmas pelo número no início do nome
  const orderedClasses = [...classes].sort((a, b) => {
    return getTurmaNumero(a.nome) - getTurmaNumero(b.nome);
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
      const res = await fetch("http://localhost:5001/api/turmas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: newClassName }),
      });
      if (res.ok) {
        const turma = await res.json();
        setClasses(prev => [...prev, { _id: turma.id, nome: newClassName }]);
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
      const res = await fetch(`http://localhost:5001/api/turmas/${classId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setClasses(prev => prev.filter(classItem => classItem._id !== classId));
        toast.success(`Turma ${className} removida com sucesso!`);
      } else {
        toast.error("Erro ao remover turma.");
      }
    } catch {
      toast.error("Erro de conexão com o servidor.");
    }
  };

  const filteredClasses = orderedClasses.filter(classItem =>
    classItem.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getOccupancyColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 95) return "bg-red-100 text-red-700";
    if (percentage >= 80) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <>
      <AppHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Turmas</h1>
              <p className="text-gray-600">Adicione ou remova turmas</p>
            </div>
          </div>

          {/* Actions Bar */}
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
                      // Regex: se começa com 1 ou 2 dígitos e não tem º, adiciona
                      value = value.replace(/^(\d{1,2})(?!º)/, '$1º');
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

          {/* Classes Table */}
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
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remover
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja remover a turma <strong>{classItem.nome}</strong>? 
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteClass(classItem._id, classItem.nome)}
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
    </>
  );
};

export default ClassesManagement;
