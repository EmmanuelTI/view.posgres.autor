import React, { useState } from "react";
import { crearUsuario } from "../../services/Api";
import "./Registrar.css";

const preguntasPredefinidas = [
  "¿Cuál es el nombre de tu primera mascota?",
  "¿Cuál es tu comida favorita?",
  "¿Cuál es el nombre de tu mejor amigo/a de la infancia?",
  "¿Cuál fue tu primer maestro o maestra?",
  "¿En qué ciudad naciste?",
];

const Registrar = ({ goBack }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preguntaSecreta, setPreguntaSecreta] = useState("");
  const [respuestaSecreta, setRespuestaSecreta] = useState("");
  const [modalMensaje, setModalMensaje] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleRegistrar = async () => {
    if (!nombreUsuario || !password || !confirmPassword || !preguntaSecreta || !respuestaSecreta) {
      mostrarMensaje("Por favor llena todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      mostrarMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      await crearUsuario({
        nombreUsuario,
        password,
        preguntaSecreta,
        respuestaSecreta,
      });
      mostrarMensaje("✅ Usuario registrado con éxito.");
      setNombreUsuario("");
      setPassword("");
      setConfirmPassword("");
      setPreguntaSecreta("");
      setRespuestaSecreta("");
    } catch (error) {
      mostrarMensaje("❌ Error al registrar usuario.");
    }
  };

  const mostrarMensaje = (mensaje) => {
    setModalMensaje(mensaje);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className="registrar-page">
      <div className="registrar-container">
        <h2 className="registrar-title">Registrar Usuario</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          className="registrar-input"
          autoFocus
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="registrar-input"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="registrar-input"
        />

        <select
          value={preguntaSecreta}
          onChange={(e) => setPreguntaSecreta(e.target.value)}
          className="registrar-input"
        >
          <option value="">Selecciona una pregunta secreta</option>
          {preguntasPredefinidas.map((pregunta, index) => (
            <option key={index} value={pregunta}>
              {pregunta}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Respuesta secreta"
          value={respuestaSecreta}
          onChange={(e) => setRespuestaSecreta(e.target.value)}
          className="registrar-input"
        />

        <button onClick={handleRegistrar} className="registrar-button">
          Registrar
        </button>

        <button onClick={goBack} className="volver-button">
          Volver al Login
        </button>
      </div>

      
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMensaje}</p>
            <button className="close-button" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registrar;
