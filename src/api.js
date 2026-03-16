// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";


// GET - Listar todos los contactos
export async function listarContactos() {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) {
    throw new Error("Error al listar contactos");
  }

  return res.json();
}


// POST - Crear un nuevo contacto
export async function crearContacto(data) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear el contacto");
  }

  return res.json();
}


// PUT - Actualizar contacto
export async function actualizarContacto(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el contacto");
  }

  return res.json();
}


// DELETE - Eliminar contacto
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el contacto");
  }

  return true;
}