import "./ParentHeader.css";
import { Link, useNavigate } from "react-router-dom";

const ParentHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("parentToken");
    localStorage.removeItem("parentId");
    navigate("/padre/login");
  };

  return (
    <header className="parent-header">
      <div className="parent-header-inner">

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="ph-logo">HabitKids</div>

          <nav className="ph-nav">
            <Link to="/padre/dashboard">Dashboard</Link>
            <Link to="/padre/rutinas">Rutinas</Link>
            <Link to="#">Hijos</Link>
            <Link to="#">Notificación</Link>
            <Link to="#">Configuración</Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>

      </div>
    </header>
  );
};

export default ParentHeader;
