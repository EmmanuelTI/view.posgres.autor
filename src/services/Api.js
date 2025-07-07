import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://microservices-libro.onrender.com/api", // Reemplaza <puerto> con el puerto de tu API.
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



 const apiautor = axios.create({
  baseURL: "https://microeservicioautor.somee.com/api",
  headers: {
    "Content-Type": "application/json",
   },
 });



export const obtenerAutores = async () => {
  const response = await apiautor.get("/Autor");
  return response.data;
};

export const crearAutor = async (autor) => {
  const response = await apiautor.post("/Autor", autor);
  return response.data;
};

export const obtenerAutorPorId = async (id) => {
  const response = await apiautor.get(`/Autor/${id}`);
  return response.data;
};
export const obtenerAutorPorNombre = async (nombre) => {
  const response = await apiautor.get(`/Autor/nombre/${nombre}`);
  return response.data;
};





