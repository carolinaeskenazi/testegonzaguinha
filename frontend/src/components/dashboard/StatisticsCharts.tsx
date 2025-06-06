import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Aluno {
  _id: string;
  age: number;
  attendancePercentage: number;
  class: string;
  conditions: string[];
  created_at: string;
  medicalStatus: string;
  dietaryRestrictions: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatisticsCharts: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/alunos`)
      .then((res) => res.json())
      .then((data: Aluno[]) => {
        setAlunos(data);
        setLoading(false);
      });
  }, []);

  // --- Dados para gráfico de pizza ---
  const conditionTotals = {
    disability: 0,
    dietary: 0,
    emergency: 0,
    psychological: 0,
  };

  alunos.forEach((aluno) => {
    const conds = aluno.conditions || [];
    if (conds.includes("disability")) conditionTotals.disability++;
    if (conds.includes("dietary")) conditionTotals.dietary++;
    if (aluno.medicalStatus === "Emergencial") conditionTotals.emergency++;
    if (conds.includes("psychological")) conditionTotals.psychological++;
  });

  const pieData = Object.entries(conditionTotals)
    .map(([key, value]) => ({
      name:
        key === "disability"
          ? "Deficiência"
          : key === "dietary"
          ? "Dietas"
          : key === "emergency"
          ? "Emergencial"
          : "Psicológico",
      value,
    }))
    .filter((item) => item.value > 0);

  // --- Dados para gráfico de barras ---
  interface TurmaStats {
    [turma: string]: {
      disability: number;
      dietary: number;
      emergency: number;
      psychological: number;
    };
  }

  const turmaStats: TurmaStats = {};

  alunos.forEach((aluno) => {
    const turma = aluno.class || "Sem turma";
    if (!turmaStats[turma]) {
      turmaStats[turma] = { disability: 0, dietary: 0, emergency: 0, psychological: 0 };
    }
    const conds = aluno.conditions || [];
    if (conds.includes("disability")) turmaStats[turma].disability++;
    if (conds.includes("dietary")) turmaStats[turma].dietary++;
    if (aluno.medicalStatus === "Emergencial") turmaStats[turma].emergency++;
    if (conds.includes("psychological")) turmaStats[turma].psychological++;
  });

  const parseTurma = (nome: string): [number, string] => {
    const match = nome.match(/^(\d{1,2})º Ano ([A-Z])$/);
    if (!match || match.length < 3) return [99, "Z"];
    return [parseInt(match[1]), match[2]];
  };
  
  const barData = Object.entries(turmaStats)
    .map(([turma, stats]) => ({
      turma,
      ...stats,
    }))
    .sort((a, b) => {
      const [numA, letraA] = parseTurma(a.turma);
      const [numB, letraB] = parseTurma(b.turma);
      if (numA !== numB) return numA - numB;
      return letraA.localeCompare(letraB);
    });
  

  // --- Dados para gráfico de linha ---
  const registroPorMes: Record<string, number> = {};

  alunos.forEach((aluno) => {
    const date = new Date(aluno.created_at);
    const month = date.toISOString().slice(0, 7);
    registroPorMes[month] = (registroPorMes[month] || 0) + 1;
  });

  const lineData = Object.entries(registroPorMes)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({
      month,
      count,
    }));

  if (loading)
    return (
      <Card>
        <CardContent>
          <div className="text-center py-8 text-gray-500">Carregando dados...</div>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estatísticas dos Alunos</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Dois primeiros gráficos lado a lado */}
        <div className="flex flex-wrap justify-center gap-10 mb-10">
          <div>
            <h3 className="text-center font-medium mb-2">Distribuição por Condição</h3>
            <PieChart width={350} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>

          <div>
            <h3 className="text-center font-medium mb-2">Condições por Turma</h3>
            <BarChart width={600} height={300} data={barData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turma" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="disability" stackId="a" fill="#0088FE" name="Deficiência" />
              <Bar dataKey="dietary" stackId="a" fill="#00C49F" name="Dietas" />
              <Bar dataKey="emergency" stackId="a" fill="#FFBB28" name="Emergencial" />
              <Bar dataKey="psychological" stackId="a" fill="#FF8042" name="Psicológico" />
            </BarChart>
          </div>
        </div>

        {/* Gráfico de linha centralizado embaixo */}
        <div className="flex justify-center">
          <div>
            <h3 className="text-center font-medium mb-2">Novos Registros por Mês</h3>
            <LineChart
              width={700}
              height={300}
              data={lineData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Novos Registros" />
            </LineChart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCharts;
