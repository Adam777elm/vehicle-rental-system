import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MarineCategories.css";
import heroImg from "../assets/MARINE_IMG/marine-hero.jpg";

function Waverunner() {
  const navigate = useNavigate();

  const waverunners = [
    {
      id: 301,
      name: "FX Cruiser SVHO",
      category: "Marine",
      description: "La puissance pure et le luxe ultime réunis. Moteur suralimenté SVHO de 1,8 litre, selle Cruiser à trois places et écran tactile Connext 7 pouces pour une aventure marine de première classe.",
      price: "295 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamaha-motor.com.au/-/media/products/marine/waverunner/luxury/2024/fx-cruiser-svho/2024_fx_cruiser_svho_cyan_stu_001.ashx",
      specs: {
        engine: "4 cylindres, suralimenté SVHO, 1 812 cm³",
        power: "250 ch",
        weight: "397 kg",
        tank: "70 litres"
      },
      features: ["Moteur SVHO suralimenté", "Écran tactile Connext 7 pouces", "Système RiDE (marche arrière)", "Selle Cruiser 3 places ergonomique"]
    },
    {
      id: 302,
      name: "GP1800R SVHO",
      category: "Marine",
      description: "Inspiré de la compétition, conçu pour les champions. Un ratio poids/puissance imbattable et une maniabilité chirurgicale pour dominer la mer.",
      price: "265 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamaha-motor.com.au/-/media/products/marine/waverunner/performance/2023/gp1800r-svho/2023_gp1800r_svho_blue_stu_001.ashx",
      specs: {
        engine: "4 cylindres, suralimenté SVHO, 1 812 cm³",
        power: "250 ch",
        weight: "350 kg",
        tank: "70 litres"
      },
      features: ["Coque NanoXcel2 ultra-légère", "Moteur SVHO hautes performances", "Grille d'admission de course", "Système de trim automatique"]
    },
    {
      id: 303,
      name: "VX Cruiser",
      category: "Marine",
      description: "Le WaveRunner le plus polyvalent de sa génération. Le confort d'un grand Cruiser combiné à la vivacité d'un jet sportif pour de longues heures d'exploration.",
      price: "195 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamaha-motor.com.au/-/media/products/marine/waverunner/recreation/2024/vx-cruiser/2024_vx_cruiser_blue_stu_001.ashx",
      specs: {
        engine: "3 cylindres TR-1 High Output, 1 049 cm³",
        power: "115 ch",
        weight: "316 kg",
        tank: "70 litres"
      },
      features: ["Moteur TR-1 High Output", "Système RiDE intuitif", "Écran couleur de 4,3 pouces", "Système audio Bluetooth intégré"]
    },
    {
      id: 304,
      name: "EX Deluxe",
      category: "Marine",
      description: "Idéal pour débuter l'aventure marine en famille. Agile, économique, extrêmement amusant et conçu avec la légendaire fiabilité de Yamaha.",
      price: "135 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamaha-motor.com.au/-/media/products/marine/waverunner/rec-lite/2024/ex-deluxe/2024_ex_deluxe_blue_stu_001.ashx",
      specs: {
        engine: "3 cylindres TR-1, 1 049 cm³",
        power: "100 ch",
        weight: "272 kg",
        tank: "50 litres"
      },
      features: ["Moteur TR-1 Yamaha", "Coque robuste en SMC", "Système RiDE de marche arrière", "Indicateurs LED multifonctions"]
    }
  ];

  const handleNav = (bike) => {
    navigate(`/moto/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="marine-cat-page">
      <div className="marine-cat-red-bar"></div>

      <section className="marine-cat-hero-banner">
        <img src={heroImg} alt="Yamaha WaveRunner" className="marine-cat-banner-img" />
        <div className="marine-cat-banner-overlay">
          <h1 className="marine-cat-banner-title">WAVERUNNER</h1>
          <p className="marine-cat-banner-subtitle">Feel the Water</p>
        </div>
      </section>

      <section className="marine-cat-content-section">
        <h2 className="marine-cat-section-title">GAMME WAVERUNNER</h2>
        <div className="marine-cat-separator"></div>

        <div className="marine-cat-grid">
          {waverunners.map((bike) => (
            <div key={bike.id} className="marine-cat-card" onClick={() => handleNav(bike)}>
              <div className="marine-cat-card-image-box">
                <div className="marine-cat-badge">JET SKI</div>
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

export default Waverunner;
