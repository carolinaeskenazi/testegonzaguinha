import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ArrowRight, User } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { name: "Gabriel Pradyumna", photo: "/Prady.jpg", linkedin: "https://www.linkedin.com/in/gabriel-pradyumna" },
    { name: "Thaís Rocha",       photo: "/Thais.jpg", linkedin: "https://www.linkedin.com/in/thais-silveira-4488852ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
    { name: "Pedro Vargas",      photo: "/Pedro.jpg", linkedin: "https://www.linkedin.com/in/pedro-henrique-vargas-sepulveda-a139b62b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
    { name: "Enzo Perego",       photo: "/Enzo.jpg",  linkedin: "https://www.linkedin.com/in/enzo-rios-perego-426b50304/" },
    { name: "Fernando Boni",     photo: "/Fernando.jpg", linkedin: "https://br.linkedin.com/in/fernando-boni-019587268" },
    { name: "Carolina Eskenazi", photo: "/Carol.jpg",    linkedin: "https://www.linkedin.com/in/carolina-eskenazi-269446302?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { name: "Gabriel Saraiva",   photo: "/Gabriel.jpg",  linkedin: "https://www.linkedin.com/in/gabriel-saraiva" },
    { name: "Yaz Nascimento",    photo: "/Yaz.jpg",      linkedin: "https://www.linkedin.com/in/yaz-nascimento" },
  ];
  

  // Índice do primeiro membro a ser exibido no carrossel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Função para ir para a direita (se possível)
  const handleNext = () => {
    if (currentIndex < teamMembers.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Função para ir para a esquerda (se possível)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Slice de 4 membros a partir de currentIndex
  const visibleMembers = teamMembers.slice(currentIndex, currentIndex + 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
          <Button onClick={() => navigate("/")} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Sobre Nós</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* CARROSSEL DA EQUIPE (fundo branco) */}
        <Card className="relative overflow-visible bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center mb-2 font-semibold">
              Nossa Equipe
            </CardTitle>
          </CardHeader>

          <CardContent className="relative flex items-center justify-center py-8">
            {/* Botão anterior */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`
                absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 
                items-center justify-center rounded-full bg-white shadow-md
                transition hover:bg-gray-100 
                ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Container dos 4 avatares visíveis */}
            <div className="mx-8 flex space-x-8">
              {visibleMembers.map((member, idx) => (
                <div
                  key={currentIndex + idx}
                  className="group flex flex-col items-center transform transition duration-300 hover:scale-105"
                >
                  <div className="relative">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    <Avatar className="w-32 h-32 ring-4 ring-white shadow-lg hover:ring-indigo-500 transition">
                      <AvatarImage src={member.photo} alt={member.name} className="object-cover" />
                      <AvatarFallback className="bg-indigo-100 text-indigo-600">
                        <User className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-indigo-200 opacity-0 transition-opacity group-hover:opacity-20" />
                  </a>

                  </div>
                  <p className="mt-3 text-base text-gray-700 text-center font-medium">
                    {member.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Botão próximo */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= teamMembers.length - 4}
              className={`
                absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 
                items-center justify-center rounded-full bg-white shadow-md
                transition hover:bg-gray-100
                ${currentIndex >= teamMembers.length - 4 ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              <ArrowRight className="w-6 h-6 text-gray-700" />
            </button>
          </CardContent>

          {/* Indicadores (bullets) */}
          <div className="flex justify-center space-x-2 pb-6">
            {teamMembers.map((_, i) => {
              const isActive = i >= currentIndex && i < currentIndex + 4;
              return (
                <span
                  key={i}
                  className={`
                    inline-block h-2.5 w-2.5 rounded-full transition 
                    ${isActive 
                      ? "bg-indigo-600 animate-pulse" 
                      : "bg-gray-300 hover:bg-gray-400"} 
                  `}
                />
              );
            })}
          </div>
        </Card>

        {/* Seção “Quem Somos” */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Quem Somos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Somos uma equipe dedicada ao desenvolvimento de soluções tecnológicas 
              para a área educacional, com foco especial na gestão escolar e 
              acompanhamento da saúde estudantil.
            </p>
            <p>
              Este projeto nasceu de uma parceria da UNAS e o Centro de Estudos das 
              Cidades Arq.Futuro do Insper.
            </p>
            <p>
              O projeto foi desenvolvido ao longo do Sprint de Inovação Social do 3º 
              semestre do curso de Ciência da Computação, com o objetivo de criar uma 
              plataforma completa para gestão de informações escolares e monitoramento 
              da saúde dos estudantes.
            </p>
          </CardContent>
        </Card>

        {/* Seção “Organizações Participantes” (sem contorno ao redor dos logos) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center font-semibold">
              Organizações Participantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {/* Insper */}
              <div className="text-center">
                <div className="w-36 h-36 rounded-xl overflow-hidden mb-2 bg-white p-4 shadow">
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
                <div className="w-40 h-36 rounded-xl overflow-hidden mb-2 bg-white p-4 shadow">
                  <img
                    src="Logo_insper_arqfuturo.png"
                    alt="Centro de Estudos das Cidades"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Centro de Estudos das Cidades
                </p>
              </div>

              {/* UNAS */}
              <div className="text-center">
                <div className="w-36 h-36 rounded-xl overflow-hidden mb-2 bg-white p-4 shadow">
                  <img
                    src="UNAS.jpeg"
                    alt="UNAS"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">UNAS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
