import React, { useEffect, useState } from "react";
import { obtenerAutores } from "../services/Api";
import AutorBuscar from "./AutorIdGet";
import "../Css/ListarAutores.css";

const ListarAutores = () => {
  const [autores, setAutores] = useState([]);
  const [autorSeleccionado, setAutorSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const autoresPorPagina = 16;

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

  const handleBuscarAutor = (autor) => {
    if (!autor) {
      setAutorSeleccionado(null);
    } else {
      setAutorSeleccionado(autor);
    }
  };

  // Calcular cuántas páginas hay
  const totalPaginas = Math.ceil(autores.length / autoresPorPagina);

  // Calcular índice de autores a mostrar
  const indiceInicio = (paginaActual - 1) * autoresPorPagina;
  const indiceFinal = indiceInicio + autoresPorPagina;
  const autoresPagina = autores.slice(indiceInicio, indiceFinal);

  // Cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="autores-container">
      <AutorBuscar onBuscarAutor={handleBuscarAutor} />

      {autorSeleccionado ? (
        <div className="tarjeta-autor">
          <h3 className="subtitulo">Detalles del Autor</h3>
          <p><strong>ID:</strong> {autorSeleccionado.autorLibroId}</p>
          <p><strong>Nombre:</strong> {autorSeleccionado.nombre} {autorSeleccionado.apellido}</p>
          <p><strong>Fecha de Nacimiento:</strong> {new Date(autorSeleccionado.fechaNacimiento).toLocaleDateString()}</p>
          <p><strong>GUID:</strong> {autorSeleccionado.autorLibroGuid}</p>
        </div>
      ) : (
        <>
          <div className="cards-grid">
            {autoresPagina.map((autor) => (
              <div className="card" key={autor.autorLibroId}>
                <h3 className="card-title">
                  {autor.nombre} {autor.apellido}
                </h3>
                <p><strong>ID:</strong> {autor.autorLibroId}</p>
                <p><strong>Fecha de Nacimiento:</strong> {new Date(autor.fechaNacimiento).toLocaleDateString()}</p>
                <p><strong>GUID:</strong> {autor.autorLibroGuid}</p>
              </div>
            ))}
          </div>

          {/* Controles de paginación */}
          <div className="paginacion">
            <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
              Anterior
            </button>
            {[...Array(totalPaginas)].map((_, index) => (
              <button
                key={index}
                onClick={() => cambiarPagina(index + 1)}
                className={paginaActual === index + 1 ? "activo" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListarAutores;
