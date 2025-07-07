import React, { useState } from "react";
import { obtenerAutorPorId, obtenerAutorPorNombre } from "../services/Api";
import "../Css/GetId.css";

const AutorBuscar = ({ onBuscarAutor }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState("");

  const buscarAutor = async () => {
    setError(null);

    if (!input.trim()) {
      setInputError("El ID o Nombre es obligatorio");
      return;
    }

    setInputError("");

    try {
      let data;
      const esGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(input);

      if (esGuid) {
        data = await obtenerAutorPorId(input);
      } else {
        data = await obtenerAutorPorNombre(input);
      }
      onBuscarAutor(data);
    } catch (error) {
      console.error(error);
      setError("No se encontró el autor o hubo un error al obtenerlo.");
    }
  };

  const limpiar = () => {
    setInput("");
    setError(null);
    setInputError("");
    onBuscarAutor(null); // Indica al padre que muestre todos los autores
  };

  return (
    <div className="autor-buscar-container">
      <input
        type="text"
        placeholder="Ingresa el ID o Nombre del autor"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-id"
      />
      {inputError && <p className="mensaje-error">{inputError}</p>}

      <button onClick={buscarAutor} className="btn-buscar">
        Buscar
      </button>

      <button onClick={limpiar} className="btn-limpiar" style={{ marginLeft: "10px" }}>
        Ver todos
      </button>

      {error && <p className="mensaje-error">{error}</p>}
    </div>
  );
};

export default AutorBuscar;
