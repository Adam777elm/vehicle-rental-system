import React from "react";
import "./Roadster.css";
import heroImg from "../assets/MOTO_IMG/roadster-hero.jpg";

function Roadster() {
  return (
    <div className="roadster-page">
      <div className="roadster-red-bar"></div>

      <section className="roadster-hero-banner">
        <img src={heroImg} alt="Yamaha Roadster" className="roadster-banner-img" />
        <div className="roadster-banner-overlay">
          <h1 className="roadster-banner-title">Roadster</h1>
        </div>
      </section>

      <section className="roadster-content-section">
        <h2 className="roadster-section-title">Découvrir la gamme Roadster</h2>
        
        <div className="roadster-placeholder-grid"></div>
      </section>
    </div>
  );
}

export default Roadster;
