import axios from "axios";

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



 const apiautor = axios.create({
  baseURL: "https://autoreslibro.somee.com/api",
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


const apilogin = axios.create({
  baseURL: "https://microservicio-mongo.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const obtenerUsuarios = async () => {
  const response = await apilogin.get("/usuarios");
  return response.data;
};

export const crearUsuario = async (usuario) => {
  const response = await apilogin.post("/registro", usuario);
  return response.data;
};


export const obtenerUsuarioPorNombre = async (nombreUsuario) => {
  const response = await apilogin.get(`/usuario/${nombreUsuario}`);
  return response.data;
};


export const iniciarSesion = async ({ nombreUsuario, password }) => {
  const response = await apilogin.post("/login", {
    nombreUsuario,
    password,
  });
  return response.data;
};

export const actualizarPassword = async ({ nombreUsuario, nuevaPassword }) => {
  const response = await apilogin.put("/actualizarpassword", {
    nombreUsuario,
    nuevaPassword,
  });
  return response.data;
};



