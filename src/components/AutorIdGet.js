import React, { useState, useEffect } from "react";
import { obtenerAutorPorId, obtenerAutorPorNombre } from "../services/Api";
import "../Css/AutorIdGet.css";

const AutorBuscar = ({ onBuscarAutor }) => {
  const [valorEntrada, setValorEntrada] = useState("");
  const [mensajeError, setMensajeError] = useState(null);
  const [mensajeEntradaInvalida, setMensajeEntradaInvalida] = useState("");

  useEffect(() => {
    // Si el input queda vacío, limpiamos búsqueda
    if (valorEntrada.trim() === "") {
      onBuscarAutor(null);
      setMensajeError(null);
      setMensajeEntradaInvalida("");
    }
  }, [valorEntrada, onBuscarAutor]);

  const manejarBusqueda = async () => {
    setMensajeError(null);

    if (!valorEntrada.trim()) {
      setMensajeEntradaInvalida("El ID o Nombre es obligatorio");
      return;
    }

    setMensajeEntradaInvalida("");

    try {
      let autorEncontrado;
      const esGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(valorEntrada);

      if (esGuid) {
        autorEncontrado = await obtenerAutorPorId(valorEntrada);
      } else {
        autorEncontrado = await obtenerAutorPorNombre(valorEntrada);
      }

      onBuscarAutor(autorEncontrado);
    } catch (error) {
      console.error(error);
      setMensajeError("No se encontró el autor o hubo un error al obtenerlo.");
    }
  };

  return (
    <div className="contenedor-busqueda-autor">
      <input
        type="text"
        placeholder="Ingresa el ID o Nombre del autor"
        value={valorEntrada}
        onChange={(e) => setValorEntrada(e.target.value)}
        className="campo-busqueda-autor"
      />
      {mensajeEntradaInvalida && <p className="texto-error">{mensajeEntradaInvalida}</p>}

      <button onClick={manejarBusqueda} className="boton-buscar-autor">
        Buscar
      </button>

      {mensajeError && <p className="texto-error">{mensajeError}</p>}
    </div>
  );
};

export default AutorBuscar;
