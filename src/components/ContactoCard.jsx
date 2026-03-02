export default function ContactoCard({
  id,
  nombre,
  descripcion,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
<article className="bg-white border rounded-lg shadow-sm p-4 mb-4">
<h3 className="text-lg font-semibold text-morado-oscuro">{nombre}</h3>
<p></p>
      {etiqueta && <p className="tag">{etiqueta}</p>}
      <p> {descripcion}</p>
      {correo && <p>✉️ {correo}</p>}
      

      <div className="acciones">
        <button
          type="button"
          className="btn-eliminar"
          onClick={() => onDelete(id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

