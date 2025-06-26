import React, { useEffect, useState } from "react";
import { obtenerLibros } from "../../services/Api";
import "../../Css/Get.css"; 

import LibroPorId from "./LibroIdGet"; 

const ListarLibros = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const data = await obtenerLibros();
        setLibros(data);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    fetchLibros();
  }, []);

  return (
    <div>
     
      <LibroPorId />

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
    </div>
  );
};

export default ListarLibros;
