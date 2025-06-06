import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Utensils, Activity, Pill, Brain, AlertTriangle } from "lucide-react";

interface AlunosSummaryResponse {
  totalAlunos: number;

  totalWithMedicalInfo: number;

  withDietaryRestrictions: number;

  withDeficiencies: number;

  withRelevantMedicalCondition: number;

  withPsychologicalFollowUp: number;

  withEmergencyProtocols: number;
}

interface SummaryCardItem {
  title: string;
  value: number;
  percentage: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}

export const SummaryCards: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/alunos/summary");
        if (!res.ok) {
          throw new Error(`Erro ao buscar resumo: ${res.status}`);
        }
        const data: AlunosSummaryResponse = await res.json();

        // Monta o array de cards com base no JSON recebido:
        const cards: SummaryCardItem[] = [
          {
            title: "Total de alunos com informações médicas",
            value: data.totalAlunos,
            percentage: 100,
            label: "do total de alunos",
            icon: Heart,
            iconColor: "text-red-500",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
          },
          {
            title: "Com restrições alimentares",
            value: data.withDietaryRestrictions,
            percentage: data.totalAlunos > 0 ? Math.round((data.withDietaryRestrictions / data.totalAlunos) * 100) : 0,
            label: "dos alunos registrados",
            icon: Utensils,
            iconColor: "text-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
          },
          {
            title: "Com deficiências",
            value: data.withDeficiencies,
            percentage: data.totalAlunos > 0 ? Math.round((data.withDeficiencies / data.totalAlunos) * 100) : 0,
            label: "dos alunos registrados",
            icon: Activity,
            iconColor: "text-blue-500",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
          },
          {
            title: "Com condições médicas relevantes",
            value: data.withRelevantMedicalCondition,
            percentage: data.totalAlunos > 0 ? Math.round((data.withRelevantMedicalCondition / data.totalAlunos) * 100) : 0,
            label: "dos alunos registrados",
            icon: Pill,
            iconColor: "text-purple-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
          },
          {
            title: "Com acompanhamento psicológico",
            value: data.withPsychologicalFollowUp,
            percentage: data.totalAlunos > 0 ? Math.round((data.withPsychologicalFollowUp / data.totalAlunos) * 100) : 0,
            label: "dos alunos registrados",
            icon: Brain,
            iconColor: "text-green-500",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
          },
          {
            title: "Protocolos de emergência ativos",
            value: data.withEmergencyProtocols,
            percentage: data.totalAlunos > 0 ? Math.round((data.withEmergencyProtocols / data.totalAlunos) * 100) : 0,
            label: "dos alunos registrados",
            icon: AlertTriangle,
            iconColor: "text-red-500",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
          },
        ];

        setSummaryData(cards);
      } catch (error) {
        console.error("Erro ao buscar dados de summary:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) {
    return <p>Carregando dados dos alunos…</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {summaryData.map((item, index) => {
        const ItemIcon = item.icon;
        return (
          <Card
            key={index}
            className={`border ${item.borderColor} hover:shadow-md transition-shadow`}
          >
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className={`${item.bgColor} p-3 rounded-full mr-4`}>
                  <ItemIcon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.percentage}% {item.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
