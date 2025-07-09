import React, { useEffect, useState } from "react";
import { obtenerAutores } from "../services/Api";
import AutorBuscar from "./AutorIdGet";
import "../Css/ListarAutores.css";

const ListarAutores = () => {
  const [autores, setAutores] = useState([]);
  const [autorSeleccionado, setAutorSeleccionado] = useState(null);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const data = await obtenerAutores();
        setAutores(data);
      } catch (error) {
        console.error("Error al obtener los autores:", error);
      }
    };

    fetchAutores();
  }, []);

  // Función para manejar la búsqueda, si es null o vacío mostramos todo
  const handleBuscarAutor = (autor) => {
    if (!autor) {
      setAutorSeleccionado(null); // Mostrar todos si no hay autor
    } else {
      setAutorSeleccionado(autor);
    }
  };

  return (
    <div className="autores-container">
      <AutorBuscar onBuscarAutor={handleBuscarAutor} />

      {autorSeleccionado ? (
        <div className="tarjeta-autor">
          <h3 className="subtitulo">Detalles del Autor</h3>
          <p>
            <strong>ID:</strong> {autorSeleccionado.autorLibroId}
          </p>
          <p>
            <strong>Nombre:</strong> {autorSeleccionado.nombre} {autorSeleccionado.apellido}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {new Date(autorSeleccionado.fechaNacimiento).toLocaleDateString()}
          </p>
          <p>
            <strong>GUID:</strong> {autorSeleccionado.autorLibroGuid}
          </p>
          {/* Quitamos el botón de "Mostrar todos" */}
        </div>
      ) : (
        <div className="cards-grid">
          {autores.map((autor) => (
            <div className="card" key={autor.autorLibroId}>
              <h3 className="card-title">
                {autor.nombre} {autor.apellido}
              </h3>
              <p>
                <strong>ID:</strong> {autor.autorLibroId}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {new Date(autor.fechaNacimiento).toLocaleDateString()}
              </p>
              <p>
                <strong>GUID:</strong> {autor.autorLibroGuid}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListarAutores;
