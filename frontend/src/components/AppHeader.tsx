import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, LogOut, Info } from "lucide-react";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <Button variant="outline" onClick={() => navigate("/")}>
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button variant="outline" onClick={() => navigate("/about-us")}>
          <Info className="w-4 h-4 mr-2" />
          Sobre Nós
        </Button>
        <Button variant="outline" onClick={() => navigate("/classes")}>
          <Users className="w-4 h-4 mr-2" />
          Gerenciar Turmas
        </Button>
        <Button variant="outline" onClick={() => navigate("/students")}>
          <Users className="w-4 h-4 mr-2" />
          Gerenciar Alunos
        </Button>
        <div className="flex-1" />
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AppHeader;
