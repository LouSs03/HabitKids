import { useEffect, useState } from "react";
import ParentHeader from "../../components/Parent/ParentHeader";
import "./ParentDashboardPage.css";
import { useNavigate } from "react-router-dom";



interface Child {
  _id: string;
  name: string;
  age?: number;
  avatar?: string;
}

interface Summary {
  pending: number;
  inProgress: number;
  completed: number;
}

const ParentDashboardPage = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([]);
  const [summary, setSummary] = useState<Summary>({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchChildren();
    fetchSummary();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await fetch("http://localhost:4000/child/all/ID_DEL_PADRE_AQUI");
      const data = await res.json();
      setChildren(data.children || []);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await fetch("http://localhost:4000/routines/summary");
      const data = await res.json();
      setSummary(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ParentHeader />

      {/* WRAPPER que centra todo el contenido */}
      <div className="dashboard-wrapper">
        <div className="parent-dashboard-container">

          <h1 className="dashboard-title">¡Bienvenido, John!</h1>
          <p className="dashboard-sub">
            Aquí tienes un resumen de la actividad de tus hijos.
          </p>

          {/* TARJETAS DE RESUMEN */}
          <div className="summary-boxes">
            <div className="summary-card">
              <h3>Rutinas Pendientes</h3>
              <span className="summary-number">{summary.pending}</span>
            </div>

            <div className="summary-card">
              <h3>Rutinas En Curso</h3>
              <span className="summary-number">{summary.inProgress}</span>
            </div>

            <div className="summary-card">
              <h3>Rutinas Completadas</h3>
              <span className="summary-number">{summary.completed}</span>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className="chart-container">
            <h2>Progreso Semanal</h2>
            <p>Aquí aparecerá la gráfica cuando existan rutinas registradas.</p>
          </div>

          {/* BOTÓN REGISTRAR HIJO */}
          <button 
            className="btn-register-child" 
            onClick={() => navigate("/padre/hijo/registrar")}>
            Registrar nuevo hijo
          </button>

          {/* SECCIÓN DE HIJOS */}
          <h2 className="section-title">Tus Hijos</h2>

          <div className="children-grid">
            {children.length === 0 && (
              <p style={{ color: "#666" }}>Aún no has registrado hijos.</p>
            )}

            {children.map((child) => (
              <div key={child._id} className="child-card">
                <img
                  src={child.avatar || "https://i.pravatar.cc/80"}
                  className="child-avatar"
                  alt="avatar"
                />
                <div className="child-name">{child.name}</div>
                {child.age && <div className="child-age">{child.age} años</div>}

                <button className="btn-progress">Ver Progreso</button>
                <button className="btn-edit">Editar datos del hijo</button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default ParentDashboardPage;
