import React, { useState } from "react";
import { crearLibro } from "../../services/Api";
import '../../Css/Post.css';  

const AgregarLibro = () => {
  const [titulo, setTitulo] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [autorLibro, setAutorLibro] = useState("");

  // Estados para errores de cada campo
  const [tituloError, setTituloError] = useState("");
  const [fechaError, setFechaError] = useState("");
  const [autorError, setAutorError] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    // Limpiar errores previos
    setTituloError("");
    setFechaError("");
    setAutorError("");

    let valido = true;

    if (!titulo.trim()) {
      setTituloError("El título es obligatorio");
      valido = false;
    }
    if (!fechaPublicacion) {
      setFechaError("La fecha de publicación es obligatoria");
      valido = false;
    }
    if (!autorLibro.trim()) {
      setAutorError("El autor (ID) es obligatorio");
      valido = false;
    }

    if (!valido) return;

    const nuevoLibro = {
      titulo,
      fechaPublicacion,
      autorLibro,
    };

    try {
      await crearLibro(nuevoLibro);
      alert("Libro creado exitosamente");
      setTitulo("");
      setFechaPublicacion("");
      setAutorLibro("");
    } catch (error) {
      console.error("Error al crear el libro:", error);
      alert("Hubo un error al crear el libro");
    }
  };

  return (
    <div className="form-container">
      <h1>Agregar Libro</h1>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          {tituloError && <p className="mensaje-error">{tituloError}</p>}
        </div>
        <div>
          <label>Fecha de Publicación:</label>
          <input
            type="date"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
          />
          {fechaError && <p className="mensaje-error">{fechaError}</p>}
        </div>
        <div>
          <label>Autor (ID):</label>
          <input
            type="text"
            value={autorLibro}
            onChange={(e) => setAutorLibro(e.target.value)}
          />
          {autorError && <p className="mensaje-error">{autorError}</p>}
        </div>
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

export default AgregarLibro;
