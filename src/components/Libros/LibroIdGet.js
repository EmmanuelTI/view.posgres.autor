import React, { useState } from "react";
import { obtenerLibroPorId } from "../../services/Api";
import "../Libros/css/GetId.css";


const LibroPorId = ({ onBuscarLibro, onLimpiarBusqueda }) => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const valor = e.target.value;
    setId(valor);
    setError("");

    if (valor.trim() === "") {
      onLimpiarBusqueda();
    }
  };

  const buscarLibro = async () => {
    setError("");

    if (!id.trim()) {
      setError("El ID es obligatorio");
      return;
    }

    try {
      const data = await obtenerLibroPorId(id);
      onBuscarLibro(data);
    } catch (err) {
      console.error(err);
      setError("No se encontró el libro o hubo un error al obtenerlo.");
      onBuscarLibro(null);
    }
  };

  return (
    <div className="libro-container">
      <input
        type="text"
        placeholder="Ingresa el ID del libro"
        value={id}
        onChange={handleChange}
        className="input-id"
      />
      {error && <p className="mensaje-error">{error}</p>}
      <button onClick={buscarLibro} className="btn-buscar">
        Buscar
      </button>
    </div>
  );
};

export default LibroPorId;
