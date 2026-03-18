import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginModal() {
  const { isAuthenticated, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) return null;

  const handleLogin = () => {
    if (email === "admin@sena.com" && password === "1234") {
      // puedes guardar el correo como usuario
      login(email);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center">

        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          🔐 Iniciar sesión
        </h2>

        <p className="text-gray-600 mb-4">
          Ingresa tus credenciales
        </p>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg hover:scale-105 transition"
        >
          Entrar
        </button>

      </div>
    </div>
  );
}