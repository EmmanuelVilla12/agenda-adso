import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    descripcion: "",
etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); // evita recargar
    if (!form.nombre.trim() || !form.descripcion.trim()) {
      alert("Completa al menos Nombre y Descripcion");
      return;
    }
    onAgregar(form); // App agrega id y actualiza la lista
    setForm({ imagen:"", nombre: "", correo: "", descripcion: "", etiqueta: "" }); // limpiar
  };

  return (
    <form onSubmit={onSubmit} className="form-contacto">
      <input
        name="imagen"
        placeholder="imagen"
        value={form.imagen}
        onChange={onChange}
      />
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={onChange}
      />
      <input
        name="descripcion"
        placeholder="descripcion"
        value={form.descripcion}
        onChange={onChange}
      />
      <input
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={onChange}
      />
      <input
        name="etiqueta"
        placeholder="Etiqueta (opcional)"
        value={form.etiqueta}
        onChange={onChange}
      />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}
