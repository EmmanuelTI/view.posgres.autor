import React, { useEffect, useState } from "react";
import { obtenerAutores } from "../services/Api";
import AutorBuscar from "./AutorIdGet";
import "../Css/Get.css";

const ListarAutores = () => {
  const [autores, setAutores] = useState([]);
  const [autorSeleccionado, setAutorSeleccionado] = useState(null); // Estado para el autor buscado

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

  // Callback para manejar el autor buscado desde AutorBuscar
  const handleBuscarAutor = (autor) => {
    setAutorSeleccionado(autor);
  };

  return (
    <div className="autores-container">
      <h1 className="titulo">Listado de Autores</h1>
      
      {/* Componente de búsqueda */}
      <AutorBuscar onBuscarAutor={handleBuscarAutor} />

      {/* Si hay un autor seleccionado, mostrar solo ese autor */}
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
          <button
            className="btn-reset"
            onClick={() => setAutorSeleccionado(null)} // Permite volver al listado
          >
            Mostrar todos los autores
          </button>
        </div>
      ) : (
        // Si no hay autor seleccionado, mostrar todos los autores
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
