export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
  onEditar,
  onEliminar,
}) {
  return (
    <div className="bg-white border border-black/10 rounded-xl p-6 flex items-start justify-between hover:shadow-md transition">

      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-black">{nombre}</h3>

        <p className="text-gray-600 text-sm flex items-center gap-2">
          📞 {telefono}
        </p>

        <p className="text-gray-600 text-sm flex items-center gap-2">
          ✉️ {correo}
        </p>

        {etiqueta && (
          <span className="inline-block border border-black text-xs px-3 py-1 rounded-full mt-2">
            {etiqueta}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onEditar}
          className="border border-black px-4 py-2 rounded-lg text-sm hover:bg-black hover:text-white transition"
        >
          Editar
        </button>

        <button
          onClick={onEliminar}
          className="border border-black px-4 py-2 rounded-lg text-sm hover:bg-black hover:text-white transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}