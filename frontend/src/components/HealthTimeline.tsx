
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, AlertTriangle, Clock } from "lucide-react";

export const HealthTimeline = () => {
  const timeline = [
    {
      id: 1,
      date: "2024-03-20",
      type: "absence",
      title: "Falta por gripe",
      description: "Atestado médico de 2 dias - Dr. João Silva",
      severity: "low",
      hasDocument: true
    },
    {
      id: 2,
      date: "2024-03-15",
      type: "occurrence",
      title: "Mal-estar durante educação física",
      description: "Aluna relatou tontura. Liberada para descanso.",
      severity: "medium",
      hasDocument: false
    },
    {
      id: 3,
      date: "2024-03-10",
      type: "emergency",
      title: "Crise asmática",
      description: "Bombinha aplicada. Responsável contatado. Aluna liberada após melhora.",
      severity: "high",
      hasDocument: true
    },
    {
      id: 4,
      date: "2024-03-05",
      type: "absence",
      title: "Consulta oftalmológica",
      description: "Falta justificada para consulta de rotina",
      severity: "low",
      hasDocument: true
    }
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "low":
        return { color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" };
      case "medium":
        return { color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" };
      case "high":
        return { color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" };
      default:
        return { color: "bg-gray-500", textColor: "text-gray-700", bgColor: "bg-gray-50" };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "absence":
        return Calendar;
      case "occurrence":
        return Clock;
      case "emergency":
        return AlertTriangle;
      default:
        return FileText;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Histórico de Saúde e Ocorrências
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((event, index) => {
            const severityConfig = getSeverityConfig(event.severity);
            const TypeIcon = getTypeIcon(event.type);
            
            return (
              <div key={event.id} className="relative">
                {index < timeline.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${severityConfig.bgColor} flex items-center justify-center`}>
                    <TypeIcon className={`w-5 h-5 ${severityConfig.textColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </Badge>
                          {event.hasDocument && (
                            <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                              <FileText className="w-3 h-3 mr-1" />
                              Documento
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className={`w-3 h-3 rounded-full ${severityConfig.color} flex-shrink-0 mt-1`}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
