import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Scooters.css";
import heroImg from "../assets/MOTO_IMG/bg-scooter.png";

function Scooters() {
  const navigate = useNavigate();

  const scooterBikes = [
    {
      id: 501,
      name: "TMAX 560 ANNIVERSARY",
      category: "Scooter",
      description: "Édition exclusive Anniversaire. Le Sport Scooter légendaire célèbre son héritage avec des finitions premium Black MAX et des performances inégalées.",
      price: "215 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500ASV/2026-Yamaha-XP500ASV-EU-Black_MAX_-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "Bicylindre parallèle, 560 cm³",
        power: "47,6 ch (35,0 kW) @ 7 500 tr/min",
        weight: "220 kg",
        tank: "15 litres"
      },
      features: ["Édition limitée Black MAX", "Jantes forgées", "Selle exclusive", "Badge numéroté"]
    },
    {
      id: 506,
      name: "TMAX 560 TECH MAX",
      category: "Scooter",
      description: "Le summum du confort et de la technologie. Équipé de série de tout ce qu'un pilote exigeant peut attendre d'un maxi-scooter.",
      price: "165 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/XP500A/2025-Yamaha-XP500A-EU-Icon_Black_-Studio-001-03.jpg",
      specs: {
        engine: "Bicylindre parallèle, 560 cm³",
        power: "47,6 ch (35,0 kW) @ 7 500 tr/min",
        weight: "220 kg",
        tank: "15 litres"
      },
      features: ["Selle et poignées chauffantes", "Pare-brise électrique", "Écran TFT 7 pouces", "Régulateur de vitesse"]
    },
    {
      id: 502,
      name: "TMAX 560",
      category: "Scooter",
      description: "L'icône du design MAX. Un style agressif, une agilité redoutable et une motorisation puissante pour dominer la ville.",
      price: "145 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500A/2026-Yamaha-XP500A-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "Bicylindre parallèle, 560 cm³",
        power: "47,6 ch (35,0 kW) @ 7 500 tr/min",
        weight: "218 kg",
        tank: "15 litres"
      },
      features: ["Moteur EURO5 de 560 cm³", "Allumage Smart Key", "Contrôle de traction", "Grand coffre sous la selle"]
    },
    {
      id: 503,
      name: "XMAX 300",
      category: "Scooter",
      description: "L'équilibre parfait. Pratique au quotidien et performant pour les escapades du week-end, l'XMAX est la référence du segment.",
      price: "85 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/XMAX300A/2025-Yamaha-XMAX300A-EU-Icon_Black_-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "Monocylindre Blue Core, 292 cm³",
        power: "28 ch (20,6 kW) @ 7 250 tr/min",
        weight: "183 kg",
        tank: "13 litres"
      },
      features: ["Fourche de type moto", "Nouveau phare en X", "Connectivité smartphone", "ABS et contrôle de traction"]
    },
    {
      id: 504,
      name: "NMAX 155 TECH",
      category: "Scooter",
      description: "L'élégance urbaine ultime. L'édition TECH offre des finitions exclusives Ceramic Grey et une connectivité avancée pour les citadins exigeants.",
      price: "52 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/G125YMSV/2025-Yamaha-G125YMSV-EU-Ceramic_Grey-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "4 temps, monocylindre Blue Core",
        power: "15 ch (11,1 kW) @ 8 000 tr/min",
        weight: "131 kg",
        tank: "7,1 litres"
      },
      features: ["Unité de contrôle CCU", "Système Start & Stop", "ABS de série", "Éclairage LED premium"]
    },
    {
      id: 505,
      name: "NMAX 125",
      category: "Scooter",
      description: "L'urbain par excellence. Économique, agile et doté d'un équipement moderne pour faciliter chacun de vos déplacements.",
      price: "42 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/G125YM/2026-Yamaha-G125YM-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "125 cm³, monocylindre Blue Core",
        power: "12,2 ch (9,0 kW) @ 8 000 tr/min",
        weight: "131 kg",
        tank: "7,1 litres"
      },
      features: ["Moteur EURO5 125 cm³", "Rangement pour un casque intégral", "Connectivité Bluetooth", "Freins à disque avant/arrière"]
    }
  ];

  const handleNav = (bike) => {
    navigate(`/moto/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="scooters-page">
      <div className="scooters-red-bar"></div>

      <section className="scooters-hero-banner">
        <img src={heroImg} alt="Yamaha Scooters" className="scooters-banner-img" />
        <div className="scooters-banner-overlay">
          <h1 className="scooters-banner-title">SCOOTERS</h1>
          <p className="scooters-banner-subtitle">NOTHING BUT THE MAX.</p>
        </div>
      </section>

      <section className="scooters-content-section">
        <h2 className="scooters-section-title">GAMME URBAN MOBILITY</h2>
        
        {/* SECTION SPORT SCOOTERS */}
        <div className="sc-category-divider">
          <span>SPORT SCOOTERS - HIGH PERFORMANCE</span>
          <div className="sc-divider-line"></div>
        </div>
        <div className="scooters-grid">
          {scooterBikes.filter(b => b.name.includes("TMAX")).map((bike) => (
            <div key={bike.id} className="sc-bike-card" onClick={() => handleNav(bike)}>
              <div className="sc-card-image-box">
                <div className="sc-badge">NEW 2026</div>
                <img src={bike.image} alt={bike.name} className="sc-bike-image" />
                <div className="sc-hover-overlay">
                  <button className="sc-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>VOIR DÉTAILS</button>
                </div>
              </div>

              <div className="sc-card-content">
                <p className="sc-bike-category">{bike.category}</p>
                <div className="sc-brand-container">
                    <p className="sc-bike-brand">YAMAHA</p>
                    <h3 className="sc-bike-name">{bike.name}</h3>
                </div>
                <p className="sc-bike-desc">{bike.description}</p>
                
                <div className="sc-card-footer">
                  <span className="sc-bike-price">{bike.price}</span>
                  <button className="sc-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION URBAN MOBILITY */}
        <div className="sc-category-divider" style={{ marginTop: '80px' }}>
          <span>URBAN MOBILITY - XMAX & NMAX</span>
          <div className="sc-divider-line"></div>
        </div>
        <div className="scooters-grid">
          {scooterBikes.filter(b => !b.name.includes("TMAX")).map((bike) => (
            <div key={bike.id} className="sc-bike-card" onClick={() => handleNav(bike)}>
              <div className="sc-card-image-box">
                <div className="sc-badge">NEW 2026</div>
                <img src={bike.image} alt={bike.name} className="sc-bike-image" />
                <div className="sc-hover-overlay">
                  <button className="sc-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>VOIR DÉTAILS</button>
                </div>
              </div>

              <div className="sc-card-content">
                <p className="sc-bike-category">{bike.category}</p>
                <div className="sc-brand-container">
                    <p className="sc-bike-brand">YAMAHA</p>
                    <h3 className="sc-bike-name">{bike.name}</h3>
                </div>
                <p className="sc-bike-desc">{bike.description}</p>
                
                <div className="sc-card-footer">
                  <span className="sc-bike-price">{bike.price}</span>
                  <button className="sc-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Scooters;
