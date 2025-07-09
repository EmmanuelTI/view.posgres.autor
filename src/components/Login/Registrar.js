import React, { useState } from "react";
import { crearUsuario } from "../../services/Api";
import "./Registrar.css";

const Registrar = ({ goBack }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preguntaSecreta, setPreguntaSecreta] = useState("");
  const [respuestaSecreta, setRespuestaSecreta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistrar = async () => {
    if (!nombreUsuario || !password || !confirmPassword || !preguntaSecreta || !respuestaSecreta) {
      setMensaje("Por favor llena todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      await crearUsuario({
        nombreUsuario,
        password,
        preguntaSecreta,
        respuestaSecreta,
      });
      setMensaje("✅ Usuario registrado con éxito.");
      // Opcional: limpiar campos
      setNombreUsuario("");
      setPassword("");
      setConfirmPassword("");
      setPreguntaSecreta("");
      setRespuestaSecreta("");
    } catch (error) {
      setMensaje("❌ Error al registrar usuario.");
    }
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

        <input
          type="text"
          placeholder="Pregunta secreta"
          value={preguntaSecreta}
          onChange={(e) => setPreguntaSecreta(e.target.value)}
          className="registrar-input"
        />

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

        {mensaje && <p className="registrar-message">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Registrar;
