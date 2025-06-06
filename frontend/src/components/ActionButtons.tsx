
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Plus, 
  FileText, 
  Bell, 
  Download,
  Upload,
  Calendar,
  MessageSquare
} from "lucide-react";

export const ActionButtons = () => {
  const handleEditInfo = () => {
    console.log("Editando informações do aluno");
  };

  const handleAddOccurrence = () => {
    console.log("Adicionando nova ocorrência");
  };

  const handleGenerateReport = () => {
    console.log("Gerando relatório PDF");
  };

  const handleNotifyGuardians = () => {
    console.log("Notificando responsáveis");
  };

  const handleUploadDocument = () => {
    console.log("Fazendo upload de documento");
  };

  const handleScheduleAppointment = () => {
    console.log("Agendando consulta/reunião");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5 text-blue-500" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 gap-2">
          <Button 
            onClick={handleEditInfo}
            className="justify-start bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Informações
          </Button>
          
          <Button 
            onClick={handleAddOccurrence}
            variant="outline"
            className="justify-start border-green-200 text-green-700 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Ocorrência
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={handleGenerateReport}
            variant="outline"
            size="sm"
            className="justify-start"
          >
            <FileText className="w-4 h-4 mr-1" />
            Relatório
          </Button>
          
          <Button 
            onClick={handleNotifyGuardians}
            variant="outline"
            size="sm"
            className="justify-start text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <Bell className="w-4 h-4 mr-1" />
            Notificar
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <Button 
            onClick={handleUploadDocument}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Documento
          </Button>
          
          <Button 
            onClick={handleScheduleAppointment}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Reunião
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Enviar Mensagem
          </Button>
        </div>

        {/* Emergency Action */}
        <div className="pt-2 border-t border-red-200">
          <Button 
            variant="destructive"
            size="sm"
            className="w-full"
          >
            <Bell className="w-4 h-4 mr-2" />
            Emergência - Contatar Agora
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
