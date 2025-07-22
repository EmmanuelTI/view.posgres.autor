import React, { useState } from "react";
import ForgotPassword from "../Login/ForgotPassword";
import { iniciarSesion } from "../../services/Api";
import "./Login.css";

const Login = ({ onLogin, onShowRegistrar }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    setModalMensaje("");
    setCargando(true);

    try {
      // La respuesta ahora incluye { usuario, token }
      const respuesta = await iniciarSesion({
        nombreUsuario: username.trim(),
        password: password,
      });

      // Guardar token JWT para futuras peticiones
      localStorage.setItem("token", respuesta.token);

      // Guardar info del usuario
      localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

      localStorage.setItem("isAuthenticated", "true");
      onLogin();
    } catch (error) {
      if (error.response?.status === 401) {
        setModalMensaje("❌ Usuario no existe o contraseña incorrecta.");
      } else {
        setModalMensaje("❌ Error al conectar con el servidor.");
      }
    } finally {
      setCargando(false);
    }
  };

  if (forgot) return <ForgotPassword goBack={() => setForgot(false)} />;

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          autoFocus
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button onClick={handleLogin} className="login-button" disabled={cargando}>
          Entrar
        </button>

        <button onClick={() => setForgot(true)} className="forgot-button">
          ¿Olvidaste tu contraseña?
        </button>

        <button
          onClick={onShowRegistrar}
          className="register-button"
          style={{ marginTop: "10px" }}
        >
          Crear una cuenta
        </button>
      </div>

      {cargando && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}

      {modalMensaje && !cargando && (
        <div className="overlay">
          <div className="modal-content">
            <p>{modalMensaje}</p>
            <button onClick={() => setModalMensaje("")}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
