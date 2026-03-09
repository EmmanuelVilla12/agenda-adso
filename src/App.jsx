// Archivo: src/App.jsx
// Componente principal de Agenda ADSO.
// Maneja estados globales, carga de contactos y conexión con la API.

import { useEffect, useState } from "react";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";

// NUEVO: configuración global
import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Estado principal de la app
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Cargar la lista desde la API al montar el componente (GET)
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError("");

        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté activo o tu conexión a internet."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarContactos();
  }, []);

  // Agregar contacto (POST)
  const onAgregarContacto = async (nuevo) => {
    try {
      setError("");

      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);

      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o intenta nuevamente en unos momentos."
      );

      throw error;
    }
  };

  // Eliminar contacto (DELETE)
  const onEliminarContacto = async (id) => {
    try {
      setError("");

      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);

      setError(
        "No se pudo eliminar el contacto. Intenta nuevamente o revisa la conexión con el servidor."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
        </p>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          {APP_INFO.titulo}
        </h1>

        <p className="text-gray-500 mt-1">
          {APP_INFO.subtitulo}
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Error de API */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Estado de carga */}
        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            Cargando contactos desde la API...
          </div>
        )}

        {/* Formulario */}
        <FormularioContacto onAgregar={onAgregarContacto} />

        {/* Lista de contactos */}
        <div className="space-y-4">
          {contactos.length === 0 && !cargando && (
            <p className="text-gray-500 text-sm">
              No hay contactos aún. Agrega el primero usando el formulario.
            </p>
          )}

          {contactos.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={() => onEliminarContacto(c.id)}
            />
          ))}
        </div>

      </section>
    </main>
  );
}