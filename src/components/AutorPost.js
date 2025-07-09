import React, { useState } from "react";
import { crearAutor } from "../services/Api"; // Cambiar el nombre de la función si aplica
import "../Css/Post.css";

const AgregarAutor = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // Estados para errores de cada campo
  const [nombreError, setNombreError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [fechaError, setFechaError] = useState("");

  const manejarSubmit = async (e) => {
  e.preventDefault();

  setNombreError("");
  setApellidoError("");
  setFechaError("");

  let valido = true;

  if (!nombre.trim()) {
    setNombreError("El nombre es obligatorio");
    valido = false;
  }
  if (!apellido.trim()) {
    setApellidoError("El apellido es obligatorio");
    valido = false;
  }
  if (!fechaNacimiento) {
    setFechaError("La fecha de nacimiento es obligatoria");
    valido = false;
  }

  if (!valido) return;

 
  const fechaIso = new Date(fechaNacimiento).toISOString();

  const nuevoAutor = {
    nombre,
    apellido,
    fechaNacimiento: fechaIso,
  };

  console.log("Datos que se enviarán al backend:", nuevoAutor);

  try {
    const response = await crearAutor(nuevoAutor);
    console.log("Respuesta backend:", response);
    alert("Autor creado exitosamente");
    setNombre("");
    setApellido("");
    setFechaNacimiento("");
  } catch (error) {
    console.error("Error al crear el autor:", error.response || error);
    alert("Hubo un error al crear el autor");
  }
};


  return (
    <div className="form-container">
      <h1>Agregar Autor</h1>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {nombreError && <p className="mensaje-error">{nombreError}</p>}
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          {apellidoError && <p className="mensaje-error">{apellidoError}</p>}
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
          {fechaError && <p className="mensaje-error">{fechaError}</p>}
        </div>
        <button type="submit">Agregar Autor</button>
      </form>
    </div>
  );
};

export default AgregarAutor;
