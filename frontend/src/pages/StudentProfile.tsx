// src/pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { HealthCards } from "@/components/HealthCards";
import { 
  Heart, 
  Activity, 
  Clock, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  User,
  Stethoscope,
  FileText,
  Plus,
  Filter,
  Download,
  MapPin            // ← Ícone importado
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { set } from 'date-fns';

const StudentProfile = () => {
  // captura o ID do aluno a partir da URL
  const { alunoId,file_id } = useParams();
  const navigate = useNavigate();

  // estados para armazenar dados do aluno, loading e erro
  const [student, setStudent] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [errorStudent, setErrorStudent] = useState(null);

  // estado para ocorrências de saúde
  const [occurrences, setOccurrences] = useState([]);
  const [laudos, setLaudos] = useState([]);


  // filtros de relatório (opcionais)
  const [reportFilters, setReportFilters] = useState({
    dateRange: '',
    reportType: '',
    includeHealth: true,
    includeProjects: true,
    includeReports: true,
    includeActivities: true,
    includeReportsAndReferrals: true,
    includeOccurrences: true
  });

  const [form, setForm] = useState({
    tipo_sanguineo: "",
    alergias: "",
    medicamentos: "",
    contato_emergencia: "",
    observacoes_medicas: ""
  });
  const [fichaExiste, setFichaExiste] = useState(false);
  
  useEffect(() => {
    axios.get(`http://localhost:5001/api/alunos/${alunoId}/ficha-saude`)
      .then(res => {
        setForm(res.data);
        setFichaExiste(true);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setFichaExiste(false);
        } else {
          console.error("Erro ao buscar ficha:", err);
        }
      });
  }, [alunoId]);

  const handleDeleteOccurrence = async (occurrenceId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar esta ocorrência?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:5001/api/alunos/${alunoId}/ocorrencias/${occurrenceId}`);
      setOccurrences(prev => prev.filter(o => o._id !== occurrenceId));
      alert("Ocorrência deletada com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar ocorrência:", error);
      alert("Erro ao deletar ocorrência.");
    }
  };
  
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async () => {
    try {
      if (fichaExiste) {
        await axios.put(`http://localhost:5001/api/alunos/${alunoId}/ficha-saude`, form);
      } else {
        await axios.post(`http://localhost:5001/api/alunos/${alunoId}/ficha-saude`, form);
        setFichaExiste(true);
      }
      alert("Ficha de saúde salva com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar ficha:", err);
      alert("Erro ao salvar ficha de saúde");
    }
  };

  // busca os dados do aluno no backend
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const resp = await axios.get(`http://localhost:5001/api/alunos/${alunoId}`);
        setStudent(resp.data);
      } catch (err) {
        console.error("Erro ao buscar aluno:", err);
        setErrorStudent("Não foi possível carregar dados do aluno.");
      } finally {
        setLoadingStudent(false);
      }
    };
    if (alunoId) {
      fetchStudent();
    }
  }, [alunoId]);

  // busca as ocorrências de saúde do aluno
  useEffect(() => {
    const fetchOccurrences = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/alunos/${alunoId}/ocorrencias`
        );
        setOccurrences(response.data);
      } catch (error) {
        console.error('Erro ao buscar ocorrências:', error);
      }
    };
    if (alunoId) {
      fetchOccurrences();
    }
  }, [alunoId]);
  useEffect(() => {
    const fetchLaudos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/alunos/${alunoId}/laudos`
        );
        setLaudos(response.data);
      } catch (error) {
        console.error('Erro ao buscar laudos:', error);
      }
    };
    if (alunoId) {
      fetchLaudos();
    }
  }, [alunoId]);

  const deleteLaudo = async (file_id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/alunos/${alunoId}/laudos/${file_id}`);
      
      
      setLaudos((prevLaudos) => prevLaudos.filter((laudo) => laudo.file_id !== file_id));
      
    } catch (error) {
      console.error('Erro ao deletar laudo:', error);
      alert('Erro ao deletar o laudo.');
    }
  };



  // bloco de loading
  if (loadingStudent) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Carregando informações do aluno…</span>
      </div>
    );
  }

  // bloco de erro
  if (errorStudent) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 mb-4">{errorStudent}</p>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  // caso aluno não exista
  if (!student || !student._id) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Aluno não encontrado.</p>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  // ============================================
  // Função getStatusConfig adaptada para os três
  // possíveis valores vindos do dropdown:
  //   "Regular"       → cor verde
  //   "Acompanhamento"→ cor amarela
  //   "Emergencial"   → cor vermelha
  // Caso não bata com nenhum, usa cinza (Indefinido)
  // ============================================
  const getStatusConfig = (medicalStatus) => {
    switch (medicalStatus) {
      case "Regular":
        return { 
          color: "bg-green-500", 
          textColor: "text-green-700",
          bgColor: "bg-green-50",
          icon: CheckCircle,
          label: "Regular" 
        };
      case "Acompanhamento":
        return { 
          color: "bg-yellow-500", 
          textColor: "text-yellow-700",
          bgColor: "bg-yellow-50",
          icon: AlertTriangle,
          label: "Acompanhamento" 
        };
      case "Emergencial":
        return { 
          color: "bg-red-500", 
          textColor: "text-red-700",
          bgColor: "bg-red-50",
          icon: AlertTriangle,
          label: "Emergencial" 
        };
      default:
        return { 
          color: "bg-gray-500", 
          textColor: "text-gray-700",
          bgColor: "bg-gray-50",
          icon: Activity,
          label: "Indefinido" 
        };
    }
  };

  // chama getStatusConfig passando exatamente o "student.medicalStatus"
  const statusConfig = getStatusConfig(student.medicalStatus);
  const StatusIcon = statusConfig.icon;

  const handleDeleteClick = (file_id: string) => {
  if (confirm('Tem certeza que deseja deletar este laudo?')) {
    deleteLaudo(file_id);
  }
};

  // gera o relatório PDF usando alunoId dinâmico
  const gerarRelatorioPDF = async () => {
    const incluir = {
      responsavel: reportFilters.includeHealth,
      saude: reportFilters.includeProjects,
      projetos: reportFilters.includeReports,
      atividades: reportFilters.includeActivities,
      laudos: reportFilters.includeReportsAndReferrals,
      ocorrencias: reportFilters.includeOccurrences
    };

    const response = await fetch(
      `http://localhost:5001/api/alunos/${alunoId}/relatorios/pdf`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incluir })
      }
    );

    if (!response.ok) {
      alert("Erro ao gerar relatório");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const nome = student.name.replace(/\s+/g, '_');
    const turma = student.class.replace(/\s+/g, '_');
    link.download = `relatorio_${nome}_${turma}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // visualiza prévia do relatório PDF usando alunoId
  
  const visualizarRelatorioPDF = async () => {
    const incluir = {
      responsavel: reportFilters.includeHealth,
      saude: reportFilters.includeProjects,
      projetos: reportFilters.includeReports,
      atividades: reportFilters.includeActivities,
      laudos: reportFilters.includeReportsAndReferrals,
      ocorrencias: reportFilters.includeOccurrences
    };

    const response = await fetch(
      `http://localhost:5001/api/alunos/${alunoId}/relatorios/preview`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incluir })
      }
    );

    if (!response.ok) {
      alert("Erro ao visualizar relatório");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  const downloadFile = async (file_id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/alunos/${alunoId}/laudos/${file_id}`,
        {
          responseType: 'blob',
        }
      );

      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

    
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'arquivo';

      if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition
          .split('filename=')[1]
          .replace(/['"]/g, '')
          .trim();
      } else {
       
        const contentType = response.headers['content-type'];
        const extension = contentType?.includes('pdf') ? 'pdf' : 'jpg';
        filename = `laudo.${extension}`;
      }

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao fazer download:", error);
      alert("Não foi possível baixar o laudo.");
    }
  };


  const visualizarFile = async (file_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/alunos/${alunoId}/laudos/${file_id}`,
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], {
        type: response.headers['content-type'], 
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error("Erro ao visualizar o arquivo:", error);
      alert("Erro ao visualizar o laudo.");
    }
  };


  return (
    <>
      <AppHeader />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com todas as informações do aluno */}
        <Card className="overflow-hidden">
            {/* Faixa colorida superior de acordo com status */}
          <div className={`h-2 ${statusConfig.color}`}></div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coluna 1: Foto e Info Básica */}
              <div className="flex flex-col items-center lg:items-start">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg mb-4">
                    {student.photo ? (
                      <AvatarImage src={student.photo} alt={student.name} />
                    ) : (
                  <AvatarFallback className="bg-blue-500 text-white text-2xl">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                    )}
                </Avatar>
                  <h1 className="text-2xl font-bold text-gray-900 text-center lg:text-left">
                    {student.name}
                  </h1>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    <Calendar className="w-3 h-3 mr-1" />
                    {student.age} anos
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-200">
                    {student.class}
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {student.shift}
                  </Badge>
                </div>
                <div className="mt-3">
                  <Label className="text-sm font-medium text-gray-600">Código EOL/RA:</Label>
                  <p className="text-lg font-semibold text-gray-900">{student.eolCode}</p>
                </div>
              </div>

              {/* Coluna 2: Contatos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  Contatos
                </h3>
                
                  {/* Responsável */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                      Responsável
                  </h4>
                    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {student.guardianName || "—"}
                        </span>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            {student.guardianRelationship || "—"}
                          </Badge>
                          {student.emergencyActions && student.emergencyActions.trim() !== "" && (
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Emergência
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{student.guardianPhone || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span>{student.guardianEmail || "—"}</span>
                        </div>
                      </div>
                    </div>
                </div>

                {/* Médico de Referência */}
                <div>
                  <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <Stethoscope className="w-4 h-4" />
                    Médico de Referência
                  </h4>
                  <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                      <span className="font-medium text-blue-900">{student.doctorName || "—"}</span>
                    <div className="space-y-1 mt-2 text-sm">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Phone className="w-3 h-3" />
                          <span>{student.doctorPhone || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-700">
                        <Mail className="w-3 h-3" />
                          <span>{student.doctorEmail || "—"}</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Coluna 3: Status, Frequência, Faltas e Endereço */}
              <div className="space-y-4">
                  {/* 1) Pill de Status */}
                  <div
                    className={`
                      inline-flex 
                      items-center 
                      gap-2 
                      px-4 
                      py-2 
                      rounded-full 
                      ${statusConfig.bgColor} 
                      w-full 
                      justify-center
                    `}
                  >
                  <StatusIcon className={`w-5 h-5 ${statusConfig.textColor}`} />
                  <span className={`font-medium ${statusConfig.textColor}`}>
                    Status: {statusConfig.label}
                  </span>
                </div>
                
                  {/* 2) Frequência Geral */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Frequência Geral</span>
                      <span className="font-medium">{student.attendancePercentage ?? 0}%</span>
                    </div>
                    <Progress value={student.attendancePercentage ?? 0} className="h-2" />
                  </div>

                  {/* 3) Caixas de Faltas */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <div className="text-lg font-semibold text-gray-900">{student.medicalAbsences ?? 0}</div>
                      <div className="text-gray-600">Faltas Médicas</div>
                      
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-lg font-semibold text-gray-900">{student.medicalAbsences ?? 0}</div>
                    <div className="text-gray-600">Faltas Médicas</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-lg font-semibold text-gray-900">{student.totalAbsences ?? 0}</div>
                    <div className="text-gray-600">Total Faltas</div>
                      </div>
                    </div>
                  </div>

                  {/* 4) Box de Endereço */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-700" />
                      <span className="font-medium text-gray-700">Endereço</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {student.address 
                        ? student.address 
                        : (student.guardianAddress || "—")
                      }
                    </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navegação por Abas */}
        <Tabs defaultValue="health" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="health">Saúde</TabsTrigger>
            <TabsTrigger value="medical-reports">Laudos Médicos</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          {/* Aba Saúde */}
          <TabsContent value="health" className="space-y-6">
              <HealthCards student={student} />
            
            {/* Histórico de Saúde e Ocorrências */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Histórico de Saúde e Ocorrências
                  </CardTitle>
                    <Button onClick={() => navigate(`/student-profile/${alunoId}/add-occurrence`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Ocorrência
                  </Button>
                </div>
              </CardHeader>
              
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Ocorrências de Saúde</CardTitle>
                </CardHeader>
              <CardContent className="space-y-4">
                  {occurrences.length === 0 ? (
                    <p className="text-gray-500">Nenhuma ocorrência encontrada.</p>
                  ) : (
                    occurrences.map((occurrence) => (
                      <div key={occurrence._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{occurrence.titulo}</h4>

                          
                        </div>
                        <p className="text-sm text-gray-600 mb-2">

                          Data: {new Date(occurrence.data).toLocaleDateString()} | Registrado por: {occurrence.registrado_por}
                  </p>
                        <p className="text-sm">{occurrence.descricao}</p>

                        <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => navigate(`/student-profile/${alunoId}/occurrences/${occurrence._id}/view`)}>
                          Detalhes
                        </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteOccurrence(occurrence._id)}
                          >
                            Deletar
                          </Button>

                        </div>
                      </div>

                    ))
                  )}
              </CardContent>
            </Card>
            
            {/* Ficha de Saúde */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Ficha de Saúde
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <Label htmlFor="tipo_sanguineo">Tipo Sanguíneo</Label>
                      <Input id="tipo_sanguineo" value={form.tipo_sanguineo} onChange={handleChange} placeholder="Ex: A+" />
                    </div>
                    <div>
                      <Label htmlFor="alergias">Alergias</Label>
                      <Input id="alergias" value={form.alergias} onChange={handleChange} placeholder="Listar alergias conhecidas" />
                  </div>
                  <div>
                      <Label htmlFor="medicamentos">Medicamentos</Label>
                      <Input id="medicamentos" value={form.medicamentos} onChange={handleChange} placeholder="Medicamentos em uso" />
                  </div>
                  <div>
                      <Label htmlFor="contato_emergencia">Contato de Emergência</Label>
                      <Input id="contato_emergencia" value={form.contato_emergencia} onChange={handleChange} placeholder="Telefone adicional" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="observacoes_medicas">Observações Médicas</Label>
                    <Textarea id="observacoes_medicas" value={form.observacoes_medicas} onChange={handleChange} placeholder="Observações gerais sobre a saúde do aluno" />
                  </div>
                  <Button onClick={handleSubmit}>Salvar Ficha de Saúde</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Laudos Médicos */}
          <TabsContent value="medical-reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Laudos Médicos
                  </CardTitle>
                  <Button onClick={() => navigate(`/student-profile/${alunoId}/add-laudo`)}>
                    <Plus className="w-4 h-4 mr-2"/>
                    Adicionar Laudo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {laudos.length === 0 ? (
                  <p className="text-gray-500">Nenhum laudo encontrado.</p>
                ) : 
                  laudos.map((laudo) => (
                    <div key={laudo.aluno_id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{laudo.tipo}</h4>
                        <Badge
                          variant="outline"
                          className={
                            laudo.status === 'Válido'
                              ? 'text-green-600 border-green-200'
                              : laudo.status === 'Em análise'
                              ? 'text-yellow-600 border-yellow-200'
                              : 'text-red-600 border-red-200'
                          }
                        >
                          {laudo.status}
                        </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                        Data: {new Date(laudo.data).toLocaleDateString()} | Doutor: {laudo.medico}
                  </p>
                      <p className="text-sm">{laudo.descricao}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => visualizarFile(laudo.file_id)}>
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => downloadFile(laudo.file_id)}>
                        Download
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm("Tem certeza que deseja deletar este laudo?")) {
                          deleteLaudo(laudo.file_id);
                        }
                      }}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Relatórios */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-500" />
                  Gerar Relatório com Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Podemos manter os <Select> comentados ou removê-los se não for usar */}
                </div>

                <div className="space-y-4">
                  <Label>Incluir no Relatório:</Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={reportFilters.includeHealth}
                        onChange={(e) => setReportFilters({...reportFilters, includeHealth: e.target.checked})}
                      />
                      <span className="text-sm">Informações do Responsável</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={reportFilters.includeProjects}
                        onChange={(e) => setReportFilters({...reportFilters, includeProjects: e.target.checked})}
                      />
                      <span className="text-sm">Informações de Saúde</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={reportFilters.includeReports}
                        onChange={(e) => setReportFilters({...reportFilters, includeReports: e.target.checked})}
                      />
                      <span className="text-sm">Projetos</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={reportFilters.includeActivities}
                        onChange={(e) => setReportFilters({...reportFilters, includeActivities: e.target.checked})}
                      />
                      <span className="text-sm">Atividades</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={reportFilters.includeReportsAndReferrals}
                        onChange={(e) => setReportFilters({...reportFilters, includeReportsAndReferrals: e.target.checked})}
                      />
                      <span className="text-sm">Laudos e Encaminhamentos</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={reportFilters.includeOccurrences}
                        onChange={(e) => setReportFilters({...reportFilters, includeOccurrences: e.target.checked})}
                      />
                      <span className="text-sm">Ocorrências</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                    <Button className="mt-6" onClick={gerarRelatorioPDF}>
                    <Download className="w-4 h-4 mr-2" />
                    Gerar Relatório PDF
                  </Button>
                    <Button variant="outline" className="mt-6" onClick={visualizarRelatorioPDF}>
                    Visualizar Prévia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
};

export default StudentProfile;
