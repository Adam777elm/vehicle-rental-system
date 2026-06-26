import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/OffRoad.css";
import VehicleCard from "../components/VehicleCard";

// Assets
import heroImg from "../assets/MOTO_IMG/offroad-hero.jpg";
import motoCrossBanner from "../assets/OFFROAD-IMG/motocross-banner.png";

function OffRoad() {
  const navigate = useNavigate();

  const adventureBikes = [
    {
      id: 2001,
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
      id: 2002,
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
      id: 2010,
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
      id: 2011,
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
      id: 2003,
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
      id: 2004,
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
      id: 2005,
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
      id: 2006,
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
      id: 2007,
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
      id: 2015,
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
      id: 2016,
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
      id: 2017,
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
      id: 2020,
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
      id: 2021,
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

  const ssvVehicles = [
    {
      id: 2030,
      name: "YXZ1000R Sport Shift",
      category: "SSV",
      description: "Le SSV de sport ultime de Yamaha. Moteur tricylindre de 998 cm³, palettes de changement de vitesse au volant et amortisseurs Fox 2.5 Podium RC2.",
      price: "245 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6161_1.jpg",
      specs: {
        engine: "998 cm³, 3 cylindres, 4 temps",
        power: "N/A",
        weight: "721 kg",
        tank: "34 litres"
      },
      features: ["Palettes au volant Sport Shift", "Amortisseurs Fox 2.5 Podium", "Moteur 3 cylindres CP3", "Châssis rigide de compétition"]
    },
    {
      id: 2031,
      name: "Wolverine Limited",
      category: "SSV",
      description: "Polyvalence extrême pour 4 adultes. Moteur bicylindre de 999 cm³, transmission Ultramatic ultra-fiable et suspensions haut de gamme, en édition limitée.",
      price: "265 000 DH",
      type: "vente",
      availability: true,
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6169_1.jpg",
      specs: {
        engine: "999 cm³, 2 cylindres, 4 temps",
        power: "N/A",
        weight: "928 kg",
        tank: "35 litres"
      },
      features: ["Cabine 4 places modulable", "Pneus GBC Dirt Commander 30\"", "Moteur bicylindre robuste", "Mode D-Mode 3 positions", "Édition Limited exclusive"]
    }
  ];

  // Helper function to render a bike card
  const renderBike = (bike) => {
    const handleNav = (updatedBike) => {
      navigate(`/moto/${bike.id}`, { state: { bike: updatedBike } });
    };

    return (
      <VehicleCard
        key={bike.id}
        bike={bike}
        badge={bike.type === 'vente' ? 'À VENDRE' : 'LOCATION'}
        onNav={handleNav}
      />
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

        {/* DESIGNED SEPARATOR */}
        <div className="offroad-designed-divider"></div>

        {/* SSV BANNER */}
        <div style={{ marginTop: '0px', marginBottom: '100px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src="https://cdn2.yamaha-motor.eu/prod/product-assets/2025/YXZ1000E-25/2025-Yamaha-YXZ1000E-25-EU-Racing_Blue-Action-001-03.jpg" alt="Yamaha SSV YXZ1000R Action" style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover', objectPosition: 'center 35%' }} />
        </div>

        {/* SSV SECTION */}
        <div className="offroad-section-header">
          <h2 className="offroad-section-title">GAMME SSV</h2>
          <span className="offroad-section-subtitle" style={{ display: 'block', color: '#ff4136', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: 'bold', marginTop: '10px' }}>Véhicules Côte-à-Côte Sport & Loisir</span>
          <div className="offroad-separator" style={{ marginTop: '15px' }}></div>
        </div>
        <div className="offroad-bikes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {ssvVehicles.map(renderBike)}
        </div>
      </section>
    </div>
  );
}

export default OffRoad;
