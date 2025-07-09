import React, { useEffect, useState } from "react";
import { obtenerLibros } from "../../services/Api";
import LibroPorId from "./LibroIdGet";
import "../Libros/css/Get.css";

const ListarLibros = () => {
  const [libros, setLibros] = useState([]);
  const [todosLosLibros, setTodosLosLibros] = useState([]);
  const [libroFiltrado, setLibroFiltrado] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const data = await obtenerLibros();
        setLibros(data);
        setTodosLosLibros(data);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    fetchLibros();
  }, []);

  const handleBuscarLibro = (libro) => {
    setLibroFiltrado(libro);
    if (libro) {
      setLibros([]); // ocultamos listado completo si hay resultado
    } else {
      setLibros(todosLosLibros);
    }
  };

  const handleLimpiarBusqueda = () => {
    setLibroFiltrado(null);
    setLibros(todosLosLibros);
  };

  return (
    <div>
      <LibroPorId
        onBuscarLibro={handleBuscarLibro}
        onLimpiarBusqueda={handleLimpiarBusqueda}
      />

      {libroFiltrado ? (
        <div className="card-resultado">
          <h3 className="card-title">{libroFiltrado.titulo}</h3>
          <p>
            <strong>ID:</strong> {libroFiltrado.libreriaMaterialId}
          </p>
          <p>
            <strong>Fecha de Publicación:</strong>{" "}
            {new Date(libroFiltrado.fechaPublicacion).toLocaleDateString()}
          </p>
          <p>
            <strong>Autor ID:</strong> {libroFiltrado.autorLibro}
          </p>
        </div>
      ) : (
        <div className="cards-grid">
          {libros.map((libro) => (
            <div className="card" key={libro.libreriaMaterialId}>
              <h3 className="card-title">{libro.titulo}</h3>
              <p>
                <strong>ID:</strong> {libro.libreriaMaterialId}
              </p>
              <p>
                <strong>Fecha de Publicación:</strong>{" "}
                {new Date(libro.fechaPublicacion).toLocaleDateString()}
              </p>
              <p>
                <strong>Autor ID:</strong> {libro.autorLibro}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListarLibros;
