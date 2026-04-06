import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    showToast("Tu as bien été déconnecté.", "success");
    // On met à jour la navbar
    setTimeout(() => window.location.reload(), 1500);
  };

  // Toast Notification state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500); // Disparaît après 2.5s
  };

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // REGISTER
        await API.post("/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        showToast("Account created! Please sign in.", "success");
        setIsRegister(false); // Switch to login tab
      } else {
        // LOGIN
        const res = await API.post("/users/login", {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        showToast("Welcome back!", "success");
        
        // Attendre que la notification soit lue avant de rafraichir
        setTimeout(() => {
          setUser(res.data.user);
          window.location.reload(); 
        }, 1500);
      }
    } catch (error) {
      showToast(error.response?.data?.message || "An error occurred", "error");
    }
  };

  return (
    <div className="auth-container">
      {/* TOAST NOTIFICATION MODAL */}
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

      {user ? (
        <div className="profile-wrapper">
          <div className="auth-tabs">
            <button className="auth-tab active" style={{ cursor: 'default' }}>MON ESPACE</button>
          </div>
          <p className="auth-description">
            Content de vous revoir parmi nous ! Vous êtes bien connecté. Voici vos coordonnées d'utilisateur.
          </p>
          
          <div className="profile-card">
            <div className="profile-info-group">
              <span className="profile-label">Nom complet</span>
              <p className="profile-value">{user.name}</p>
            </div>
            
            <div className="profile-info-group" style={{ marginBottom: '30px' }}>
              <span className="profile-label">Adresse Email</span>
              <p className="profile-value">{user.email}</p>
            </div>
            
            <button onClick={handleLogout} className="auth-button logout-btn">
              Se déconnecter
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* TABS */}
          <div className="auth-tabs">
        <button
          className={`auth-tab ${!isRegister ? "active" : ""}`}
          onClick={() => setIsRegister(false)}
        >
          Sign In
        </button>
        <button
          className={`auth-tab ${isRegister ? "active" : ""}`}
          onClick={() => setIsRegister(true)}
        >
          Create Account
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="auth-description">
        {!isRegister
          ? "Enter your email and password to get started. You can manage your orders and reservations."
          : "Join our community to access exclusive features, track your orders, and manage your motorcycles. Register today."
        }
      </p>

      {/* FORM */}
      <form className="auth-form" onSubmit={handleSubmit}>

        {isRegister && (
          <div className="input-group">
            <span className="input-label">Name</span>
            <input
              type="text"
              name="name"
              className="auth-input"
              value={formData.name}
              onChange={handleChange}
              required={isRegister}
            />
          </div>
        )}

        <div className="input-group">
          <span className="input-label">Email</span>
          <input
            type="email"
            name="email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="input-label">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </span>
        </div>

        {!isRegister && (
          <a href="/forgot" className="forgot-link">Forgot password?</a>
        )}

        <button type="submit" className="auth-button">
          {isRegister ? "Create Account" : "Sign In"}
        </button>
      </form>
      </>
    )}
    </div>
  );
}

export default Login;