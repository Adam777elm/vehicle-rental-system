import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Roadster.css";
import heroImg from "../assets/MOTO_IMG/roadster-hero.jpg";
import imgMT07 from "../assets/ROADSTER-IMG/2025-Yamaha-MT07AS-EU-Tech_Black-360-Degrees-001-03.jpg";
import imgMT09 from "../assets/ROADSTER-IMG/2025-Yamaha-MT09A-35-EU-Tech_Black-Studio-001-03-1.jpg";

function Roadster() {
  const navigate = useNavigate();

  const roadsterBikes = [
    {
      id: 201,
      name: "MT-10 SP",
      category: "Roadster",
      description: "Le summum de l'Hyper Naked. Suspensions semi-actives Öhlins de 2ème génération et coloris exclusif Icon Performance.",
      price: "195 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.ivors.ie/wp-content/uploads/2016/12/2017_yam_mt10dx_eu_bwm2_stu_001_03.jpg",
      specs: {
        engine: "4 cylindres crossplane, 998 cm³",
        power: "165,9 ch (122,0 kW) @ 11 500 tr/min",
        weight: "214 kg",
        tank: "17 litres"
      },
      features: ["Suspension Öhlins Gen 2", "Sabot moteur 3 pièces", "Durites de frein tressées", "Coloris Icon Performance"]
    },
    {
      id: 202,
      name: "MT-10",
      category: "Roadster",
      description: "Puissance Master of Torque. Le moteur CP4 issu de la R1 délivre un couple époustouflant pour des sensations de pilotage pures.",
      price: "175 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamaha-motor.com.au/-/media/products/motorcycle/road/maximum-torque/2025/mt10as/product-category-page/2025_mt10_mlnm4_aus_stu_001_750x600.ashx",
      specs: {
        engine: "4 cylindres crossplane, 998 cm³",
        power: "165,9 ch (122,0 kW) @ 11 500 tr/min",
        weight: "212 kg",
        tank: "17 litres"
      },
      features: ["Moteur CP4 de 998 cm³", "Shifter QSS de série", "Écran TFT 4,2 pouces", "Limiteur de vitesse variable (YVSL)"]
    },
    {
      id: 203,
      name: "MT-09 SP",
      category: "Roadster",
      description: "L'instinct de défi poussé à l'extrême. Équipée de suspensions premium et d'un mode de pilotage dédié au circuit.",
      price: "135 000 DH",
      type: "vente",
      availability: true,
      image: "https://danfay.ie/cdn/shop/files/2024-Yamaha-MT09DX-EU-Icon_Performance-360-Degrees-001-03.jpg?v=1706098490&width=1946",
      specs: {
        engine: "CP3, 890 cm³, 3 cylindres",
        power: "119 ch (87,5 kW) @ 10 000 tr/min",
        weight: "190 kg",
        tank: "14 litres"
      },
      features: ["Amortisseur arrière Öhlins", "Modes de pilotage TRACK", "Finition Bras oscillant en alu brossé", "Système Smart Key"]
    },
    {
      id: 204,
      name: "MT-09",
      category: "Roadster",
      description: "The Dark Side of Japan. Plus légère, plus puissante et dotée d'une technologie d'aide au pilotage de pointe.",
      price: "115 000 DH",
      type: "vente",
      availability: true,
      image: imgMT09,
      specs: {
        engine: "CP3, 890 cm³, 3 cylindres",
        power: "119 ch (87,5 kW) @ 10 000 tr/min",
        weight: "189 kg",
        tank: "14 litres"
      },
      features: ["Nouveau carénage compact", "IMU à 6 axes", "Écran TFT 5 pouces", "Positions de pilotage réglables"]
    },
    {
      id: 205,
      name: "MT-07",
      category: "Roadster",
      description: "L'attraction pure. Un design agressif et un moteur CP2 au couple généreux qui en font la moto la plus vendue de sa catégorie.",
      price: "85 000 DH",
      type: "vente",
      availability: true,
      image: imgMT07,
      specs: {
        engine: "CP2, 689 cm³, 2 cylindres",
        power: "73,4 ch (54,0 kW) @ 8 750 tr/min",
        weight: "184 kg",
        tank: "14 litres"
      },
      features: ["Moteur CP2 coupleux", "Écran TFT avec connectivité", "Disques avant de 298 mm", "Éclairage intégral à LED"]
    },
    {
      id: 206,
      name: "MT-125",
      category: "Roadster",
      description: "Le côté obscur du Japon. Dotée d'un moteur de 125 cm³ haute technologie et d'un habillage de masse projeté vers l'avant, elle est la reine des 125.",
      price: "52 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/MT125A/2026-Yamaha-MT125A-EU-Tech_Black-Studio-001-03.jpg",
      specs: {
        engine: "Monocylindre, 125 cm³",
        power: "15 ch (11,0 kW) @ 10 000 tr/min",
        weight: "142 kg",
        tank: "10 litres"
      },
      features: ["Moteur 125 cm³ avec VVA", "Embrayage antidribble", "Écran TFT avec connectivité", "Style Hyper Naked agressif"]
    }
  ];

  const handleNav = (bike) => {
    navigate(`/moto/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="roadster-page">
      <div className="roadster-red-bar"></div>

      <section className="roadster-hero-banner">
        <img src={heroImg} alt="Yamaha Roadster" className="roadster-banner-img" />
        <div className="roadster-banner-overlay">
          <h1 className="roadster-banner-title">Roadster</h1>
          <p className="roadster-banner-subtitle">Dominez l'obscurité.</p>
        </div>
      </section>

      <section className="roadster-content-section">
        <h2 className="roadster-section-title">GAMME HYPER NAKED</h2>
        
        {/* SECTION 1000cc */}
        <div className="rd-category-divider">
          <span>MAXIMUM TORQUE - 1000cc</span>
          <div className="rd-divider-line"></div>
        </div>
        <div className="roadster-grid">
          {roadsterBikes.filter(b => b.name.includes("MT-10")).map((bike) => (
            <div key={bike.id} className="rd-bike-card" onClick={() => handleNav(bike)}>
              <div className="rd-card-image-box">
                <div className="rd-badge">NEW 2026</div>
                <img src={bike.image} alt={bike.name} className="rd-bike-image" />
                <div className="rd-hover-overlay">
                  <button className="rd-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>PARAMÈTRES</button>
                </div>
              </div>

              <div className="rd-card-content">
                <p className="rd-bike-category">{bike.category}</p>
                <div className="rd-brand-container">
                    <p className="rd-bike-brand">YAMAHA</p>
                    <h3 className="rd-bike-name">{bike.name}</h3>
                </div>
                <p className="rd-bike-desc">{bike.description}</p>
                
                <div className="rd-card-footer">
                  <span className="rd-bike-price">{bike.price}</span>
                  <button className="rd-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 900cc */}
        <div className="rd-category-divider" style={{ marginTop: '80px' }}>
          <span>TRIPLE POWER - 900cc</span>
          <div className="rd-divider-line"></div>
        </div>
        <div className="roadster-grid">
          {roadsterBikes.filter(b => b.name.includes("MT-09")).map((bike) => (
            <div key={bike.id} className="rd-bike-card" onClick={() => handleNav(bike)}>
              <div className="rd-card-image-box">
                <div className="rd-badge">NEW 2026</div>
                <img src={bike.image} alt={bike.name} className="rd-bike-image" />
                <div className="rd-hover-overlay">
                  <button className="rd-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>PARAMÈTRES</button>
                </div>
              </div>

              <div className="rd-card-content">
                <p className="rd-bike-category">{bike.category}</p>
                <div className="rd-brand-container">
                    <p className="rd-bike-brand">YAMAHA</p>
                    <h3 className="rd-bike-name">{bike.name}</h3>
                </div>
                <p className="rd-bike-desc">{bike.description}</p>
                
                <div className="rd-card-footer">
                  <span className="rd-bike-price">{bike.price}</span>
                  <button className="rd-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 700cc & Entry */}
        <div className="rd-category-divider" style={{ marginTop: '80px' }}>
          <span>ACCESSIBLE PERFORMANCE - 700cc & 125cc</span>
          <div className="rd-divider-line"></div>
        </div>
        <div className="roadster-grid">
          {roadsterBikes.filter(b => !b.name.includes("MT-10") && !b.name.includes("MT-09")).map((bike) => (
            <div key={bike.id} className="rd-bike-card" onClick={() => handleNav(bike)}>
              <div className="rd-card-image-box">
                <div className="rd-badge">NEW 2026</div>
                <img src={bike.image} alt={bike.name} className="rd-bike-image" />
                <div className="rd-hover-overlay">
                  <button className="rd-action-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>PARAMÈTRES</button>
                </div>
              </div>

              <div className="rd-card-content">
                <p className="rd-bike-category">{bike.category}</p>
                <div className="rd-brand-container">
                    <p className="rd-bike-brand">YAMAHA</p>
                    <h3 className="rd-bike-name">{bike.name}</h3>
                </div>
                <p className="rd-bike-desc">{bike.description}</p>
                
                <div className="rd-card-footer">
                  <span className="rd-bike-price">{bike.price}</span>
                  <button className="rd-buy-btn" onClick={(e) => { e.stopPropagation(); handleNav(bike); }}>ACHETER</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Roadster;
