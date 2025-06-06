// src/components/HealthCards.jsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Utensils,
  Pill,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";

export const HealthCards = ({ student }) => {
  // -------------------------------------------------------
  // 1) Quadro Clínico (cada condição vira um badge)
  // -------------------------------------------------------
  // student.quadroClinico: ex. "Asma, Miopia, Cancer de pancreas"
  const quadroClinicoRaw = (student.quadroClinico ?? "").trim();

  // Se a string não estiver vazia, quebramos por vírgula e geramos um array:
  // ["Asma", "Miopia", "Cancer de pancreas"]
  const quadroClinicoArray = quadroClinicoRaw
    ? quadroClinicoRaw
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

  // -------------------------------------------------------
  // 2) Restrições Alimentares
  // -------------------------------------------------------
  const dietaryRestrictionsString = student.dietaryRestrictions ?? "";
  const restrictionsArray = dietaryRestrictionsString
    .split(",")
    .map((r) => r.trim())
    .filter((r) => r.length > 0);

  // -------------------------------------------------------
  // 3) Medicamentos
  // -------------------------------------------------------
  const medicationsString = student.medications ?? "";
  const medicationsArray = medicationsString
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m.length > 0);

  // -------------------------------------------------------
  // 4) Ações Emergenciais
  // -------------------------------------------------------
  const emergencyProcedure = (student.emergencyActions ?? "").trim();
  const emergencyContactName = student.guardianName ?? "";
  const emergencyContactPhone = student.guardianPhone ?? "";

  // -------------------------------------------------------
  // 5) Função auxiliar para classes de cor nos Badges
  // -------------------------------------------------------
  const getColorClasses = (color) => {
    const colors = {
      red: "bg-red-50 text-red-700 border-red-200",
      yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      green: "bg-green-50 text-green-700 border-green-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200",
      orange: "bg-orange-50 text-orange-700 border-orange-200",
    };
    return colors[color] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  // -------------------------------------------------------
  // 6) Cores “fixas” para cada tipo de badge
  // -------------------------------------------------------
  const colorForCondition = "yellow";      // amarelo para cada condição do quadro clínico
  const colorForRestriction = "red";
  const colorForMedication = "purple";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* ===========================
           1) Quadro Clínico (agora com badges)
         =========================== */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-blue-500" />
            Quadro Clínico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quadroClinicoArray.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {quadroClinicoArray.map((cond, idx) => (
                <Badge
                  key={`cond-${idx}`}
                  variant="outline"
                  className={getColorClasses(colorForCondition)}
                >
                  {cond}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhum quadro clínico registrado
            </p>
          )}
        </CardContent>
      </Card>

      {/* ===========================
           2) Restrições Alimentares
         =========================== */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Utensils className="w-4 h-4 text-green-500" />
            Restrições Alimentares
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {restrictionsArray.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {restrictionsArray.map((restr, idx) => (
                <Badge
                  key={`restr-${idx}`}
                  variant="outline"
                  className={getColorClasses(colorForRestriction)}
                >
                  {restr}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhuma restrição registrada
            </p>
          )}
        </CardContent>
      </Card>

      {/* ===========================
           3) Medicamentos
         =========================== */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Pill className="w-4 h-4 text-purple-500" />
            Medicamentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {medicationsArray.length > 0 ? (
            <div className="flex flex-col gap-2">
              {medicationsArray.map((med, idx) => (
                <div key={`med-${idx}`} className="text-xs">
                  <Badge
                    variant="outline"
                    className={getColorClasses(colorForMedication)}
                  >
                    {med}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhum medicamento registrado
            </p>
          )}
        </CardContent>
      </Card>

      {/* ===========================
           4) Ações Emergenciais
         =========================== */}
      <Card className="hover:shadow-md transition-shadow border-red-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Ações Emergenciais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {emergencyContactName || emergencyContactPhone ? (
            <div className="text-xs">
              <p className="font-medium text-gray-900">
                {emergencyContactName || "—"}
              </p>
              <p className="text-blue-600">
                {emergencyContactPhone || "—"}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhum contato emergencial
            </p>
          )}

          {emergencyProcedure ? (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
              <p className="text-xs text-red-800">{emergencyProcedure}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhuma instrução emergencial
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
