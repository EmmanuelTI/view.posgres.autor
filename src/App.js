import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ListarLibros from "./components/Libros/LibroGet";
import AgregarLibro from "./components/Libros/LibroPost";


import ListarAutor from "./components/AutorGet";
import AgregarAutor from "./components/AutorPost";

import './App.css';
import logo from './img/4852762.jpg';

const Sidebar = () => {
  const [librosOpen, setLibrosOpen] = useState(true);
  const [autoresOpen, setAutoresOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">Librería</span>
      </div>

      <div className="menu-section">
        <button className="menu-title" onClick={() => setLibrosOpen(!librosOpen)}>
          Libros {librosOpen ? '▲' : '▼'}
        </button>
        {librosOpen && (
          <nav className="submenu">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
              Listar Libros
            </NavLink>
            <NavLink to="/agregar" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Agregar Libro
            </NavLink>
        
          </nav>
        )}
      </div>

      <div className="menu-section">
        <button className="menu-title" onClick={() => setAutoresOpen(!autoresOpen)}>
          Autores {autoresOpen ? '▲' : '▼'}
        </button>
        {autoresOpen && (
          <nav className="submenu">
            <NavLink to="/buscarAutor" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Listar Autores
            </NavLink>
            <NavLink to="/agregarAutor" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Agregar Autor
            </NavLink>
           
          </nav>
        )}
      </div>
    </aside>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ListarLibros />} />
            <Route path="/agregar" element={<AgregarLibro />} />
         
            <Route path="/buscarAutor" element={<ListarAutor />} />
            <Route path="/agregarAutor" element={<AgregarAutor />} />
       
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
