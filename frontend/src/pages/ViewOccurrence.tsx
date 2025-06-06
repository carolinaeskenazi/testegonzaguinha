import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Activity, ArrowLeft } from "lucide-react";

const ViewOccurrence = () => {
  const { alunoId, occurrenceId } = useParams();
  const navigate = useNavigate();
  const [ocorrencia, setOcorrencia] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/ocorrencias/${occurrenceId}`)
      .then(res => setOcorrencia(res.data))
      .catch(err => {
        console.error("Erro ao carregar ocorrência:", err);
        alert("Erro ao carregar dados da ocorrência.");
        navigate(-1);
      });
  }, [occurrenceId, navigate]);

  if (!ocorrencia) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6 bg-white shadow-md rounded-2xl p-10">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            Ocorrência de Saúde
          </h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        </div>
  
        {/* Conteúdo */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Título da Ocorrência</Label>
              <Input value={ocorrencia.titulo} readOnly />
            </div>
            <div>
              <Label>Data da Ocorrência</Label>
              <Input value={new Date(ocorrencia.data).toLocaleDateString()} readOnly />
            </div>
          </div>
  
          <div>
            <Label>Descrição Detalhada</Label>
            <Textarea value={ocorrencia.descricao} readOnly />
          </div>
  
          <div>
            <Label>Registrado por</Label>
            <Input value={ocorrencia.registrado_por} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ViewOccurrence;
