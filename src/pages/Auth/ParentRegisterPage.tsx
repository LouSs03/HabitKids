import { useNavigate } from "react-router-dom";
import "./styles/auth.css";

export function ParentRegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="register-page">
      {/* Flecha atrás */}
      <div className="back-arrow" onClick={() => navigate("/padre/login")}>
        ←
      </div>

      <div className="register-container">
        {/* LADO IZQUIERDO: formulario */}
        <div className="register-left">
          <div className="auth-logo">HabitKids</div>

          <div className="auth-title" style={{ marginBottom: "24px" }}>
            Crea una cuenta
          </div>

          <input
            type="text"
            placeholder="Nombre completo"
            className="auth-input"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="auth-input"
          />

          <button className="auth-btn" style={{ marginTop: "24px" }}>
            Registrarme
          </button>

          <div className="auth-link">
            ¿Ya tienes una cuenta?{" "}
            <a onClick={() => navigate("/padre/login")}>Inicia sesión</a>
          </div>
        </div>

        {/* LADO DERECHO: panel amarillo tipo Visily */}
        <div className="register-right">
          <div className="register-illustration">
            Ilustración HabitKids
          </div>
        </div>
      </div>
    </div>
  );
}
