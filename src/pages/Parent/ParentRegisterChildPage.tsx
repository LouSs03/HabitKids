import { useNavigate } from "react-router-dom";
import ParentHeader from "../../components/Parent/ParentHeader";
import "./ParentRegisterChildPage.css";

export default function ParentRegisterChildPage() {
  const navigate = useNavigate();

  return (
    <>
      <ParentHeader />

      {/* FLECHA SUPERIOR */}
      <div className="back-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="register-child-container">
        <h2 className="title-center">Registrar Nuevo Hijo</h2>

        <p className="subtitle">Seleccionar Avatar</p>

        {/* AVATARES */}
        <div className="avatar-grid">
          {["😊", "🐼", "💛", "✨", "🎮", "🍎", "🚗", "🧜‍♀️"].map((icon, i) => (
            <div key={i} className="avatar-card">
              {icon}
            </div>
          ))}
        </div>

        {/* FORMULARIO */}
        <form className="child-form">
          <input placeholder="Nombre del niño" />
          <input placeholder="Edad del niño" />
          <input placeholder="Usuario del niño" />
          <input placeholder="PIN del niño" />
        </form>

        <button className="save-btn">Guardar hijo</button>
      </div>
    </>
  );
}
