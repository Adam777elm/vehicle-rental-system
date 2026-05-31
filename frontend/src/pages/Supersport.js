import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Supersport.css";
import heroImg from "../assets/MOTO_IMG/supersport-hero.jpg";

function Supersport() {
  const navigate = useNavigate();

  const supersportBikes = [
    {
      id: 101,
      name: "R1M",
      category: "Supersport",
      description: "La machine de piste ultime. Suspension électronique Öhlins, carénage en carbone et technologie issue du MotoGP pour des performances extrêmes.",
      price: "285 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1SPL/2024-Yamaha-YZF1000R1SPL-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "4 cylindres crossplane, 998 cm³",
        power: "200 ch (147,1 kW) @ 13 500 tr/min",
        weight: "202 kg",
        tank: "17 litres"
      },
      features: ["Suspension ERS Öhlins", "Carénage en fibre de carbone", "Boîtier CCU avec antenne GPS", "Pneus Bridgestone Battlax RS11"]
    },
    {
      id: 102,
      name: "R1",
      category: "Supersport",
      description: "Conçue sans compromis. Le moteur crossplane de 1000 cm³ et le châssis ultra-léger offrent une agilité et une puissance de référence sur circuit.",
      price: "215 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1/2024-Yamaha-YZF1000R1-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "4 cylindres crossplane, 998 cm³",
        power: "200 ch (147,1 kW) @ 13 500 tr/min",
        weight: "201 kg",
        tank: "17 litres"
      },
      features: ["Moteur crossplane CP4", "Système de contrôle du frein moteur (EBM)", "Freinage ABS en virage", "Tableau de bord TFT couleur"]
    },
    {
      id: 103,
      name: "R9",
      category: "Supersport",
      description: "Une nouvelle ère de performance. Le moteur CP3 à couple élevé rencontre un châssis supersport rigide pour une polyvalence et une nervosité inédites.",
      price: "155 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/YZF900R9/2026-Yamaha-YZF900R9-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "CP3, 890 cm³, 3 cylindres",
        power: "119 ch (87,5 kW) @ 10 000 tr/min",
        weight: "195 kg",
        tank: "14 litres"
      },
      features: ["Moteur CP3 coupleux", "Ailerons aérodynamiques", "Shifter 3ème génération", "Modes de conduite ajustables"]
    },
    {
      id: 104,
      name: "R7",
      category: "Supersport",
      description: "Finesse et agilité. La R7 offre un équilibre parfait entre puissance accessible et comportement sportif, idéale pour la route et les sessions de piste.",
      price: "105 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF700R7/2024-Yamaha-YZF700R7-EU-Icon_Blue-Studio-001-03.jpg",
      specs: {
        engine: "CP2, 689 cm³, 2 cylindres",
        power: "73,4 ch (54,0 kW) @ 8 750 tr/min",
        weight: "188 kg",
        tank: "13 litres"
      },
      features: ["Moteur CP2 réactif", "Carénage le plus fin de la gamme", "Embrayage anti-dribble (A&S)", "Position de conduite sportive"]
    }
  ];

  const handleNav = (bike) => {
    navigate(`/moto/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="supersport-page">
      <div className="supersport-red-bar"></div>

      <section className="supersport-hero-banner">
        <img src={heroImg} alt="Yamaha Supersport" className="supersport-banner-img" />
        <div className="supersport-banner-overlay">
          <h1 className="supersport-banner-title">Supersport</h1>
          <p className="supersport-banner-subtitle">Inspirée par la course, conçue pour vous.</p>
        </div>
      </section>

      <section className="supersport-content-section">
        <h2 className="supersport-section-title">GAMME R-WORLD</h2>
        
        {/* SECTION R1 SERIES */}
        <div className="ss-category-divider">
          <span>THE R-SERIES KINGS - 1000cc</span>
          <div className="ss-divider-line"></div>
        </div>
        <div className="supersport-grid">
          {supersportBikes.filter(b => b.name.includes("R1")).map((bike) => (
            <div key={bike.id} className="ss-bike-card" onClick={() => handleNav(bike)}>
              <div className="ss-card-image-box">
                <div className="ss-badge">SÉRIE R</div>
                <img src={bike.image} alt={bike.name} className="ss-bike-image" />
                <div className="ss-hover-overlay">
                  <button className="ss-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>VOIR LES DÉTAILS</button>
                </div>
              </div>

              <div className="ss-card-content">
                <p className="ss-bike-category">{bike.category}</p>
                <div className="ss-brand-container">
                  <p className="ss-bike-brand">YAMAHA</p>
                  <h3 className="ss-bike-name">{bike.name}</h3>
                </div>
                <p className="ss-bike-desc">{bike.description}</p>
                
                <div className="ss-card-footer">
                  <span className="ss-bike-price">{bike.price}</span>
                  <button className="ss-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION R9 & R7 */}
        <div className="ss-category-divider" style={{ marginTop: '80px' }}>
          <span>THE NEXT GENERATION - R9 & R7</span>
          <div className="ss-divider-line"></div>
        </div>
        <div className="supersport-grid">
          {supersportBikes.filter(b => !b.name.includes("R1")).map((bike) => (
            <div key={bike.id} className="ss-bike-card" onClick={() => handleNav(bike)}>
              <div className="ss-card-image-box">
                <div className="ss-badge">SÉRIE R</div>
                <img src={bike.image} alt={bike.name} className="ss-bike-image" />
                <div className="ss-hover-overlay">
                  <button className="ss-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>VOIR LES DÉTAILS</button>
                </div>
              </div>

              <div className="ss-card-content">
                <p className="ss-bike-category">{bike.category}</p>
                <div className="ss-brand-container">
                  <p className="ss-bike-brand">YAMAHA</p>
                  <h3 className="ss-bike-name">{bike.name}</h3>
                </div>
                <p className="ss-bike-desc">{bike.description}</p>
                
                <div className="ss-card-footer">
                  <span className="ss-bike-price">{bike.price}</span>
                  <button className="ss-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Supersport;
