
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Utensils, Activity, Pill, Brain, AlertTriangle } from "lucide-react";

interface HealthFiltersProps {
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

export const HealthFilters: React.FC<HealthFiltersProps> = ({ 
  activeFilters, 
  onFilterToggle 
}) => {
  const filters = [
    { 
      id: 'dietary', 
      label: 'Restrição alimentar', 
      icon: Utensils,
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      activeColor: 'bg-yellow-600 text-white hover:bg-yellow-700'
    },
    { 
      id: 'disability', 
      label: 'Deficiência', 
      icon: Activity,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      activeColor: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    { 
      id: 'medical', 
      label: 'Condição médica', 
      icon: Pill,
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      activeColor: 'bg-purple-600 text-white hover:bg-purple-700'
    },    
    { 
      id: 'psychological', 
      label: 'Acompanhamento psicológico', 
      icon: Brain,
      color: 'bg-green-100 text-green-700 border-green-200',
      activeColor: 'bg-green-600 text-white hover:bg-green-700'
    },
    {
      id: 'emergency',
      label: 'Protocolo de emergência',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-700 border-red-200',
      activeColor: 'bg-red-600 text-white hover:bg-red-700'
    }
    
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        const FilterIcon = filter.icon;
        
        return (
          <Badge 
            key={filter.id}
            variant="outline"
            className={`cursor-pointer py-1.5 px-3 ${isActive ? filter.activeColor : filter.color}`}
            onClick={() => onFilterToggle(filter.id)}
          >
            <FilterIcon className="w-4 h-4 mr-1.5" />
            {filter.label}
          </Badge>
        );
      })}
    </div>
  );
};
