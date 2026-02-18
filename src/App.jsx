import { useState, useEffect } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

export default function App() {
  const [contactos, setContactos] = useState(() => {
    const guardados = localStorage.getItem("contactos");
    return guardados
      ? JSON.parse(guardados)
      : [
          {
            id: 1,
            nombre: "Carolina Pérez",
            telefono: "300 123 4567",
            correo: "carolina@sena.edu.co",
            etiqueta: "Compañera",
          },
        ];
  });

  // 🔹 Guardar automáticamente cuando cambien los contactos
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  // Agregar
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  // Eliminar
  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v2</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
          />
        ))}
      </section>
    </main>
  );
}
