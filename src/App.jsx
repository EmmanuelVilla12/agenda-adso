
  import { useEffect, useState } from "react";
  import {
    listarContactos,
    crearContacto,
    actualizarContacto,
    eliminarContactoPorId,
  } from "./api";
  import { APP_INFO } from "./config";
  import FormularioContacto from "./components/FormularioContacto";
  import ContactoCard from "./components/ContactoCard";

  function App() {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [ordenAsc, setOrdenAsc] = useState(true);
    const [contactoEnEdicion, setContactoEnEdicion] = useState(null);
    const [vista, setVista] = useState("crear");

    useEffect(() => {
      const cargarContactos = async () => {
        try {
          setCargando(true);
          setError("");
          const data = await listarContactos();
          setContactos(data);
        } catch (err) {
          console.error("Error al cargar contactos:", err);
          setError("No se pudieron cargar los contactos.");
        } finally {
          setCargando(false);
        }
      };

      cargarContactos();
    }, []);

    const onAgregarContacto = async (nuevoContacto) => {
      try {
        setError("");
        const creado = await crearContacto(nuevoContacto);

        setContactos((prev) => [
          ...prev.filter((c) => c.id !== creado.id),
          creado,
        ]);
      } catch (err) {
        console.error(err);
        setError("No se pudo guardar el contacto.");
        throw err;
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
      } catch (err) {
        console.error(err);
        setError("No se pudo actualizar el contacto.");
        throw err;
      }
    };

    const onEliminarContacto = async (id) => {
      try {
        setError("");

        await eliminarContactoPorId(id);

        setContactos((prev) => prev.filter((c) => c.id !== id));

        setContactoEnEdicion((actual) =>
          actual && actual.id === id ? null : actual
        );
      } catch (err) {
        console.error(err);
        setError("No se pudo eliminar el contacto.");
      }
    };

    const onEditarClick = (contacto) => {
      setContactoEnEdicion(contacto);
    };

    const onCancelarEdicion = () => {
      setContactoEnEdicion(null);
    };

    const irAVerContactos = () => {
      setVista("contactos");
      setContactoEnEdicion(null);
    };

    const irACrearContacto = () => {
      setVista("crear");
      setContactoEnEdicion(null);
      setBusqueda("");
    };

    const contactosFiltrados = contactos.filter((c) => {
      const termino = busqueda.toLowerCase();

      const nombre = (c.nombre || "").toLowerCase();
      const correo = (c.correo || "").toLowerCase();
      const etiqueta = (c.etiqueta || "").toLowerCase();

      return (
        nombre.includes(termino) ||
        correo.includes(termino) ||
        etiqueta.includes(termino)
      );
    });

    const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
      const nombreA = (a.nombre || "").toLowerCase();
      const nombreB = (b.nombre || "").toLowerCase();

      if (nombreA < nombreB) return ordenAsc ? -1 : 1;
      if (nombreA > nombreB) return ordenAsc ? 1 : -1;
      return 0;
    });

    const estaEnVistaCrear = vista === "crear";
    const estaEnVistaContactos = vista === "contactos";

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">

        {/* HEADER */}
        <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-lg font-bold">
                A
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Proyecto ABP
                </p>

                <h1 className="text-sm md:text-base font-semibold text-slate-50">
                  Agenda ADSO – ReactJS
                </h1>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                SENA CTMA
              </p>

              <p className="text-xs text-slate-200">
                Ficha {APP_INFO.ficha}
              </p>
            </div>

          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-10 pb-14">

          <div className="grid gap-8 md:grid-cols-[1.6fr,1fr] items-start">

            {/* COLUMNA IZQUIERDA */}
            <div className="bg-white/95 rounded-3xl shadow-2xl border border-slate-100 px-6 py-7 md:px-8 md:py-8">

              <header className="mb-5 flex items-start justify-between">

                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    {APP_INFO.titulo}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    {APP_INFO.subtitulo}
                  </p>
                </div>

                {estaEnVistaCrear ? (
                  <button
                    onClick={irAVerContactos}
                    className="px-4 py-2 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Ver contactos
                  </button>
                ) : (
                  <button
                    onClick={irACrearContacto}
                    className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100"
                  >
                    Volver a crear contacto
                  </button>
                )}

              </header>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 p-3 rounded-xl">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {cargando ? (
                <p className="text-gray-500">Cargando contactos...</p>
              ) : (
                <>
                  {estaEnVistaCrear && (
                    <FormularioContacto
                      onAgregar={onAgregarContacto}
                      onActualizar={onActualizarContacto}
                      contactoEnEdicion={null}
                      onCancelarEdicion={onCancelarEdicion}
                    />
                  )}

                  {estaEnVistaContactos && (
                    <>
                      {contactoEnEdicion && (
                        <FormularioContacto
                          onAgregar={onAgregarContacto}
                          onActualizar={onActualizarContacto}
                          contactoEnEdicion={contactoEnEdicion}
                          onCancelarEdicion={onCancelarEdicion}
                        />
                      )}

                      <div className="flex gap-3 mb-4">

                        <input
                          type="text"
                          placeholder="Buscar por nombre, correo o etiqueta..."
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500"
                          value={busqueda}
                          onChange={(e) => setBusqueda(e.target.value)}
                        />

                        <button
                          onClick={() => setOrdenAsc((prev) => !prev)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
                        >
                          {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
                        </button>

                      </div>

                      <section className="space-y-4">

                        {contactosOrdenados.length === 0 ? (
                          <p className="text-gray-500">
                            No se encontraron contactos
                          </p>
                        ) : (
                          contactosOrdenados.map((c) => (
                            <ContactoCard
                              key={c.id}
                              nombre={c.nombre}
                              telefono={c.telefono}
                              correo={c.correo}
                              etiqueta={c.etiqueta}
                              onEliminar={() => onEliminarContacto(c.id)}
                              onEditar={() => onEditarClick(c)}
                            />
                          ))
                        )}

                      </section>

                    </>
                  )}
                </>
              )}

            </div>

            {/* COLUMNA DERECHA */}
            <aside className="space-y-5">

              {/* DASHBOARD */}
              <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 shadow-xl">

                <p className="text-[10px] uppercase tracking-[0.3em] text-purple-100/80">
                  Proyecto ABP
                </p>

                <h2 className="text-lg font-bold mt-2">
                  Agenda ADSO – Dashboard
                </h2>

                <p className="text-sm text-purple-100 mt-1">
                  CRUD completo con React, JSON Server, validaciones,
                  búsqueda, ordenamiento y edición.
                </p>

                <div className="mt-6 flex justify-between">
                  <span className="text-purple-100">
                    Contactos registrados
                  </span>

                  <span className="font-semibold text-lg">
                    {contactos.length}
                  </span>
                </div>

              </div>

              {/* TIPS */}
              <div className="rounded-2xl bg-white/90 border border-slate-100 p-4 shadow-sm">

                <h3 className="text-sm font-semibold text-gray-900">
                  Tips de código limpio
                </h3>

                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  <li>• Nombra componentes según su responsabilidad.</li>
                  <li>• Evita duplicar lógica.</li>
                  <li>• Comenta la intención.</li>
                  <li>• Mantén archivos pequeños.</li>
                </ul>

              </div>

              {/* SENA */}
              <div className="rounded-2xl bg-slate-900 border border-slate-700 p-4 text-slate-100">

                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  SENA CTMA · ADSO
                </p>

                <p className="text-sm font-semibold mt-2">
                  Desarrollo Web – ReactJS
                </p>

                <p className="text-xs text-slate-400 mt-3">
                  “Pequeños proyectos bien cuidados valen más que mil ideas sin código.”
                </p>

              </div>

            </aside>

          </div>

        </main>
      </div>
    );
  }

  export default App;

