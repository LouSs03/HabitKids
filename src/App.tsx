import { Routes, Route } from "react-router-dom";

// Landing
import { LandingPage } from "./pages/Landing/LandingPage";

// Auth
import { ParentLoginPage } from "./pages/Auth/ParentLoginPage";
import { ParentRegisterPage } from "./pages/Auth/ParentRegisterPage";
import { ChildLoginPage } from "./pages/Auth/ChildLoginPage";

// Parent
import ParentDashboardPage from "./pages/Parent/ParentDashboardPage";
import ParentRegisterChildPage from "./pages/Parent/ParentRegisterChildPage";
import ParentRoutinesPage from "./pages/Parent/ParentRoutinesPage";


// Child
import { ChildDashboardPage } from "./pages/Child/ChildDashboardPage";
import ChildPathPage from "./pages/Child/ChildPathPage";
import { ChildRoutineTimerPage } from "./pages/Child/ChildRoutineTimerPage";
import './App.css'; // Asegúrate de que esto esté aquí para cargar los estilos


export default function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth padre */}
      <Route path="/padre/login" element={<ParentLoginPage />} />
      <Route path="/padre/registro" element={<ParentRegisterPage />} />
      <Route path="/padre/rutinas" element={<ParentRoutinesPage />} />

      {/* Auth niño */}
      <Route path="/nino/login" element={<ChildLoginPage />} />

      {/* Dashboard padre */}
      <Route path="/padre/dashboard" element={<ParentDashboardPage />} />
      <Route path="/padre/hijo/registrar" element={<ParentRegisterChildPage />} />


      {/* Dashboard niño */}
      <Route path="/nino/dashboard" element={<ChildDashboardPage />} />
      <Route path="/nino/camino" element={<ChildPathPage />} />
      <Route path="/nino/rutina/:routineId" element={<ChildRoutineTimerPage />} />

      {/* 404 simple */}
      <Route path="*" element={<div style={{ padding: 40 }}>Página no encontrada</div>} />
    </Routes>
  );
}
