import { useState, useEffect } from "react"; // MODIFICADO (se agrega useEffect)

export default function FormularioContacto({
  onAgregar,
  onActualizar, // NUEVO
  contactoEnEdicion, // NUEVO
  onCancelarEdicion, // NUEVO
}) {
  // Estado del formulario como objeto único controlado
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // NUEVO: estado para errores
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // NUEVO: estado de envío
  const [enviando, setEnviando] = useState(false);

 useEffect(() => {
  if (contactoEnEdicion) {
    setForm({
      nombre: contactoEnEdicion.nombre || "",
      telefono: contactoEnEdicion.telefono || "",
      correo: contactoEnEdicion.correo || "",
      etiqueta: contactoEnEdicion.etiqueta || "",
    });

    setErrores({ nombre: "", telefono: "", correo: "" });

  } else {
    // NUEVO: limpiar formulario cuando se cancela edición
    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
    });

    setErrores({ nombre: "", telefono: "", correo: "" });
  }
}, [contactoEnEdicion]);

  // onChange genérico: actualiza el campo según "name"
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 7 dígitos.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // onSubmit mejorado
  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();

    if (!esValido) return;

    try {
      setEnviando(true);

      // ===== MODIFICADO: si hay contacto en edición =====
      if (contactoEnEdicion) {
        await onActualizar({
          ...form,
          id: contactoEnEdicion.id,
        });

        if (onCancelarEdicion) onCancelarEdicion();
      } else {
        await onAgregar(form);
      }

      // limpiar formulario
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });

    } finally {
      setEnviando(false);
    }
  };

  // NUEVO: detectar si estamos editando
  const estaEnEdicion = Boolean(contactoEnEdicion);

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>

          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />

          {errores.nombre && (
            <p className="text-red-500 text-sm mt-1">
              {errores.nombre}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>

          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />

          {errores.telefono && (
            <p className="text-red-500 text-sm mt-1">
              {errores.telefono}
            </p>
          )}
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />

        {errores.correo && (
          <p className="text-red-500 text-sm mt-1">
            {errores.correo}
          </p>
        )}
      </div>

      {/* Etiqueta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3">

        {/* Botón principal */}
        <button
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          {enviando
            ? "Guardando..."
            : estaEnEdicion
            ? "Guardar cambios"
            : "Agregar contacto"}
        </button>

        {/* NUEVO: botón cancelar edición */}
        {estaEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-200"
          >
            Cancelar edición
          </button>
        )}

      </div>

    </form>
  );
}