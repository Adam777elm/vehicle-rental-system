import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MarineCategories.css";
import heroImg from "../assets/MARINE_IMG/marine-waveboat.jpg";

function Waveboat() {
  const navigate = useNavigate();

  const waveboats = [
    {
      id: 321,
      name: "Wave Boat 575",
      category: "Marine",
      description: "Le mélange parfait entre le bateau de plaisance et la sportivité du jet-ski. Propulsé par la poussée de votre WaveRunner pour des sensations inédites partagées jusqu'à 8 personnes.",
      price: "350 000 DH",
      type: "vente",
      availability: true,
      image: "https://sealver.com/wp-content/uploads/2019/04/sealver_silhouettes_575-Active.jpg",
      specs: {
        engine: "Propulsion par Jet-Ski (Waverunner)",
        power: "Selon Jet-Ski",
        weight: "450 kg",
        tank: "Selon Jet-Ski"
      },
      features: ["Capacité de 8 personnes", "Cockpit convertible en grand bain de soleil", "Connexion/Déconnexion en 15 secondes", "Structure de wakeboard en option"]
    },
    {
      id: 322,
      name: "Wave Boat 656",
      category: "Marine",
      description: "Le summum du luxe et de l'espace sur l'eau. Un salon flottant ultra-confortable propulsé par la force de votre jet-ski pour un confort de navigation royal.",
      price: "480 000 DH",
      type: "vente",
      availability: true,
      image: "https://sealver.com/wp-content/uploads/2019/04/sealver_silhouettes_656-Lounge.jpg",
      specs: {
        engine: "Propulsion par Jet-Ski (Waverunner)",
        power: "Selon Jet-Ski",
        weight: "600 kg",
        tank: "Selon Jet-Ski"
      },
      features: ["Capacité de 10 personnes", "Grand carré de pont convivial en U", "Coque exclusive Sealver haute performance", "Finitions teck et sellerie marine de luxe"]
    }
  ];

  const handleNav = (bike) => {
    navigate(`/moto/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="marine-cat-page">
      <div className="marine-cat-red-bar"></div>

      <section className="marine-cat-hero-banner">
        <img src={heroImg} alt="Yamaha Wave Boat" className="marine-cat-banner-img" />
        <div className="marine-cat-banner-overlay">
          <h1 className="marine-cat-banner-title">WAVE BOAT</h1>
          <p className="marine-cat-banner-subtitle">The Jet-Boat Revolution</p>
        </div>
      </section>

      <section className="marine-cat-content-section">
        <h2 className="marine-cat-section-title">GAMME BOAT PROPULSION</h2>
        <div className="marine-cat-separator"></div>

        <div className="marine-cat-grid">
          {waveboats.map((bike) => (
            <div key={bike.id} className="marine-cat-card" onClick={() => handleNav(bike)}>
              <div className="marine-cat-card-image-box">
                <div className="marine-cat-badge">WAVE BOAT</div>
                <img src={bike.image} alt={bike.name} className="marine-cat-image" />
                <div className="marine-cat-hover-overlay">
                  <button className="marine-cat-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>PARAMÈTRES</button>
                </div>
              </div>

              <div className="marine-cat-card-content">
                <p className="marine-cat-brand">SEALVER</p>
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

export default Waveboat;
