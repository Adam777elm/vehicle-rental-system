import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./CSS/ForgotPassword.css";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toast Notification state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Veuillez entrer une adresse email valide.", "error");
      return;
    }

    try {
      const { data } = await API.post("/users/forgot-password", { email });
      setGeneratedCode(data.code);
      console.log("DEMO RECOVERY CODE (from backend):", data.code);
      
      showToast("Un code de vérification a été envoyé par email.", "success");
      setStep(2);
    } catch (error) {
      showToast(error.response?.data?.message || "Erreur lors de l'envoi de l'email.", "error");
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === generatedCode || code === "123456") { // 123456 is fallback override
      showToast("Code vérifié avec succès.", "success");
      setStep(3);
    } else {
      showToast("Code incorrect. Veuillez réessayer.", "error");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast("Le mot de passe doit faire au moins 6 caractères.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Les mots de passe ne correspondent pas.", "error");
      return;
    }

    showToast("Votre mot de passe a été réinitialisé !", "success");
    
    // Simulate updating in DB / locally
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="auth-container">
      {/* TOAST NOTIFICATION */}
      {toast.visible && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.type === "success" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* STEP INDICATOR */}
      <div className="forgot-steps">
        <div className={`step-dot ${step >= 1 ? "active" : ""}`}>1</div>
        <div className="step-line"></div>
        <div className={`step-dot ${step >= 2 ? "active" : ""}`}>2</div>
        <div className="step-line"></div>
        <div className={`step-dot ${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      {step === 1 && (
        <>
          <div className="auth-tabs">
            <button className="auth-tab active" style={{ cursor: "default" }}>RÉCUPÉRATION</button>
          </div>
          <p className="auth-description">
            Entrez votre adresse email ci-dessous. Nous vous enverrons un code de sécurité à 6 chiffres pour réinitialiser votre mot de passe.
          </p>
          <form className="auth-form" onSubmit={handleSendCode}>
            <div className="input-group">
              <span className="input-label">Adresse Email</span>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">ENVOYER LE CODE</button>
            <Link to="/login" className="forgot-link" style={{ textAlign: "center", display: "block" }}>
              Retour à la page de connexion
            </Link>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <div className="auth-tabs">
            <button className="auth-tab active" style={{ cursor: "default" }}>CODE DE SÉCURITÉ</button>
          </div>
          <p className="auth-description">
            Un code a été généré. Entrez-le ci-dessous pour confirmer votre identité.
            <br />
            <strong style={{ color: "var(--yamaha-red)" }}>Code de démo : {generatedCode}</strong>
          </p>
          <form className="auth-form" onSubmit={handleVerifyCode}>
            <div className="input-group">
              <span className="input-label">Code de Vérification</span>
              <input
                type="text"
                maxLength="6"
                className="auth-input verification-code-input"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="0 0 0 0 0 0"
                required
              />
            </div>
            <button type="submit" className="auth-button">VÉRIFIER LE CODE</button>
            <button 
              type="button" 
              className="forgot-link" 
              style={{ background: "none", border: "none", width: "100%", textAlign: "center", cursor: "pointer" }}
              onClick={() => setStep(1)}
            >
              Modifier l'adresse email
            </button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <div className="auth-tabs">
            <button className="auth-tab active" style={{ cursor: "default" }}>NOUVEAU MOT DE PASSE</button>
          </div>
          <p className="auth-description">
            Veuillez entrer votre nouveau mot de passe sécurisé. Il doit contenir au moins 6 caractères.
          </p>
          <form className="auth-form" onSubmit={handleResetPassword}>
            <div className="input-group">
              <span className="input-label">Nouveau Mot de passe</span>
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </span>
            </div>

            <div className="input-group">
              <span className="input-label">Confirmer le Mot de passe</span>
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">RÉINITIALISER LE MOT DE PASSE</button>
          </form>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
