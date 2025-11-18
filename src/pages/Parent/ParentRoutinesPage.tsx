import { useNavigate } from "react-router-dom";
import ParentHeader from "../../components/Parent/ParentHeader";
import "./ParentRoutinesPage.css";

const ParentRoutinesPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <ParentHeader />

      {/* Flecha regresar */}
      <div className="back-arrow" onClick={() => navigate("/padre/dashboard")}>
        ←
      </div>

      <div className="routines-container">

        <div className="summary-card">

          <div className="summary-title">Resumen de Rutinas</div>

          <div className="summary-content">
            <div className="summary-number">0</div>
            <div className="summary-label">rutinas creadas</div>

            <button className="btn-create-routine">
              + Crear nueva rutina
            </button>
          </div>
        </div>

        <p className="no-routines">Aún no tienes rutinas creadas.</p>

        <footer className="footer">
          © 2025 HabitKids. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default ParentRoutinesPage;
