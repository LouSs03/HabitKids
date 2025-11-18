import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ParentDashboardPage.css";

interface Child {
  _id: string;
  name: string;
  avatar?: string;
}

interface Summary {
  pending: number;
  inProgress: number;
  completed: number;
}

const ParentDashboardPage = () => {
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
      const response = await fetch("http://localhost:4000/child/all");
      const data = await response.json();
      setChildren(data.children);
    } catch (error) {
      console.error("Error obteniendo los niños:", error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch("http://localhost:4000/routines/summary");
      const data = await response.json();
      setSummary({
        pending: data.pending,
        inProgress: data.inProgress,
        completed: data.completed,
      });
    } catch (error) {
      console.error("Error obteniendo el resumen:", error);
    }
  };

  return (
    <div className="parent-dashboard-container">

      <h1 className="dashboard-title">¡Bienvenido, John!</h1>
      <p className="subtitle">Aquí tienes un resumen de la actividad de tus hijos.</p>

      <div className="summary-cards">
        <div className="card">
          <h3>Rutinas Pendientes</h3>
          <p className="number">{summary.pending}</p>
        </div>

        <div className="card">
          <h3>Rutinas En Curso</h3>
          <p className="number">{summary.inProgress}</p>
        </div>

        <div className="card">
          <h3>Rutinas Completadas</h3>
          <p className="number">{summary.completed}</p>
        </div>
      </div>

      <h2 className="section-title">Tus Hijos</h2>

      <div className="children-grid">
        {children.map((child) => (
          <div key={child._id} className="child-card">
            <img
              src={child.avatar || "https://i.pravatar.cc/100"}
              className="child-avatar"
            />
            <h3 className="child-name">{child.name}</h3>

            <Link className="btn-progress" to="/nino/camino">
              Ver progreso
            </Link>

            <button className="btn-edit">Editar datos del hijo</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ParentDashboardPage;
