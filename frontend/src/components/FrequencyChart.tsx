
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface FrequencyChartProps {
  student: {
    attendance: number;
    medicalAbsences: number;
    totalAbsences: number;
  };
}

export const FrequencyChart: React.FC<FrequencyChartProps> = ({ student }) => {
  const medicalAbsencePercentage = (student.medicalAbsences / student.totalAbsences) * 100;
  const otherAbsencePercentage = 100 - medicalAbsencePercentage;
  const presencePercentage = student.attendance;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Frequência e Impacto na Saúde
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Attendance */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Frequência Geral</span>
            <span className="text-sm font-bold text-green-600">{presencePercentage}%</span>
          </div>
          <Progress value={presencePercentage} className="h-3" />
        </div>

        {/* Absence Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">{student.medicalAbsences}</div>
            <div className="text-sm text-red-700">Faltas Médicas</div>
            <div className="text-xs text-red-600 mt-1">
              {medicalAbsencePercentage.toFixed(1)}% do total
            </div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {student.totalAbsences - student.medicalAbsences}
            </div>
            <div className="text-sm text-orange-700">Outras Faltas</div>
            <div className="text-xs text-orange-600 mt-1">
              {otherAbsencePercentage.toFixed(1)}% do total
            </div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{student.totalAbsences}</div>
            <div className="text-sm text-blue-700">Total de Faltas</div>
            <div className="text-xs text-blue-600 mt-1">
              {(100 - student.attendance).toFixed(1)}% do período
            </div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Análise de Tendência</h4>
          
          <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <TrendingUp className="w-5 h-5 text-yellow-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                Aumento de faltas médicas
              </p>
              <p className="text-xs text-yellow-700">
                53% das faltas são por motivos de saúde (acima da média de 30%)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Frequência ainda dentro do aceitável
              </p>
              <p className="text-xs text-green-700">
                92% de presença está acima do mínimo exigido (75%)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
