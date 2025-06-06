import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { name: "Gabriel Pradyumna", initials: "GP", photo: "/Prady.jpg" },
    { name: "Thaís Rocha",          initials: "M2", photo: "/Thais.jpg"  },
    { name: "Pedro Vargas",          initials: "M3", photo: "/Pedro.jpg"  },
    { name: "Enzo Perego",          initials: "M4", photo: "/Enzo.jpg"  },
    { name: "Fernando Boni",          initials: "M5", photo: "/Fernando.jpg"  },
    { name: "Carolina Eskenazi",          initials: "M6", photo: "/Carol.jpg"  },
    { name: "Gabriel Saraiva",          initials: "M7", photo: ""  },
    { name: "Membro 8",          initials: "M8", photo: "/imagens/membro8.png"  },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Sobre Nós</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Team Members Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center mb-6">Nossa Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 justify-items-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Aumentamos o Avatar para 24x24 em vez de 16x16 */}
                  <Avatar className="w-24 h-24 mb-2">
                    <AvatarImage src={member.photo} alt={member.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-gray-600 text-center">{member.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Description Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Quem Somos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Somos uma equipe dedicada ao desenvolvimento de soluções tecnológicas 
              para a área educacional, com foco especial na gestão escolar e 
              acompanhamento da saúde estudantil.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Este projeto nasceu de uma parceria da UNAS e o Centro de Estudos das 
              Cidades Arq.Futuro do Insper.
            </p>
            <p className="text-gray-700 leading-relaxed">
              O projeto foi desenvolvido ao longo do Sprint de Inovação Social do 3º 
              semestre do curso de Ciência da Computação, com o objetivo de criar uma 
              plataforma completa para gestão de informações escolares e monitoramento 
              da saúde dos estudantes.
            </p>
          </CardContent>
        </Card>

        {/* Organizations Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Organizações Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {/* Insper */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden mb-2">
                  <img
                    src="Insper.png"
                    alt="Insper"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">Insper</p>
              </div>
              
              {/* Centro de Estudos das Cidades */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden mb-2">
                  <img
                    src="/logos/centro_cidades.svg"
                    alt="Centro de Estudos das Cidades"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Centro de Estudos das Cidades
                </p>
              </div>
              
              {/* UNAS */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden mb-2">
                  <img
                    src="UNAS.jpeg"
                    alt="UNAS"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">UNAS</p>
              </div>
              
              {/* Arq.Futuro do Insper */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden mb-2">
                  <img
                    src="Arq_Futuro.jpg"
                    alt="Arq.Futuro do Insper"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">Arq.Futuro do Insper</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
