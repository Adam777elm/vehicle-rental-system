import React from "react";
import "./SportTouring.css";
import heroImg from "../assets/MOTO_IMG/sporttouring-hero.jpg";

function SportTouring() {
  return (
    <div className="st-page">
      <div className="st-red-bar"></div>

      <section className="st-hero-banner">
        <img src={heroImg} alt="Yamaha Sport Touring" className="st-banner-img" />
        <div className="st-banner-overlay">
          <h1 className="st-banner-title">Sport Touring</h1>
        </div>
      </section>

      <section className="st-content-section">
        <h2 className="st-section-title">Découvrir la gamme Sport Touring</h2>
        <div className="st-placeholder-grid"></div>
      </section>
    </div>
  );
}

export default SportTouring;
