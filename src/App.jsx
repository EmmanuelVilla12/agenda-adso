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
            imagen: "",
            nombre: "Carolina Pérez",
            descripcion: "amigble",
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
  <main className="max-w-2xl mx-auto mt-10 p-4">
  <h1 className="text-3xl font-bold text-morado text-center mb-2">
  Agenda ADSO v4
  </h1> 
  <p className="bg-morado text-white text-xs rounded px-2 py-1 w-fit">
ADSO
</p>
    <p className="text-gray-500 text-center mb-6">
  Interfaz moderna con TailwindCSS
  </p>

      <FormularioContacto onAgregar={agregarContacto} />

      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            imagen={c.imagen} 
            nombre={c.nombre}
            descripcion={c.descripcion}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
          />
        ))}
      </section>
    </main>
  );
}
