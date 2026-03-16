import { useEffect, useState } from "react";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
} from "./api.js";

import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

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

  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");

      const actualizado = await actualizarContacto(
        contactoActualizado.id,
        contactoActualizado
      );

      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );

      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);

      setError(
        "No se pudo actualizar el contacto. Verifica tu conexión o intenta nuevamente."
      );

      throw error;
    }
  };

  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  // ===== NUEVO: cancelar edición =====
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  const onEliminarContacto = async (id) => {
    try {
      setError("");

      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));

      setContactoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );
    } catch (error) {
      console.error("Error al eliminar contacto:", error);

      setError(
        "No se pudo eliminar el contacto. Intenta nuevamente o revisa la conexión con el servidor."
      );
    }
  };

  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase().replace(/\s/g, "");

    const nombre = (c.nombre || "").toLowerCase();
    const correo = (c.correo || "").toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = String(c.telefono || "").replace(/\s/g, "");

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
        </p>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          {APP_INFO.titulo}
        </h1>

        <p className="text-gray-500 mt-1">{APP_INFO.subtitulo}</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            Cargando contactos desde la API...
          </div>
        )}

        <FormularioContacto
          onAgregar={onAgregarContacto}
          onActualizar={onActualizarContacto}
          contactoEnEdicion={contactoEnEdicion}
          onCancelarEdicion={onCancelarEdicion} 
        />

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre, correo, telefono o etiqueta..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
          />

          <button
            type="button"
            onClick={() => setOrdenAsc((prev) => !prev)}
            className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
          >
            {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
          </button>

          <p className="text-sm text-gray-500">
            {contactosOrdenados.length} contacto(s) encontrado(s)
          </p>
        </div>

        <div className="space-y-4">
          {contactosOrdenados.length === 0 && !cargando && (
            <p className="text-gray-500 text-sm">
              No se encontraron contactos que coincidan con la búsqueda.
            </p>
          )}

          {contactosOrdenados.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={() => onEliminarContacto(c.id)}
              onEditar={() => onEditarClick(c)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}