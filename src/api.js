// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";


// GET - Listar todos los contactos
export async function listarContactos() {
const res = await fetch(API_BASE_URL);
if (!res.ok) throw new Error("Error al listar contactos");
return res.json();
}


// POST - Crear un nuevo contacto
export async function crearContacto(data) {
const res = await fetch(API_BASE_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Error al crear el contacto");
return res.json();
}


// Función PUT: actualizar un contacto existente (UPDATE)
export async function actualizarContacto(id, data) {
  // Hacemos un PUT a /contactos/:id usando la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }, // Indicamos que el body es JSON
    body: JSON.stringify(data), // Enviamos el contacto actualizado
  });

  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al actualizar el contacto");

  // Devolvemos el contacto actualizado que regresa la API
  return res.json();
}



// DELETE - Eliminar contacto por ID
export async function eliminarContactoPorId(id) {
const res = await fetch(`${API_BASE_URL}/${id}`, {
method: "DELETE"
});
if (!res.ok) throw new Error("Error al eliminar el contacto");
return true;
}