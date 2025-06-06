
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, BarChart3, Bell, Heart, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Book className="w-8 h-8 text-blue-500" />,
      title: "Gestão de Turmas",
      description: "Organize e gerencie suas turmas escolares de forma eficiente"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Controle de Alunos",
      description: "Acompanhe informações detalhadas de cada estudante"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Saúde dos Alunos",
      description: "Monitore a saúde e bem-estar dos estudantes"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
      title: "Relatórios",
      description: "Gere relatórios detalhados sobre frequência e saúde"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Gestão Escolar</h1>
              <p className="text-gray-600 mt-2">Gerencie alunos, turmas e acompanhe a saúde estudantil</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Acessar Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Sistema de Gestão Escolar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma completa para gerenciar informações de alunos, turmas e 
            acompanhar a saúde e bem-estar dos estudantes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Acesso Rápido</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="h-16 text-lg bg-blue-600 hover:bg-blue-700"
            >
              <BarChart3 className="w-6 h-6 mr-3" />
              Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/students')}
              variant="outline"
              className="h-16 text-lg border-2 hover:bg-gray-50"
            >
              <Users className="w-6 h-6 mr-3" />
              Gerenciar Alunos
            </Button>
            <Button 
              onClick={() => navigate('/classes')}
              variant="outline"
              className="h-16 text-lg border-2 hover:bg-gray-50"
            >
              <Book className="w-6 h-6 mr-3" />
              Gerenciar Turmas
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Alunos Cadastrados</p>
                  <p className="text-3xl font-bold">1,234</p>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Turmas Ativas</p>
                  <p className="text-3xl font-bold">42</p>
                </div>
                <Book className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Relatórios Gerados</p>
                  <p className="text-3xl font-bold">89</p>
                </div>
                <BarChart3 className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
