import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/SportTouring.css";

// Assets
import heroImg from "../assets/MOTO_IMG/sporttouring-hero.jpg";
import imgTracer9GTPlus from "../assets/SPORTTOUR-IMG/2025-Yamaha-MT09ATRDXCS-EU-Cobalt_Blue-360-Degrees-001-03.jpg";
import imgTracer7GT from "../assets/SPORTTOUR-IMG/2026-Yamaha-MT07TRGTS-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg";
import imgTracer7 from "../assets/SPORTTOUR-IMG/2026-Yamaha-MT07TRS-EU-Redline-360-Degrees-001-03_Mobile.jpg";
function SportTouring() {
  const navigate = useNavigate();
  const tracer9Bikes = [
    {
      id: 1,
      name: "TRACER 9 GT+",
      category: "Sport Touring",
      description: "Le nec plus ultra du Sport Touring. Régulateur de vitesse adaptatif, freinage unifié, suspension semi-active et tableau de bord TFT connecté.",
      price: "169 000 DH",
      type: "vente",
      availability: true,
      image: imgTracer9GTPlus,
      specs: {
        engine: "CP3, 890 cm³, 3 cylindres",
        power: "119 ch (87,5 kW) @ 10 000 tr/min",
        weight: "223 kg",
        tank: "19 litres"
      },
      features: ["Radar à ondes millimétriques", "Régulateur de vitesse adaptatif (ACC)", "Écran TFT 7 pouces couleur", "Suspension semi-active KYB"]
    },
    {
      id: 5,
      name: "TRACER 9 GT",
      category: "Sport Touring",
      description: "La voyageuse sportive ultime. Équipée d'une suspension semi-active KYB, de phares directionnels à LED et de valises rigides aérodynamiques.",
      price: "155 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATRDXS/2025-Yamaha-MT09ATRDXS-EU-Ceramic_Ice-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "CP3, 890 cm³, 3 cylindres",
        power: "119 ch (87,5 kW) @ 10 000 tr/min",
        weight: "220 kg",
        tank: "19 litres"
      },
      features: ["Valises rigides de série", "Phares directionnels LED", "Poignées chauffantes", "Système de changement de vitesse rapide (QSS)"]
    },
    {
      id: 2,
      name: "TRACER 9",
      category: "Sport Touring",
      description: "L'accent est mis sur la création d'une moto qui s'adapte au pilote et qui excelle dans tous les domaines, vous offrant ainsi la liberté de choisir votre propre aventure.",
      price: "135 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATR/2025-Yamaha-MT09ATR-EU-Redline-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "CP3, 890 cm³, 3 cylindres",
        power: "119 ch (87,5 kW) @ 10 000 tr/min",
        weight: "213 kg",
        tank: "19 litres"
      },
      features: ["Moteur CP3 EU5 de 890 cm³", "Cadre léger en aluminium coulé sous pression", "IMU à 6 axes", "Éclairage intégral à LED"]
    }
  ];

  const tracer7Bikes = [
    {
      id: 3,
      name: "TRACER 7 GT",
      category: "Sport Touring",
      description: "Prête pour toutes les aventures. Valises latérales, bulle haute touring, et selle confort pour affronter la route avec style (Icon Performance).",
      price: "105 000 DH",
      type: "vente",
      availability: true,
      image: imgTracer7GT,
      specs: {
        engine: "CP2, 689 cm³, 2 cylindres",
        power: "73,4 ch (54,0 kW) @ 8 750 tr/min",
        weight: "196 kg",
        tank: "17 litres"
      },
      features: ["Selle confort spéciale", "Bulle haute de touring", "Valises latérales de 20 litres", "Écran TFT 5 pouces avec connectivité"]
    },
    {
      id: 4,
      name: "TRACER 7",
      category: "Sport Touring",
      description: "Agile, exaltante et accessible. Un bicylindre CP2 joueur dans un châssis léger pour des sensations maximales sur route sinueuse.",
      price: "95 000 DH",
      type: "vente",
      availability: true,
      image: imgTracer7,
      specs: {
        engine: "CP2, 689 cm³, 2 cylindres",
        power: "73,4 ch (54,0 kW) @ 8 750 tr/min",
        weight: "196 kg",
        tank: "17 litres"
      },
      features: ["Duo de projecteurs LED agressifs", "Moteur CP2 à couple élevé", "Le plus léger de sa catégorie", "Suspensions avant et arrière réglables"]
    }
  ];

  // Helper function to render a bike card
  const renderBike = (bike) => {
    const handleNav = (e) => {
      e.stopPropagation();
      navigate(`/moto/${bike.id}`, { state: { bike } });
    };

    return (
      <div key={bike.id} className="st-bike-card" onClick={handleNav} style={{ cursor: "pointer" }}>
        <div className="st-card-image-box">
          <div className={`st-badge ${bike.type === 'vente' ? 'badge-sale' : 'badge-rent'}`}>
            {bike.type === 'vente' ? 'À VENDRE' : 'LOCATION'}
          </div>
          <img src={bike.image} alt={bike.name} className="st-bike-image" />
          <div className="st-hover-overlay">
            <button className="st-action-btn" onClick={handleNav}>Voir les détails</button>
          </div>
        </div>

        <div className="st-card-content">
          <p className="st-bike-category">{bike.category}</p>
          <h3 className="st-bike-name">{bike.name}</h3>
          <p className="st-bike-desc">{bike.description}</p>

          <div className="st-card-footer">
            <span className="st-bike-price">{bike.price}</span>
            <button className="st-reserve-btn" onClick={handleNav}>
              {bike.type === 'vente' ? 'Acheter' : 'Réserver'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="st-page">
      <div className="st-red-bar"></div>

      <section className="st-hero-banner">
        <img src={heroImg} alt="Yamaha Sport Touring" className="st-banner-img" />
        <div className="st-banner-overlay">
          <span className="st-hero-subtitle">LES ROUTES VOUS ATTENDENT</span>
          <h1 className="st-banner-title">SPORT TOURING</h1>
          <p className="st-hero-desc">Alliez la performance sportive à un confort haut de gamme pour les voyages au long cours.</p>
        </div>
      </section>

      <section className="st-content-section">
        {/* TRACER 9 SECTION */}
        <div className="st-section-header">
          <h2 className="st-section-title">GAMME TRACER 9</h2>
          <div className="st-separator"></div>
        </div>
        <div className="st-bikes-grid">
          {tracer9Bikes.map(renderBike)}
        </div>

        {/* TRACER 7 SECTION (Separation) */}
        <div className="st-section-header" style={{ marginTop: '100px' }}>
          <h2 className="st-section-title">GAMME TRACER 7</h2>
          <div className="st-separator"></div>
        </div>
        <div className="st-bikes-grid">
          {tracer7Bikes.map(renderBike)}
        </div>
      </section>
    </div>
  );
}

export default SportTouring;
