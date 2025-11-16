import { Routes, Route } from "react-router-dom";

// Landing
import { LandingPage } from "./pages/Landing/LandingPage";

// Auth
import { ParentLoginPage } from "./pages/Auth/ParentLoginPage";
import { ParentRegisterPage } from "./pages/Auth/ParentRegisterPage";
import { ChildLoginPage } from "./pages/Auth/ChildLoginPage";

// Parent
import { ParentDashboardPage } from "./pages/Parent/ParentDashboardPage";

// Child
import { ChildDashboardPage } from "./pages/Child/ChildDashboardPage";
import { ChildPathPage } from "./pages/Child/ChildPathPage";
import { ChildRoutineTimerPage } from "./pages/Child/ChildRoutineTimerPage";

export default function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth padre */}
      <Route path="/padre/login" element={<ParentLoginPage />} />
      <Route path="/padre/registro" element={<ParentRegisterPage />} />

      {/* Auth niño */}
      <Route path="/nino/login" element={<ChildLoginPage />} />

      {/* Dashboard padre */}
      <Route path="/padre/dashboard" element={<ParentDashboardPage />} />

      {/* Dashboard niño */}
      <Route path="/nino/dashboard" element={<ChildDashboardPage />} />
      <Route path="/nino/camino" element={<ChildPathPage />} />
      <Route path="/nino/rutina/:routineId" element={<ChildRoutineTimerPage />} />

      {/* 404 simple */}
      <Route path="*" element={<div style={{ padding: 40 }}>Página no encontrada</div>} />
    </Routes>
  );
}
