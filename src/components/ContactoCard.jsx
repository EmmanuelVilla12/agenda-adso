export default function ContactoCard({ nombre, telefono, correo, etiqueta }) {
  return (
    <div className="card-contacto">
      <h3 className="card-nombre">{nombre}</h3>

      <p className="card-linea">
        <strong>Teléfono:</strong> {telefono}
      </p>

      <p className="card-linea">
        <strong>Correo:</strong> {correo}
      </p>

      <p className="card-etiqueta">
        {etiqueta}
      </p>
    </div>
  );
}
