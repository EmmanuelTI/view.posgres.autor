import React, { useState } from "react";
import { obtenerLibroPorId } from "../../services/Api";
import "../../Css/GetId.css"; // Importamos el archivo CSS

const LibroPorId = () => {
  const [id, setId] = useState("");
  const [libro, setLibro] = useState(null);
  const [error, setError] = useState(null);
  const [idError, setIdError] = useState(""); // error específico para input ID

  const buscarLibro = async () => {
    setError(null);
    setLibro(null);

    if (!id.trim()) {
      setIdError("El ID es obligatorio");
      return;
    }

    setIdError(""); // limpio error si ya está bien

    try {
      const data = await obtenerLibroPorId(id);
      setLibro(data);
    } catch (error) {
      setError("No se encontró el libro o hubo un error al obtenerlo.");
    }
  };

  return (
    <div className="libro-container">
      <h1 className="titulo">Buscar Libro por ID</h1>
      <input
        type="text"
        placeholder="Ingresa el ID del libro"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="input-id"
      />
      {idError && <p className="mensaje-error">{idError}</p>}

      <button onClick={buscarLibro} className="btn-buscar">
        Buscar
      </button>

      {error && <p className="mensaje-error">{error}</p>}

      {libro && (
        <div className="tarjeta-libro">
          <h3 className="subtitulo">Detalles del Libro</h3>
          <p>
            <strong>ID:</strong> {libro.libreriaMaterialId}
          </p>
          <p>
            <strong>Título:</strong> {libro.titulo}
          </p>
          <p>
            <strong>Fecha de Publicación:</strong>{" "}
            {new Date(libro.fechaPublicacion).toLocaleDateString()}
          </p>
          <p>
            <strong>Autor ID:</strong> {libro.autorLibro}
          </p>
        </div>
      )}
    </div>
  );
};

export default LibroPorId;
