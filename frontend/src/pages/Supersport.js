import React, { useState, useEffect } from "react";
import "./Supersport.css";
import heroImg from "../assets/MOTO_IMG/supersport-hero.jpg";

function Supersport() {
  const [loading, setLoading] = useState(true);
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    // Simulation d'un appel API
    const timer = setTimeout(() => {
      setLoading(false);
      // setMotos([]); // On garde un tableau vide pour afficher le message "Aucune moto disponible"
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="supersport-page">
      {/* Top red bar similar to the reference image */}
      <div className="supersport-red-bar"></div>

      {/* Hero Banner Section */}
      <section className="supersport-hero-banner">
        <img src={heroImg} alt="Yamaha Supersport en pleine vitesse" className="supersport-banner-img" />
        <div className="supersport-banner-overlay">
          <h1 className="supersport-banner-title">Supersport</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="supersport-content-section">
        <h2 className="supersport-section-title">Découvrir la gamme Supersport</h2>
        
        {loading ? (
          /* SKELETON LOADING */
          <div className="skeleton-grid">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        ) : motos.length === 0 ? (
          /* EMPTY STATE */
          <div className="empty-state">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 20.3a8.994 8.994 0 0 1-5.3-5.3M21 21l-4.35-4.35M15 4.66V4H9v.66M12 2v2M19.34 9A9.15 9.15 0 0 0 12 5a9.15 9.15 0 0 0-7.34 4"/></svg>
             <h3>Aucune moto disponible</h3>
             <p>Notre inventaire de Supersport est actuellement en cours de mise à jour.</p>
          </div>
        ) : (
          /* ACTUAL BIKES GRID (Placeholder) */
          <div className="supersport-placeholder-grid">
             {/* Les données des motos viendront ici plus tard */}
          </div>
        )}
      </section>
    </div>
  );
}

export default Supersport;
