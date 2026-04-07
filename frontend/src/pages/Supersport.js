import React from "react";
import "./Supersport.css";
import heroImg from "../assets/MOTO_IMG/supersport-hero.jpg";

function Supersport() {
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

      {/* Main Content Area starting with exactly the title requested */}
      <section className="supersport-content-section">
        <h2 className="supersport-section-title">Découvrir la gamme Supersport</h2>
        
        {/* Placeholder for future bikes grid */}
        <div className="supersport-placeholder-grid">
           {/* Les données des motos viendront ici plus tard */}
        </div>
      </section>
    </div>
  );
}

export default Supersport;
