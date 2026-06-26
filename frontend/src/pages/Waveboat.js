import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MarineCategories.css";
import heroImg from "../assets/MARINE_IMG/marine-waveboat.jpg";
import VehicleCard from "../components/VehicleCard";

function Waveboat() {
  const navigate = useNavigate();

  const waveboats = [
    {
      id: 321,
      name: "Yamaha 195S",
      brand: "YAMAHA",
      category: "Marine",
      description: "Style sportif et performances dynamiques. La Yamaha 195S en couleur Iconic Bleue offre une maniabilité hors pair et un confort optimal pour des journées inoubliables sur l'eau.",
      price: "390 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamahaboats.com/globalassets/media/my26/boats/19ft/boat-profile-images/195s_profile_hero.png",
      specs: {
        engine: "Moteur TR-1 High Output",
        power: "180 CV",
        weight: "1135 kg",
        tank: "114 L"
      },
      features: ["Capacité de 8 personnes", "Couleur Iconic Bleue exclusive", "Cockpit ergonomique et spacieux", "Plateforme de bain avec sellerie marine"]
    },
    {
      id: 322,
      name: "Yamaha 222SE",
      brand: "YAMAHA",
      category: "Marine",
      description: "Le juste équilibre entre taille, confort et polyvalence. La Yamaha 222SE en robe Bleu et Gris propose des technologies de pointe et un double moteur performant.",
      price: "520 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamahaboats.com/globalassets/media/my26/boats/22ft/boat-profile-images/222se_profile-b.png",
      specs: {
        engine: "Double moteur TR-1 High Output",
        power: "2 x 115 CV",
        weight: "1550 kg",
        tank: "189 L"
      },
      features: ["Capacité de 10 personnes", "Coloris Bleu & Gris élégant", "Écran tactile Connext", "Double moteur pour plus de maniabilité"]
    },
    {
      id: 323,
      name: "Yamaha 252S",
      brand: "YAMAHA",
      category: "Marine",
      description: "L'élégance et la puissance sans compromis. La Yamaha 252S en couleur Gris offre un espace exceptionnel et des performances impressionnantes pour toute la famille.",
      price: "680 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamahaboats.com/globalassets/media/my26/boats/25ft/boat-profile-images/252s_profile.png",
      specs: {
        engine: "Double moteur 1.9L High Output",
        power: "2 x 200 CV",
        weight: "1900 kg",
        tank: "265 L"
      },
      features: ["Capacité de 12 personnes", "Coloris Gris premium", "Grand salon arrière convertible", "Bimini top et finitions de luxe"]
    },
    {
      id: 324,
      name: "Yamaha 257SD",
      brand: "YAMAHA",
      category: "Marine",
      description: "Le summum de l'innovation et du luxe. La Yamaha 257SD en Noir et Blanc intègre la technologie exclusive DRiVE pour une précision de manœuvre inégalée.",
      price: "890 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamahaboats.com/globalassets/media/my26/boats/27ft/boat-profile-images/275sdx_profile_hero.png",
      specs: {
        engine: "Double moteur SVHO suralimenté 1.8L",
        power: "2 x 250 CV",
        weight: "2300 kg",
        tank: "340 L"
      },
      features: ["Capacité de 12 personnes", "Coloris Noir & Blanc contrasté", "Technologie exclusive DRiVE", "Toit rigide premium avec éclairage LED"]
    }
  ];

  const handleNav = (bike) => {
    navigate(`/moto/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="marine-cat-page">
      <div className="marine-cat-red-bar"></div>

      <section className="marine-cat-hero-banner">
        <img src={heroImg} alt="Yamaha Jet Boats" className="marine-cat-banner-img" />
        <div className="marine-cat-banner-overlay">
          <h1 className="marine-cat-banner-title">YAMAHA BOATS</h1>
          <p className="marine-cat-banner-subtitle">The Jet-Boat Revolution</p>
        </div>
      </section>

      <section className="marine-cat-content-section">
        <h2 className="marine-cat-section-title">GAMME YAMAHA JET BOATS</h2>
        <div className="marine-cat-separator"></div>

        <div className="marine-cat-grid">
          {waveboats.map((bike) => (
            <VehicleCard key={bike.id} bike={bike} badge="YAMAHA BOAT" onNav={handleNav} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Waveboat;
