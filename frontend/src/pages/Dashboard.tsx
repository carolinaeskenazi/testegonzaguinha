import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { HealthFilters } from "@/components/dashboard/HealthFilters";
import { StudentsList } from "@/components/dashboard/StudentsList";
import StatisticsCharts from "@/components/dashboard/StatisticsCharts";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Settings, Bell, Users, Home, Info } from "lucide-react";
import { useEffect } from "react";


const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [turmas, setTurmas] = useState<string[]>([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/turmas`);
        const data = await res.json();
        const nomes = Array.isArray(data)
          ? data
              .map((turma: any) => turma.nome)
              .sort((a: string, b: string) => {
                const parseTurma = (nome: string): [number, string] => {
                  const match = nome.match(/^(\d+)º Ano ([A-Z])$/);
                  if (!match || match.length < 3) return [0, 'Z']; // 'Z' joga turmas inválidas pro fim
                  return [parseInt(match[1]), match[2]];
                };
                
                const [numA, letraA] = parseTurma(a);
                const [numB, letraB] = parseTurma(b);

                if (numA !== numB) return numA - numB;
                return letraA.localeCompare(letraB);
              })
          : [];

        setTurmas(nomes);

      } catch (err) {
        console.error("Erro ao buscar turmas:", err);
      }
    };
  
    fetchTurmas();
  }, []);

  const handleFilterToggle = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard de Saúde dos Alunos</h1>
              <p className="text-gray-600">Visão geral e gerenciamento das informações de saúde</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/about-us')}
              >
                <Info className="w-4 h-4 mr-2" />
                Sobre Nós
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/classes')}
              >
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Turmas
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/students')}
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
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Summary Cards */}
        <SummaryCards />

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar aluno por nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Class Filter */}
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filtrar por turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as turmas</SelectItem>
                    {turmas.map((nomeTurma) => (
                      <SelectItem key={nomeTurma} value={nomeTurma}>
                        {nomeTurma}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Health Condition Filters */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Filtrar por condição de saúde:</h3>
                <HealthFilters 
                  activeFilters={activeFilters} 
                  onFilterToggle={handleFilterToggle} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Students List */}
          <div>
            <StudentsList 
              searchQuery={searchQuery}
              selectedClass={selectedClass}
              activeFilters={activeFilters}
            />
          </div>
        </div>

        {/* Statistics Charts */}
        <StatisticsCharts />
      </div>
    </div>
  );
};

export default Dashboard;
