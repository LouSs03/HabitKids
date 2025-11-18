import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AVATARS = [
  "😊",
  "🌙",
  "❤️",
  "✨",
  "🐟",
  "🍎",
  "🚗",
  "🌸",
];

export default function ParentRegisterChildPage() {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // --------------------------
  // GENERAR CONTRASEÑA AUTO
  // --------------------------
  const generatePassword = () => {
    const pass = Math.random().toString(36).slice(-8);
    setPassword(pass);
  };

  // --------------------------
  // GUARDAR HIJO
  // --------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!avatar || !name || !age || !username || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/child/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          pin: password,
          age,
          avatar,
          parentId: localStorage.getItem("parentId"), // ⚠ usa realmente tu ID
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Hijo registrado exitosamente");
        navigate("/parent/dashboard");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Error en servidor");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-6 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-8">

        {/* TÍTULO */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Registrar Nuevo Hijo
        </h2>

        {/* AVATARES */}
        <p className="font-medium text-gray-600 mb-3">Seleccionar Avatar</p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {AVATARS.map((icon) => (
            <button
              key={icon}
              onClick={() => setAvatar(icon)}
              className={`text-3xl h-16 border rounded-xl flex items-center justify-center hover:bg-yellow-100 transition
              ${avatar === icon ? "bg-yellow-300 border-yellow-400" : "bg-white"}`}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* BOTÓN GENERAR CONTRASEÑA */}
        <button
          onClick={generatePassword}
          className="w-full mb-2 bg-yellow-200 hover:bg-yellow-300 text-gray-700 font-medium py-2 rounded-lg"
        >
          🔐 Generar contraseña automática
        </button>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-medium text-gray-600">Nombre del niño</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Ej. Sofía"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Edad del niño</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Ej. 7"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Usuario del niño</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Ej. sofia.habits"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Contraseña del niño</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BOTÓN GUARDAR */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg text-lg transition"
          >
            {loading ? "Guardando..." : "Guardar hijo"}
          </button>
        </form>

      </div>
    </div>
  );
}
