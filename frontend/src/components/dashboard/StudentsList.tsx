// src/components/dashboard/StudentsList.tsx (ou .jsx)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Utensils, Pill, Brain, AlertTriangle, Eye } from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  shift: string;          // ← Adicionado aqui
  image: string;
  conditions: string[];
  medicalStatus: string;
}

interface StudentsListProps {
  searchQuery: string;
  selectedClass: string;
  activeFilters: string[];
}

export const StudentsList: React.FC<StudentsListProps> = ({
  searchQuery,
  selectedClass,
  activeFilters,
}) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/alunos`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(
          data.map((aluno: any) => ({
            id: aluno._id,
            name: aluno.name,
            class: aluno.class,
            shift: aluno.shift || "",          // ← Mapeando o turno
            image: aluno.image,
            conditions: aluno.conditions || [],
            medicalStatus: aluno.medicalStatus || "",
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos:", error);
        setLoading(false);
      });
  }, []);

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case "dietary":
        return { icon: Utensils, color: "text-yellow-500", tooltip: "Restrição Alimentar" };
      case "disability":
        return { icon: Activity, color: "text-blue-500", tooltip: "Deficiência" };
      case "medical":
        return { icon: Pill, color: "text-purple-500", tooltip: "Condição Médica" };
      case "psychological":
        return { icon: Brain, color: "text-green-500", tooltip: "Acompanhamento Psicológico" };
      default:
        return { icon: Activity, color: "text-gray-500", tooltip: "Outro" };
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;

    const matchesFilters = activeFilters.every((filter) => {
      if (filter === "emergency") {
        return student.medicalStatus?.trim().toLowerCase() === "emergencial";
      }
      return student.conditions?.includes(filter);
    });

    return matchesSearch && matchesClass && matchesFilters;
  });

  const handleViewProfile = (studentId: string) => {
    navigate(`/student-profile/${studentId}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Lista de Alunos com Registros de Saúde
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Aluno</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead>Turno</TableHead>           {/* ← Nova coluna Turno */}
              <TableHead>Condições</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Carregando alunos...
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Nenhum aluno encontrado com os filtros selecionados.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  {/* Coluna "Aluno" */}
                  <TableCell className="flex items-center gap-3">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{student.name}</div>
                      {student.medicalStatus?.trim().toLowerCase() === "emergencial" && (
                        <Badge
                          variant="outline"
                          className="text-red-600 border-red-200 flex items-center gap-1 text-xs py-0 mt-1"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          Protocolo de emergência
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  {/* Coluna "Turma" */}
                  <TableCell>
                    <Badge variant="outline" className="text-gray-600">
                      {student.class}
                    </Badge>
                  </TableCell>

                  {/* Coluna "Turno" (novo) */}
                  <TableCell>
                    <Badge variant="outline" className="text-gray-600">
                      {student.shift || "—"}
                    </Badge>
                  </TableCell>

                  {/* Coluna "Condições" */}
                  <TableCell>
                    <div className="flex gap-1.5">
                      {student.conditions.map((condition, index) => {
                        const { icon: CondIcon, color, tooltip } = getConditionIcon(condition);
                        return (
                          <span
                            key={index}
                            className={`rounded-full p-1.5 bg-gray-100 ${color}`}
                            title={tooltip}
                          >
                            <CondIcon className="w-3 h-3" />
                          </span>
                        );
                      })}
                    </div>
                  </TableCell>

                  {/* Coluna "Ações" */}
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(student.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
