import React, { useState } from "react";
import { obtenerUsuarioPorNombre, actualizarPassword } from "../../services/Api";
import "./ForgotPassword.css";

const ForgotPassword = ({ goBack }) => {
  const [username, setUsername] = useState("");
  const [userFound, setUserFound] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answerVerified, setAnswerVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const showMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleVerifyUser = async () => {
    if (!username.trim()) {
      showMessage("Ingresa un usuario.");
      return;
    }

    try {
      const user = await obtenerUsuarioPorNombre(username.trim());
      if (!user) {
        showMessage("Usuario no encontrado.");
        setUserFound(null);
        return;
      }

      setUserFound({
        username: user.nombreUsuario,
        secretQuestion: user.preguntaSecreta,
        secretAnswer: user.respuestaSecreta,
      });
    } catch (error) {
      showMessage("Error al conectarse al servidor.");
      setUserFound(null);
    }
  };

  const handleVerifyAnswer = () => {
    if (!answer.trim()) {
      showMessage("Ingresa la respuesta.");
      return;
    }

    if (
      answer.trim().toLowerCase() ===
      userFound.secretAnswer?.trim().toLowerCase()
    ) {
      setAnswerVerified(true);
      showMessage("Respuesta correcta. Ahora puedes cambiar tu contraseña.");
    } else {
      showMessage("Respuesta incorrecta.");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      showMessage("Ingresa la nueva contraseña.");
      return;
    }

    try {
      await actualizarPassword({
        nombreUsuario: userFound.username,
        nuevaPassword: newPassword,
      });
      showMessage("✅ ¡Contraseña actualizada con éxito!");
    } catch (error) {
      showMessage("❌ Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-container">
        <h2 className="fp-title">Recuperar Contraseña</h2>

        {!userFound && (
          <>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="fp-input"
            />
            <button onClick={handleVerifyUser} className="fp-button">
              Verificar Usuario
            </button>
          </>
        )}

        {userFound && !answerVerified && (
          <>
            <p className="fp-question">{userFound.secretQuestion}</p>
            <input
              type="text"
              placeholder="Respuesta"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="fp-input"
            />
            <button onClick={handleVerifyAnswer} className="fp-button">
              Verificar Respuesta
            </button>
          </>
        )}

        {userFound && answerVerified && (
          <>
            <p className="fp-question">Ahora ingresa tu nueva contraseña:</p>
            <input
              type="password"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="fp-input"
            />
            <button onClick={handleChangePassword} className="fp-button">
              Cambiar Contraseña
            </button>
          </>
        )}

        <button onClick={goBack} className="fp-back-button">
          Volver al login
        </button>
      </div>

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button className="close-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
