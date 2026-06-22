import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MarineCategories.css";
import heroImg from "../assets/MARINE_IMG/marine-hero.jpg";
import VehicleCard from "../components/VehicleCard";

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
      name: "VX Cruiser HO",
      category: "Marine",
      description: "Le WaveRunner High Output par excellence. Moteur TR-1 HO pour une puissance supérieure, confort trois places et technologie RiDE pour une maîtrise totale sur l'eau — disponible en Ocean Blue exclusif.",
      price: "215 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/VXCRUISERHO/2025-Yamaha-VXCRUISERHO-EU-Dusty_Blue-Studio-001-03-1.jpg",
      specs: {
        engine: "3 cylindres TR-1 High Output, 1 049 cm³",
        power: "130 ch",
        weight: "320 kg",
        tank: "70 litres"
      },
      features: ["Moteur TR-1 High Output", "Système RiDE intuitif", "Écran couleur de 4,3 pouces", "Système audio Bluetooth intégré"]
    },
    {
      id: 304,
      name: "VX DeLuxe",
      category: "Marine",
      description: "L'élégance et le raffinement au service de la performance. Le VX DeLuxe allie une finition haut de gamme à la fiabilité légendaire Yamaha, disponible en 2 coloris exclusifs.",
      price: "175 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/VXDELUXE/2026-Yamaha-VXDELUXE-EU-Black___Torch_Red-Studio-001-03.jpg",
      specs: {
        engine: "3 cylindres TR-1, 1 049 cm³",
        power: "100 ch",
        weight: "298 kg",
        tank: "70 litres"
      },
      features: ["Finition DeLuxe premium", "Système RiDE", "Selle biplace confort", "Écran couleur 4,3\""]
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
            <VehicleCard key={bike.id} bike={bike} badge="JET SKI" onNav={handleNav} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Waverunner;
