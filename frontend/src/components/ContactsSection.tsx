
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  User, 
  AlertTriangle, 
  Stethoscope,
  MessageSquare
} from "lucide-react";

export const ContactsSection = () => {
  const contacts = {
    guardians: [
      {
        name: "Maria Silva Santos",
        relationship: "Mãe",
        phone: "(11) 99999-9999",
        email: "maria.silva@email.com",
        isEmergency: true
      },
      {
        name: "João Carlos Santos",
        relationship: "Pai",
        phone: "(11) 88888-8888",
        email: "joao.santos@email.com",
        isEmergency: false
      }
    ],
    emergency: {
      name: "Dra. Ana Beatriz (Pediatra)",
      phone: "(11) 3333-4444",
      email: "dra.ana@clinica.com"
    },
    support: [
      {
        name: "Psicóloga Sarah Lima",
        specialty: "Psicologia Escolar",
        phone: "(11) 5555-6666",
        email: "sarah@psicologo.com"
      }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-500" />
          Contatos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Guardians */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Responsáveis
          </h4>
          <div className="space-y-3">
            {contacts.guardians.map((guardian, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{guardian.name}</span>
                    {guardian.isEmergency && (
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Emergência
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline">{guardian.relationship}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3 h-3" />
                    <a href={`tel:${guardian.phone}`} className="hover:text-blue-600">
                      {guardian.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${guardian.email}`} className="hover:text-blue-600">
                      {guardian.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Ligar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    MSG
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Médico de Referência
          </h4>
          <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
            <span className="font-medium text-blue-900">{contacts.emergency.name}</span>
            <div className="space-y-1 mt-2">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Phone className="w-3 h-3" />
                <a href={`tel:${contacts.emergency.phone}`} className="hover:text-blue-800">
                  {contacts.emergency.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Mail className="w-3 h-3" />
                <a href={`mailto:${contacts.emergency.email}`} className="hover:text-blue-800">
                  {contacts.emergency.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Support Professionals */}
        {contacts.support.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Profissionais de Apoio</h4>
            <div className="space-y-2">
              {contacts.support.map((professional, index) => (
                <div key={index} className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-purple-900">{professional.name}</span>
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      {professional.specialty}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${professional.phone}`} className="hover:text-purple-800">
                        {professional.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <Mail className="w-3 h-3" />
                      <a href={`mailto:${professional.email}`} className="hover:text-purple-800">
                        {professional.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
