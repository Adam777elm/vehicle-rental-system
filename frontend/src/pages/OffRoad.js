import React from "react";
import "./OffRoad.css";
import heroImg from "../assets/MOTO_IMG/offroad-hero.jpg";

function OffRoad() {
  return (
    <div className="offroad-page">
      <div className="offroad-red-bar"></div>

      <section className="offroad-hero-banner">
        <img src={heroImg} alt="Yamaha Off Road" className="offroad-banner-img" />
        <div className="offroad-banner-overlay">
          <h1 className="offroad-banner-title">Off Road</h1>
        </div>
      </section>

      <section className="offroad-content-section">
        <h2 className="offroad-section-title">Découvrir la gamme Off Road</h2>
        <div className="offroad-placeholder-grid"></div>
      </section>
    </div>
  );
}

export default OffRoad;
