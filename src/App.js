import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

import ListarLibros from "./components/Libros/LibroGet";
import AgregarLibro from "./components/Libros/LibroPost";
import ListarAutor from "./components/AutorGet";
import AgregarAutor from "./components/AutorPost";
import Login from "./components/Login/Login";
import Registrar from "./components/Login/Registrar";  
import { cerrarSesion } from "./services/Api"; 

import "./App.css";
import logo from "./img/4852762.jpg";

const Sidebar = ({ onLogout }) => {
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
          Libros {librosOpen ? "▲" : "▼"}
        </button>
        {librosOpen && (
          <nav className="submenu">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Listar Libros
            </NavLink>
            <NavLink
              to="/agregar"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Agregar Libro
            </NavLink>
          </nav>
        )}
      </div>

      <div className="menu-section">
        <button className="menu-title" onClick={() => setAutoresOpen(!autoresOpen)}>
          Autores {autoresOpen ? "▲" : "▼"}
        </button>
        {autoresOpen && (
          <nav className="submenu">
            <NavLink
              to="/buscarAutor"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Listar Autores
            </NavLink>
            <NavLink
              to="/agregarAutor"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Agregar Autor
            </NavLink>
          </nav>
        )}
      </div>

      <button className="logout-icon" onClick={onLogout} title="Cerrar sesión">
        <LogOut size={24} />
      </button>
    </aside>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegistrar, setShowRegistrar] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await cerrarSesion();  
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("usuario");
      localStorage.removeItem("token"); 
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    
    }
  };

  if (!isAuthenticated) {
    return showRegistrar ? (
      <Registrar goBack={() => setShowRegistrar(false)} />
    ) : (
      <Login onLogin={handleLogin} onShowRegistrar={() => setShowRegistrar(true)} />
    );
  }

  return (
    <Router>
      <div className={`app-container authenticated`}>
        <Sidebar onLogout={handleLogout} />
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
