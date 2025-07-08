import axios from "axios";

// ---------------------- LIBROS (sigue con Axios porque funciona) ------------------------
const apiClient = axios.create({
  baseURL: "https://microservices-libro.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const obtenerLibros = async () => {
  const response = await apiClient.get("/LibroMaterial");
  return response.data;
};

export const crearLibro = async (libro) => {
  const response = await apiClient.post("/LibroMaterial", libro);
  return response.data;
};

export const obtenerLibroPorId = async (id) => {
  const response = await apiClient.get(`/LibroMaterial/${id}`);
  return response.data;
};

// ---------------------- AUTORES (con fetch para evitar error HTTP/2) ------------------------

const baseUrlAutor = "https://microeservicioautor.somee.com/api/Autor";

export const obtenerAutores = async () => {
  const response = await fetch(baseUrlAutor, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Connection": "close",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener autores: ${response.status}`);
  }

  return await response.json();
};

export const crearAutor = async (autor) => {
  const response = await fetch(baseUrlAutor, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Connection": "close",
    },
    body: JSON.stringify(autor),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear autor: ${response.status} - ${errorText}`);
  }

  return await response.json();
};

export const obtenerAutorPorId = async (id) => {
  const response = await fetch(`${baseUrlAutor}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Connection": "close",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener autor por ID: ${response.status}`);
  }

  return await response.json();
};

export const obtenerAutorPorNombre = async (nombre) => {
  const response = await fetch(`${baseUrlAutor}/nombre/${nombre}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Connection": "close",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener autor por nombre: ${response.status}`);
  }

  return await response.json();
};
