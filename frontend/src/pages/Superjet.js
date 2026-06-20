import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MarineCategories.css";
import heroImg from "../assets/MARINE_IMG/marine-superjet.jpg";

function Superjet() {
  const navigate = useNavigate();

  const superjets = [
    {
      id: 311,
      name: "SuperJet 1050",
      category: "Marine",
      description: "La légende absolue du jet-ski à bras. Redéfinie avec un puissant moteur 4 temps à 3 cylindres TR-1 et une coque ultra-légère conçue pour le freeride et le slalom.",
      price: "125 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamaha-motor.co.nz/-/media/products/marine/waverunner/standup/2024/superjet/2024_superjet_white_stu_001.ashx",
      specs: {
        engine: "3 cylindres TR-1, 1 049 cm³",
        power: "100 ch",
        weight: "170 kg",
        tank: "19 litres"
      },
      features: ["Moteur TR-1 4 temps compact", "Bras de direction à ressort réglable", "Coque légère à profil large", "Mode d'apprentissage électronique (L-Mode)"]
    }
  ];

  const handleNav = (bike) => {
    navigate(`/moto/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="marine-cat-page">
      <div className="marine-cat-red-bar"></div>

      <section className="marine-cat-hero-banner">
        <img src={heroImg} alt="Yamaha SuperJet" className="marine-cat-banner-img" />
        <div className="marine-cat-banner-overlay">
          <h1 className="marine-cat-banner-title">SUPERJET</h1>
          <p className="marine-cat-banner-subtitle">Stand-Up Jet Legend</p>
        </div>
      </section>

      <section className="marine-cat-content-section">
        <h2 className="marine-cat-section-title">GAMME STAND-UP</h2>
        <div className="marine-cat-separator"></div>

        <div className="marine-cat-grid">
          {superjets.map((bike) => (
            <div key={bike.id} className="marine-cat-card" onClick={() => handleNav(bike)}>
              <div className="marine-cat-card-image-box">
                <div className="marine-cat-badge">JET À BRAS</div>
                <img src={bike.image} alt={bike.name} className="marine-cat-image" />
                <div className="marine-cat-hover-overlay">
                  <button className="marine-cat-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>PARAMÈTRES</button>
                </div>
              </div>

              <div className="marine-cat-card-content">
                <p className="marine-cat-brand">YAMAHA</p>
                <h3 className="marine-cat-name">{bike.name}</h3>
                <p className="marine-cat-desc">{bike.description}</p>
                
                <div className="marine-cat-card-footer">
                  <span className="marine-cat-price">{bike.price}</span>
                  <button className="marine-cat-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Superjet;
