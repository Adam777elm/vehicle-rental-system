import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/OffRoad.css";

// Assets
import heroImg from "../assets/MOTO_IMG/offroad-hero.jpg";
import tenereRally from "../assets/OFFROAD-IMG/téléchargement (1).jpg";
import mx1 from "../assets/OFFROAD-IMG/téléchargement (2).jpg";
import mx2 from "../assets/OFFROAD-IMG/téléchargement (3).jpg";
import mx3 from "../assets/OFFROAD-IMG/téléchargement (4).jpg";
import mx4 from "../assets/OFFROAD-IMG/téléchargement (5).jpg";
import mx5 from "../assets/OFFROAD-IMG/téléchargement (6).jpg";
import motoCrossBanner from "../assets/OFFROAD-IMG/motocross-banner.png";

const tenere700 = "data:image/jpeg;base64,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";

function OffRoad() {
  const navigate = useNavigate();

  const adventureBikes = [
    {
      id: 201,
      name: "Ténéré 700 World Raid",
      category: "Adventure",
      description: "Le trail extrême de Yamaha. Réservoirs de carburant de 23 litres, suspension KYB haut de gamme et tableau de bord TFT de 5 pouces.",
      price: "129 000 DH",
      type: "vente",
      availability: true,
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/XTZ700D/2024-Yamaha-XTZ700D-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
      specs: {
        engine: "CP2, 689 cm³, 2 cylindres",
        power: "73,4 ch (54,0 kW) @ 9 000 tr/min",
        weight: "220 kg",
        tank: "23 litres"
      },
      features: ["Deux réservoirs de 23 litres", "Fourche KYB de 43 mm (débattement 230 mm)", "Amortisseur de direction Öhlins", "ABS à 3 modes réglables"]
    },
    {
      id: 202,
      name: "Ténéré Rally",
      category: "Adventure",
      description: "Dotée d'une technologie de rallye comprenant une fourche avant KYB à grand débattement entièrement réglable, un garde-boue haut, et le coloris Speed block emblématique.",
      price: "129 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2024/04/2025-Yamaha-XTZ700SPR-EU-Sky_Blue-360-Degrees-001-03.jpg",
      specs: {
        engine: "CP2, 689 cm³, 2 cylindres",
        power: "73,4 ch (54,0 kW) @ 9 000 tr/min",
        weight: "205 kg",
        tank: "16 litres"
      },
      features: ["Coloris Speed block légendaire", "Fourche KYB entièrement réglable", "Écran TFT de 6,3 pouces avec mode Raid", "Garde-boue avant haut de course"]
    },
    {
      id: 210,
      name: "Ténéré 700",
      category: "Adventure",
      description: "Le trail mythique par excellence. Agile, polyvalent et équipé du moteur CP2 réputé pour son caractère joueur et fiable.",
      price: "115 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6052_2.jpg",
      specs: {
        engine: "CP2, 689 cm³, 2 cylindres",
        power: "73,4 ch (54,0 kW) @ 9 000 tr/min",
        weight: "204 kg",
        tank: "16 litres"
      },
      features: ["Moteur CP2 coupleux", "Cadre tubulaire léger en acier", "ABS désactivable à 3 modes", "Écran TFT de 5 pouces avec connectivité"]
    }
  ];

  const motocrossBikes = [
    {
      id: 211,
      name: "WR450F",
      category: "Enduro",
      description: "Dérivée de la machine de motocross YZ450F, la WR450F est l'arme enduro ultime de Yamaha, offrant puissance et agilité hors norme.",
      price: "115 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6065_1-500x500.jpg",
      specs: {
        engine: "450 cm³, 4 temps",
        power: "N/A",
        weight: "117 kg",
        tank: "7,4 litres"
      },
      features: ["Moteur YZ450F optimisé enduro", "Phare et feu arrière LED", "Réservoir de grande capacité", "Sabot moteur robuste"]
    },
    {
      id: 203,
      name: "YZ450F",
      category: "Motocross",
      description: "Puissance, agilité et contrôle. La YZ450F est l'arme ultime pour dominer la piste.",
      price: "105 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6090_1-500x500.jpg",
      specs: {
        engine: "450 cm³, 4 temps",
        power: "N/A",
        weight: "109 kg",
        tank: "6,2 litres"
      },
      features: ["Application Power Tuner", "Culasse inversée", "Cadre en aluminium bilateral", "Suspension KYB leader"]
    },
    {
      id: 204,
      name: "YZ250F",
      category: "Motocross",
      description: "Légère et rapide, la YZ250F redéfinit les normes de la catégorie 250 cm³ 4 temps.",
      price: "95 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6102_1.jpg",
      specs: {
        engine: "250 cm³, 4 temps",
        power: "N/A",
        weight: "106 kg",
        tank: "6,2 litres"
      },
      features: ["Moteur à culasse inversée", "Application Power Tuner", "Cadre léger en aluminium", "Suspension KYB"]
    },
    {
      id: 205,
      name: "YZ125",
      category: "Motocross",
      description: "La légende des 2 temps. Agilité extrême, puissance explosive et pur plaisir de pilotage.",
      price: "85 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6219_1-500x500.jpg",
      specs: {
        engine: "125 cm³, 2 temps",
        power: "N/A",
        weight: "95 kg",
        tank: "7,0 litres"
      },
      features: ["Moteur 2 temps léger", "Carburateur Keihin Powerjet", "Cadre en aluminium", "Look dynamique"]
    },
    {
      id: 206,
      name: "YZ85",
      category: "Motocross",
      description: "Pour les futurs champions. La YZ85 offre la technologie des grandes aux jeunes pilotes.",
      price: "65 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6069_1-500x500.jpg",
      specs: {
        engine: "85 cm³, 2 temps",
        power: "N/A",
        weight: "73 kg",
        tank: "5,0 litres"
      },
      features: ["Moteur YPVS", "Suspension réglable", "Freins à disque puissants", "Cadre rigide"]
    },
    {
      id: 207,
      name: "YZ65",
      category: "Motocross",
      description: "La première étape vers le podium. La YZ65 est la moto idéale pour les jeunes compétiteurs.",
      price: "55 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6505_1-500x500.jpg",
      specs: {
        engine: "65 cm³, 2 temps",
        power: "N/A",
        weight: "61 kg",
        tank: "3,5 litres"
      },
      features: ["Moteur 2 temps nerveux", "Ergonomie ajustable", "Look YZ authentique", "Cadre en acier semi-double berceau"]
    }
  ];

  const quadBikes = [
    {
      id: 215,
      name: "Raptor 700",
      category: "Quad",
      description: "Le roi incontesté des dunes. Une puissance phénoménale et un châssis affûté pour les sensations fortes.",
      price: "125 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6128_1-500x500.jpg",
      specs: {
        engine: "686 cm³, 1 cylindre",
        power: "N/A",
        weight: "192 kg",
        tank: "9,0 litres"
      },
      features: ["Moteur coupleux de 686 cm³", "Suspensions KYB réglables", "Châssis hybride léger", "Marche arrière pratique"]
    },
    {
      id: 216,
      name: "Raptor 450",
      category: "Quad",
      description: "La machine de course par excellence. Conçue pour la compétition avec une réactivité instantanée.",
      price: "115 000 DH",
      type: "vente",
      availability: true,
      image: "https://www.yamaha-motor.co.nz/-/media/products/motorcycle/atvrov/sport-atv/2023/yfz450rsep/overview-panel/2023_yfz450rse_yb_aus_stu_003_450x375.ashx",
      specs: {
        engine: "449 cm³, 1 cylindre",
        power: "N/A",
        weight: "184 kg",
        tank: "10,0 litres"
      },
      features: ["Moteur à injection électronique", "Embrayage anti-dribble", "Suspensions de compétition", "Large voies pour plus de stabilité"]
    },
    {
      id: 217,
      name: "Raptor 110",
      category: "Quad",
      description: "Le quad idéal pour les jeunes pilotes voulant s'initier aux joies du tout-terrain en toute sécurité.",
      price: "45 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/20462_2.jpg",
      specs: {
        engine: "112 cm³, 1 cylindre",
        power: "N/A",
        weight: "130 kg",
        tank: "6,6 litres"
      },
      features: ["Limiteur de vitesse réglable", "Transmission automatique", "Démarreur électrique", "Freins fiables"]
    }
  ];

  const utilityQuads = [
    {
      id: 220,
      name: "Grizzly 700 EPS XT-R",
      category: "Quad",
      description: "Le baroudeur ultime par excellence. Équipé d'un treuil Warn, de jantes en aluminium exclusives et d'un moteur MK II puissant.",
      price: "155 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2021/04/2024-Yamaha-YFM700FWAD-24S-EU-Titan_Tactical_Black-Studio-001-03-1-500x500.jpg",
      specs: {
        engine: "686 cm³, 1 cylindre",
        power: "N/A",
        weight: "354 kg",
        tank: "18,0 litres"
      },
      features: ["Moteur MK II coupleux", "Treuil WARN VRX 25 installé", "Pneus Maxxis Zilla 27 pouces", "Transmission Ultramatic"]
    },
    {
      id: 221,
      name: "Kodiak 450",
      category: "Quad",
      description: "Robuste, polyvalent et compact. Le compagnon idéal pour le travail quotidien et les randonnées de loisir.",
      price: "105 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2024/04/2024-Yamaha-YFM450FWB-24-EU-Olive_Green-360-Degrees-001-03-768x768.jpg",
      specs: {
        engine: "421 cm³, 1 cylindre",
        power: "N/A",
        weight: "290 kg",
        tank: "14,0 litres"
      },
      features: ["Moteur coupleux de 421 cm³", "Transmission Ultramatic", "Suspensions indépendantes", "Châssis compact facile à manoeuvrer"]
    }
  ];

  // Helper function to render a bike card
  const renderBike = (bike) => {
    const handleNav = (e) => {
      e.stopPropagation();
      navigate(`/moto/${bike.id}`, { state: { bike } });
    };

    return (
      <div key={bike.id} className="offroad-bike-card" onClick={handleNav} style={{ cursor: "pointer" }}>
        <div className="offroad-card-image-box">
          <div className={`offroad-badge ${bike.type === 'vente' ? 'badge-sale' : 'badge-rent'}`}>
            {bike.type === 'vente' ? 'À VENDRE' : 'LOCATION'}
          </div>
          <img src={bike.image || "https://via.placeholder.com/500?text=Image+Non+Disponible"} alt={bike.name} className="offroad-bike-image" />
          <div className="offroad-hover-overlay">
            <button className="offroad-action-btn" onClick={handleNav}>Voir les détails</button>
          </div>
        </div>

        <div className="offroad-card-content">
          <p className="offroad-bike-category">{bike.category}</p>
          <h3 className="offroad-bike-name">{bike.name}</h3>
          <p className="offroad-bike-desc">{bike.description}</p>

          <div className="offroad-card-footer">
            <span className="offroad-bike-price">{bike.price}</span>
            <button className="offroad-reserve-btn" onClick={handleNav}>
              {bike.type === 'vente' ? 'Acheter' : 'Réserver'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="offroad-page">
      <div className="offroad-red-bar"></div>

      <section className="offroad-hero-banner">
        <img src={heroImg} alt="Yamaha Off Road" className="offroad-banner-img" />
        <div className="offroad-banner-overlay">
          <span className="offroad-hero-subtitle">REPOUSSEZ VOS LIMITES</span>
          <h1 className="offroad-banner-title">OFF ROAD</h1>
          <p className="offroad-hero-desc">Libérez votre esprit d'aventure, sur la piste comme dans les grands espaces.</p>
        </div>
      </section>

      <section className="offroad-content-section">
        {/* DESIGNED SEPARATOR */}
        <div className="offroad-designed-divider" style={{ marginTop: '0px' }}></div>

        {/* ADVENTURE SECTION */}
        <div className="offroad-section-header">
          <h2 className="offroad-section-title">GAMME ADVENTURE</h2>
          <div className="offroad-separator"></div>
        </div>
        <div className="offroad-bikes-grid">
          {adventureBikes.map(renderBike)}
        </div>

        {/* DESIGNED SEPARATOR */}
        <div className="offroad-designed-divider"></div>

        {/* MOTOCROSS BANNER */}
        <div style={{ marginTop: '0px', marginBottom: '100px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src={motoCrossBanner} alt="Motocross Action" style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover' }} />
        </div>

        {/* MOTOCROSS SECTION */}
        <div className="offroad-section-header">
          <h2 className="offroad-section-title">GAMME MOTOCROSS</h2>
          <div className="offroad-separator"></div>
        </div>
        <div className="offroad-bikes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {motocrossBikes.map(renderBike)}
        </div>

        {/* DESIGNED SEPARATOR */}
        <div className="offroad-designed-divider"></div>

        {/* QUAD BANNER */}
        <div style={{ marginTop: '0px', marginBottom: '100px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src="https://desertoceansafari.com/wp-content/uploads/2025/08/1-yamaha-raptor-atv-quad-bike-ride-in-dubai-uae.webp" alt="Yamaha Raptor Action Desert" style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover', objectPosition: 'center 35%' }} />
        </div>

        {/* QUAD SECTION */}
        <div className="offroad-section-header">
          <h2 className="offroad-section-title">GAMME QUAD</h2>
          <span className="offroad-section-subtitle" style={{ display: 'block', color: '#ff4136', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: 'bold', marginTop: '10px' }}>Modèles Sport & Compétition</span>
          <div className="offroad-separator" style={{ marginTop: '15px' }}></div>
        </div>
        <div className="offroad-bikes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {quadBikes.map(renderBike)}
        </div>

        {/* DESIGNED SEPARATOR */}
        <div className="offroad-designed-divider"></div>

        {/* UTILITY QUAD BANNER */}
        <div style={{ marginTop: '0px', marginBottom: '30px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src="https://cdn2.yamaha-motor.eu/prod/product-assets/2025/YFM700FWAD-25S/2025-Yamaha-YFM700FWAD-25S-EU-Dusty_Blue-Action-001-03.jpg" alt="Yamaha Grizzly Utility Quad" style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover', objectPosition: 'center 35%' }} />
        </div>

        {/* RANDONNÉE & UTILITAIRE SECTION */}
        <div className="offroad-section-header">
          <span className="offroad-section-subtitle" style={{ display: 'block', color: '#ff4136', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: 'bold', marginTop: '10px' }}>Randonnée & Utilitaire</span>
          <div className="offroad-separator" style={{ marginTop: '15px' }}></div>
        </div>
        <div className="offroad-bikes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {utilityQuads.map(renderBike)}
        </div>
      </section>
    </div>
  );
}

export default OffRoad;
