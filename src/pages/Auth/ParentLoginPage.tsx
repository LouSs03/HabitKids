import { useNavigate } from "react-router-dom";
import "./styles/auth.css";

export function ParentLoginPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">

      <div className="back-arrow" onClick={() => navigate("/")}>
        ←
      </div>

      {/* LOGO ARRIBA */}
      <div className="auth-logo">HabitKids</div>

      <div className="auth-card">
        <div className="auth-title">¡Bienvenido de nuevo, Padre!</div>

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

        <button className="auth-btn">Iniciar Sesión</button>

        <div className="auth-link">¿Olvidaste tu contraseña?</div>

        <div className="auth-link">
          ¿No tienes cuenta?{" "}
          <a onClick={() => navigate("/padre/registro")}>Crear una</a>
        </div>
      </div>
    </div>
  );
}
