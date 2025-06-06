// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import AddHealthOccurrence from "./pages/AddHealthOccurrence";
import StudentsManagement from "./pages/StudentsManagement";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import ClassesManagement from "./pages/ClassesManagement";
import EditClass from "./pages/EditClass";
import NotFound from "./pages/NotFound";
import AddHealthLaudo from "./pages/AddHealthLaudo";
import PrivateRoute from "@/components/PrivateRoute";
import Login from "./pages/Login";
import ViewOccurrence from "./pages/ViewOccurrence";
import AboutUs from "./pages/AboutUs";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                {/* Rota principal */}
                <Route path="/" element={<Dashboard />} />
                
                {/* Rota Sobre Nós */}
                <Route path="/about-us" element={<AboutUs />} />

                {/* ROTA DINÂMICA: perfil de um aluno específico */}
                <Route
                  path="/student-profile/:alunoId"
                  element={<StudentProfile />}
                />

                {/* ROTA PARA ADICIONAR OCORRÊNCIA (também recebe :alunoId) */}
                <Route
                  path="/student-profile/:alunoId/add-occurrence"
                  element={<AddHealthOccurrence />}
                />
                <Route 
                  path="/student-profile/:alunoId/occurrences/:occurrenceId/view" 
                  element={<ViewOccurrence />} 
                />

                <Route
                  path="/student-profile/:alunoId/add-laudo"
                  element={<AddHealthLaudo />}
                />

                {/* Rotas de gerenciamento de alunos */}
                <Route path="/students" element={<StudentsManagement />} />
                <Route path="/students/add" element={<AddStudent />} />
                <Route path="/students/edit/:id" element={<EditStudent />} />

                {/* Rotas de gerenciamento de turmas */}
                <Route path="/classes" element={<ClassesManagement />} />
                <Route path="/classes/edit/:id" element={<EditClass />} />

                {/* CATCH‐ALL: Página 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
