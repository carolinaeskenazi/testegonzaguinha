
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  FileText, 
  Utensils, 
  AlertTriangle,
  Eye
} from "lucide-react";

export const RecentAlerts = () => {
  const navigate = useNavigate();
  
  const recentAlerts = [
    {
      id: '1',
      studentId: '001',
      studentName: 'Ana Clara Silva Santos',
      type: 'document',
      message: 'Novo laudo enviado',
      description: 'Atestado médico atualizado com diagnóstico de asma',
      date: '2024-05-20T10:25:00',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: '2',
      studentId: '005',
      studentName: 'Mariana Souza Rodrigues',
      type: 'diet',
      message: 'Restrição alimentar adicionada',
      description: 'Nova restrição: Sem glúten - Adicionada pelo responsável',
      date: '2024-05-19T15:30:00',
      icon: Utensils,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700'
    },
    {
      id: '3',
      studentId: '003',
      studentName: 'Gabriela Martins Oliveira',
      type: 'emergency',
      message: 'Protocolo de emergência ativado',
      description: 'Atualização do protocolo de emergência para crise alérgica',
      date: '2024-05-18T09:15:00',
      icon: AlertTriangle,
      color: 'bg-red-50 border-red-200 text-red-700'
    },
    {
      id: '4',
      studentId: '004',
      studentName: 'Lucas Almeida Fernandes',
      type: 'update',
      message: 'Informação atualizada',
      description: 'Atualização dos contatos de emergência pelo responsável',
      date: '2024-05-17T14:45:00',
      icon: Activity,
      color: 'bg-green-50 border-green-200 text-green-700'
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleViewProfile = (studentId: string) => {
    navigate('/student-profile');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Alertas Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentAlerts.map((alert) => {
          const AlertIcon = alert.icon;
          
          return (
            <div 
              key={alert.id} 
              className={`flex items-start gap-4 p-3 rounded-lg ${alert.color} border`}
            >
              <div className="rounded-full bg-white p-2">
                <AlertIcon className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{alert.message}</h4>
                  <Badge variant="outline" className="text-xs">
                    {formatDate(alert.date)}
                  </Badge>
                </div>
                <p className="text-sm mt-1">{alert.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">{alert.studentName}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleViewProfile(alert.studentId)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Ver Perfil
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
