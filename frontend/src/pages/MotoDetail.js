import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { ALL_VEHICLES } from "../components/Navbar";
import { getAvailableColors } from "../utils/colorData";
import "./CSS/MotoDetail.css";

// HELPER: Dynamic specs sheet generator (Tirées)
const getDetailedSpecs = (bike) => {
  const name = bike.name.toLowerCase();
  const category = bike.category.toLowerCase();
  
  if (name.includes("r1")) {
    return [
      "Type de moteur : 4 cylindres crossplane CP4, 4 temps, refroidissement liquide, double ACT, 4 soupapes",
      "Cylindrée : 998 cm³",
      "Puissance maximale : 200 ch (147,1 kW) à 13 500 tr/min",
      "Couple maximal : 113,3 Nm à 11 500 tr/min",
      "Embrayage : Multidisque en bain d'huile",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Deltabox en aluminium",
      "Suspension avant : Fourche télescopique inversée Ø 43 mm (Öhlins ERS sur R1M)",
      "Suspension arrière : Bras oscillant (biellettes) Öhlins ERS sur R1M / KYB sur R1",
      "Frein avant : Double disque Ø 320 mm",
      "Frein arrière : Simple disque Ø 220 mm",
      "Poids tous pleins faits : 201 kg (202 kg pour R1M)",
      "Capacité du réservoir : 17 litres"
    ];
  }

  if (name.includes("r9")) {
    return [
      "Type de moteur : 3 cylindres CP3, 4 temps, refroidissement liquide, double ACT, 4 soupapes",
      "Cylindrée : 890 cm³",
      "Puissance maximale : 119 ch (87,5 kW) à 10 000 tr/min",
      "Couple maximal : 93,0 Nm à 7 000 tr/min",
      "Embrayage : Multidisque en bain d'huile",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Cadre Deltabox en aluminium coulé sous pression",
      "Suspension avant : Fourche télescopique inversée KYB Ø 43 mm, entièrement réglable",
      "Suspension arrière : Bras oscillant (biellettes) KYB, entièrement réglable",
      "Frein avant : Double disque Ø 320 mm, étriers Brembo Stylema",
      "Frein arrière : Simple disque Ø 220 mm",
      "Poids tous pleins faits : 195 kg",
      "Capacité du réservoir : 14 litres"
    ];
  }

  if (name.includes("r7")) {
    return [
      "Type de moteur : Bicylindre CP2, 4 temps, refroidissement liquide, double ACT, 4 soupapes",
      "Cylindrée : 689 cm³",
      "Puissance maximale : 73,4 ch (54,0 kW) à 8 750 tr/min",
      "Couple maximal : 67,0 Nm à 6 500 tr/min",
      "Embrayage : Multidisque en bain d'huile, A&S (anti-dribble)",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Cadre de type diamant en acier",
      "Suspension avant : Fourche télescopique inversée Ø 41 mm, entièrement réglable",
      "Suspension arrière : Bras oscillant (biellettes), réglable en précharge et détente",
      "Frein avant : Double disque Ø 298 mm, étriers radiaux",
      "Frein arrière : Simple disque Ø 245 mm",
      "Poids tous pleins faits : 188 kg",
      "Capacité du réservoir : 13 litres"
    ];
  }

  if (name.includes("mt-10")) {
    return [
      "Type de moteur : 4 cylindres crossplane CP4, 4 temps, refroidissement liquide, double ACT",
      "Cylindrée : 998 cm³",
      "Puissance maximale : 165,9 ch (122,0 kW) à 11 500 tr/min",
      "Couple maximal : 112,0 Nm à 9 000 tr/min",
      "Embrayage : Multidisque en bain d'huile, A&S (anti-dribble)",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Deltabox en aluminium",
      "Suspension avant : Fourche inversée KYB Ø 43 mm (Öhlins semi-active sur SP)",
      "Suspension arrière : Bras oscillant (biellettes) KYB (Öhlins semi-active sur SP)",
      "Frein avant : Double disque Ø 320 mm, étriers radiaux à 4 pistons",
      "Frein arrière : Simple disque Ø 220 mm",
      "Poids tous pleins faits : 212 kg (214 kg pour SP)",
      "Capacité du réservoir : 17 litres"
    ];
  }

  if (name.includes("mt-09")) {
    return [
      "Type de moteur : 3 cylindres CP3, 4 temps, refroidissement liquide, double ACT, 4 soupapes",
      "Cylindrée : 890 cm³",
      "Puissance maximale : 119 ch (87,5 kW) à 10 000 tr/min",
      "Couple maximal : 93,0 Nm à 7 000 tr/min",
      "Embrayage : Multidisque en bain d'huile, A&S (anti-dribble)",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Cadre de type diamant en aluminium coulé sous pression",
      "Suspension avant : Fourche inversée KYB Ø 41 mm (Öhlins réglable sur SP)",
      "Suspension arrière : Bras oscillant (biellettes) KYB (Öhlins réglable sur SP)",
      "Frein avant : Double disque Ø 298 mm, étriers radiaux",
      "Frein arrière : Simple disque Ø 245 mm",
      "Poids tous pleins faits : 193 kg (194 kg pour SP)",
      "Capacité du réservoir : 14 litres"
    ];
  }

  if (name.includes("mt-07")) {
    return [
      "Type de moteur : Bicylindre CP2, 4 temps, refroidissement liquide, double ACT, 4 soupapes",
      "Cylindrée : 689 cm³",
      "Puissance maximale : 73,4 ch (54,0 kW) à 8 750 tr/min",
      "Couple maximal : 67,0 Nm à 6 500 tr/min",
      "Embrayage : Multidisque en bain d'huile",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Cadre de type diamant en acier",
      "Suspension avant : Fourche télescopique conventionnelle Ø 41 mm",
      "Suspension arrière : Bras oscillant (biellettes), mono-amortisseur",
      "Frein avant : Double disque Ø 298 mm, étriers à 4 pistons",
      "Frein arrière : Simple disque Ø 245 mm",
      "Poids tous pleins faits : 184 kg",
      "Capacité du réservoir : 14 litres"
    ];
  }

  if (name.includes("mt-125")) {
    return [
      "Type de moteur : Monocylindre, 4 temps, refroidissement liquide, simple ACT, 4 soupapes, VVA",
      "Cylindrée : 124 cm³",
      "Puissance maximale : 15 ch (11,0 kW) à 10 000 tr/min",
      "Couple maximal : 11,5 Nm à 8 000 tr/min",
      "Embrayage : Multidisque en bain d'huile, A&S (anti-dribble)",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Cadre Deltabox en acier",
      "Suspension avant : Fourche télescopique inversée Ø 41 mm",
      "Suspension arrière : Bras oscillant (biellettes), mono-amortisseur",
      "Frein avant : Simple disque Ø 292 mm, étrier radial",
      "Frein arrière : Simple disque Ø 220 mm",
      "Poids tous pleins faits : 142 kg",
      "Capacité du réservoir : 10 litres"
    ];
  }

  if (category.includes("sport touring") || name.includes("tracer")) {
    return [
      "Type de moteur : CP3 tricylindre en ligne, 4 temps, refroidissement liquide, double ACT, 4 soupapes",
      "Cylindrée : 890 cm³",
      "Puissance maximale : 119 ch (87,5 kW) à 10 000 tr/min",
      "Couple maximal : 93,0 Nm à 7 000 tr/min",
      "Embrayage : Multidisque en bain d'huile, A&S (anti-dribble)",
      "Mise en route : Démarreur électrique",
      "Transmission : Prise constante, 6 vitesses, chaîne",
      "Châssis : Cadre Deltabox en aluminium",
      "Suspension avant : Fourche télescopique inversée Ø 41 mm, entièrement réglable",
      "Suspension arrière : Bras oscillant (biellettes), mono-amortisseur réglable",
      "Frein avant : Double disque Ø 298 mm, étriers radiaux",
      "Frein arrière : Simple disque Ø 245 mm",
      "Poids tous pleins faits : 220 kg (avec valises)",
      "Capacité du réservoir : 18 litres"
    ];
  }

  if (category.includes("scooter") || name.includes("max")) {
    return [
      "Type de moteur : Monocylindre ou bicylindre Blue Core, 4 temps, refroidissement liquide, simple/double ACT",
      "Cylindrée : 125 cm³ à 560 cm³ selon modèle",
      "Puissance maximale : 12,2 ch à 47,6 ch (compatible A2)",
      "Couple maximal : 11,2 Nm à 55,7 Nm selon cylindrée",
      "Alimentation : Injection électronique de carburant",
      "Transmission : Automatique à variation continue (CVT)",
      "Embrayage : Centrifuge automatique",
      "Mise en route : Démarreur électrique",
      "Châssis : Type sous-poutre en acier ou aluminium coulé",
      "Suspension avant : Fourche télescopique",
      "Suspension arrière : Double amortisseur ou mono-amortisseur biellette",
      "Freins : Frein à disque hydraulique avec ABS de série",
      "Poids en ordre de marche : 131 kg à 220 kg",
      "Capacité du réservoir : 7,1 L à 15 L"
    ];
  }

  if (category.includes("ssv") || name.includes("yxz") || name.includes("wolverine")) {
    return [
      "Type de moteur : Bicylindre ou tricylindre, 4 temps, refroidissement liquide, double ACT, 4 soupapes",
      "Cylindrée : 998 cm³ à 999 cm³",
      "Alimentation : Injection électronique de carburant (EFI)",
      "Transmission : Boîte séquentielle Sport Shift 5 rapports ou CVT Ultramatic",
      "Système de transmission : On-Command 2x4, 4x4, 4x4 avec blocage de différentiel",
      "Suspension avant : Double triangle indépendant, amortisseurs Fox réglables",
      "Suspension arrière : Double triangle indépendant avec barre stabilisatrice, amortisseurs Fox",
      "Frein avant : Double disque hydraulique",
      "Frein arrière : Double disque hydraulique",
      "Poids tous pleins faits : 721 kg à 928 kg",
      "Capacité du réservoir : 34 à 35 litres"
    ];
  }

  if (category.includes("adventure") || name.includes("ténéré") || name.includes("off road") || name.includes("yz") || name.includes("enduro")) {
    return [
      "Type de moteur : Bicylindre CP2 ou monocylindre, 4 temps, refroidissement liquide, double ACT",
      "Cylindrée : 125 cm³ à 689 cm³",
      "Puissance maximale : 15 ch à 73,4 ch selon cylindrée",
      "Couple maximal : 11,8 Nm à 68,0 Nm",
      "Embrayage : Multidisque en bain d'huile",
      "Mise en route : Démarreur électrique / Kick (motocross)",
      "Transmission : Prise constante, 5 ou 6 vitesses, chaîne",
      "Châssis : Type double berceau en acier haute résistance ou aluminium",
      "Suspension avant : Fourche télescopique inversée à grand débattement (210 - 230 mm)",
      "Suspension arrière : Bras oscillant (biellettes), amortisseur réglable",
      "Frein avant : Simple ou double disque hydraulique, ABS déconnectable",
      "Frein arrière : Simple disque hydraulique",
      "Poids en ordre de marche : 105 kg à 220 kg",
      "Capacité du réservoir : 9 L à 23 L (World Raid)"
    ];
  }

  if (category.includes("marine") || name.includes("jetski") || name.includes("superjet") || name.includes("boat")) {
    return [
      "Type de moteur : Moteur marin Yamaha Marine, TR-1 / SVHO suralimenté, 3 ou 4 cylindres",
      "Cylindrée : 1 049 cm³ à 1 812 cm³",
      "Puissance maximale : 100 ch à 250 ch",
      "Système de suralimentation : Compresseur volumétrique avec échangeur thermique (SVHO)",
      "Refroidissement : Par circulation d'eau en circuit ouvert",
      "Propulsion : Pompe hydrojet Ø 155 mm ou 160 mm à haut débit",
      "Mise en route : Démarreur électrique",
      "Coque : Coque NanoXcel2 ultra-légère et ultra-résistante",
      "Capacité de stockage : 29 L à 168 L selon modèle",
      "Poids à sec : 170 kg à 397 kg",
      "Capacité du réservoir : 19 L à 70 L"
    ];
  }

  return [
    "Type de moteur : Moteur Yamaha hautes performances, 4 temps",
    "Cylindrée : Optimisée pour la catégorie",
    "Refroidissement : Liquide de précision pour une efficacité maximale",
    "Transmission : Système à rapports ou automatique de précision",
    "Lubrification : Carter humide",
    "Mise en route : Démarreur électrique",
    "Suspension avant : Amortissement hydraulique de pointe",
    "Suspension arrière : Suspension réglable progressive",
    "Freins : Freins à disques hydrauliques avec ABS",
    "Fiabilité : Normes de qualité AA Motors validées",
    "Poids : Équilibré pour une agilité parfaite",
    "Capacité du réservoir : Optimisée selon le type de parcours"
  ];
};

// HELPER: Showcase static image per model
const getShowcaseImage = (bike) => {
  const name = bike.name.toLowerCase();
  const showcaseMap = {
    "mt-10 sp": "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/MT10DX/2024-Yamaha-MT10DX-EU-Icon_Performance-Static-005-03.jpg",
  };
  return showcaseMap[name] || null;
};

function MotoDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [bike, setBike] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSpecsOpen, setIsSpecsOpen] = useState(true);

  // Load bike state
  useEffect(() => {
    window.scrollTo(0, 0);
    const bikeState = location.state?.bike;
    
    if (bikeState) {
      setBike(bikeState);
      const bikeColors = getAvailableColors(bikeState);
      setSelectedColor(bikeColors[0]);
    } else {
      // Find inside ALL_VEHICLES catalogue
      const match = ALL_VEHICLES.find(v => v.id.toString() === id);
      if (match) {
        setBike(match);
        const bikeColors = getAvailableColors(match);
        setSelectedColor(bikeColors[0]);
      }
    }
  }, [id, location.state]);


  if (!bike) {
    return (
      <div className="moto-detail-error">
        <h2>Moto ou Véhicule introuvable</h2>
        <button onClick={() => navigate("/motos")}>Retour aux motos</button>
      </div>
    );
  }

  const categoryStr = bike.category || "Motos";
  const colors = getAvailableColors(bike);
  const specsList = getDetailedSpecs(bike);

  // Find 3 recommended bikes of the same category, excluding current one
  const recommendations = ALL_VEHICLES
    .filter(v => v.category === bike.category && v.id !== bike.id)
    .slice(0, 3);
    
  // If not enough in same category, pad with others
  if (recommendations.length < 3) {
    const idsToExclude = [bike.id, ...recommendations.map(r => r.id)];
    const pad = ALL_VEHICLES
      .filter(v => !idsToExclude.includes(v.id))
      .slice(0, 3 - recommendations.length);
    recommendations.push(...pad);
  }

  // Parse price details
  const priceString = bike.price || "Nous contacter";
  const numericPrice = parseInt(priceString.replace(/\D/g, ''), 10);
  const oldPrice = numericPrice ? (numericPrice * 1.08).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DHS" : null;
  const currentPrice = priceString.includes('DH') ? priceString.replace('DH', 'DHS') : priceString;

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    const cartItem = {
      id: bike.id,
      name: bike.name,
      price: currentPrice,
      quantity: quantity,
      image: bike.image,
      category: categoryStr,
      type: bike.type || 'vente',
      color: selectedColor ? selectedColor.name : "Standard"
    };

    const existingCart = JSON.parse(localStorage.getItem("pfa_cart") || "[]");
    
    // Check if duplicate item with same color exists
    const existingItemIndex = existingCart.findIndex(item => item.id === bike.id && item.color === cartItem.color);
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem("pfa_cart", JSON.stringify(existingCart));
    navigate("/cart");
  };

  const handleRecommendationClick = (recBike) => {
    navigate(`/moto/${recBike.id}`, { state: { bike: recBike } });
  };

  return (
    <div className="moto-detail-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Accueil</Link> &gt; 
        <Link to="/motos"> Boutique</Link> &gt; 
        <Link to="/motos"> {categoryStr}</Link> &gt; 
        <span className="current-crumb"> {bike.name}</span>
      </div>

      <div className="moto-detail-container">
        
        {/* LEFT COLUMN: IMAGE WITH ZOOM */}
        <div className="moto-detail-left">
          <div 
            className="main-image-container zoom-container"
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.pageX - left - window.scrollX) / width) * 100;
              const y = ((e.pageY - top - window.scrollY) / height) * 100;
              e.currentTarget.querySelector('.zoom-image').style.transformOrigin = `${x}% ${y}%`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('.zoom-image').style.transformOrigin = 'center center';
            }}
          >
            <img src={selectedColor && selectedColor.image ? selectedColor.image : bike.image} alt={bike.name} className="main-bike-image zoom-image" />
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div className="moto-detail-right">
          <div className="brand-logo-container">
            <h2 className="brand-text">YAMAHA</h2>
            <p className="brand-slogan">Revs Your Heart</p>
          </div>

          <h1 className="moto-title">{bike.name}</h1>

          <div className="price-section">
            <span className="price-label">À partir de </span>
            {oldPrice && <span className="old-price">{oldPrice}</span>}
            <span className="new-price">{currentPrice}</span>
          </div>

          {/* COLOR CHOICE SWATCHES */}
          {colors.length > 0 && selectedColor && (
            <div className="color-selector">
              <h4 className="color-title">Couleur : {selectedColor.name}</h4>
              <div className="color-options">
                {colors.map((c, i) => (
                  <div 
                    key={i} 
                    className={`color-dot-wrapper ${selectedColor.name === c.name ? "active" : ""}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    <div 
                      className="color-dot" 
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <h3 className="slogan-title">L'ULTIME EXPÉRIENCE</h3>
          
          <div className="description-text">
            <p>{bike.description}</p>
            <p>Caché profondément dans le châssis, retrouvez l'ensemble le plus sophistiqué d'aides électroniques à la conduite conçu pour t'offrir le plus haut niveau de contrôle. Grâce à des systèmes de haute technologie, tu peux faire en sorte que ta {bike.name} se comporte exactement comme tu le souhaites.</p>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={decrementQty}>-</button>
              <input type="text" value={quantity} readOnly className="qty-input" />
              <button className="qty-btn" onClick={incrementQty}>+</button>
            </div>
            
            <button className="add-to-cart-btn" onClick={addToCart}>
              {bike.type === 'location' ? 'Réserver la Date' : 'Ajouter Au Panier'}
            </button>
          </div>

          <div className="categories-info">
            <span className="cat-label">Catégories : </span>
            <span className="cat-value">{categoryStr}, Motos</span>
          </div>
        </div>

      </div>

      {/* ═══ APERÇU RAPIDE ═══ */}
      {bike.features && bike.features.length > 0 && (
        <div className="apercue-rapide">
          <h2 className="apercue-title">Aperçu rapide</h2>
          <ul className="apercue-list">
            {bike.features.map((feature, i) => (
              <li key={i} className="apercue-item">
                <span className="apercue-bullet">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ═══ FICHE TECHNIQUE ═══ */}
      <div className="detailed-specs-container">
        <div
          className="detailed-specs-header"
          onClick={() => setIsSpecsOpen(!isSpecsOpen)}
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <h2 className="detailed-specs-title" style={{ margin: 0 }}>Fiche technique</h2>
          <span className={`specs-toggle-icon ${isSpecsOpen ? 'open' : ''}`}>▼</span>
        </div>

        <div className={`detailed-specs-wrapper-content ${isSpecsOpen ? 'open' : 'closed'}`}>
          <ul className="detailed-specs-list">
            {specsList.map((spec, i) => {
              const colonIndex = spec.indexOf(" : ");
              if (colonIndex !== -1) {
                const label = spec.substring(0, colonIndex);
                const value = spec.substring(colonIndex + 3);
                return (
                  <li key={i} className="detailed-spec-item-row">
                    <span className="spec-row-label">{label}</span>
                    <span className="spec-row-value">{value}</span>
                  </li>
                );
              }
              return (
                <li key={i} className="detailed-spec-item">{spec}</li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ═══ IMAGE SHOWCASE ═══ */}
      {(() => {
        const showcaseImg = getShowcaseImage(bike);
        if (!showcaseImg) return null;
        return (
          <div className="showcase-container">
            <div className="showcase-label">Vue officielle Yamaha</div>
            <img
              src={showcaseImg}
              alt={`${bike.name} — image officielle`}
              className="showcase-img"
            />
          </div>
        );
      })()}

      {/* ═══ RECOMMANDATIONS DE VEHICULES ═══ */}
      <div className="recommendations-container">
        <h2 className="recommendations-title">Vous aimerez aussi</h2>
        <div className="recommendations-grid">
          {recommendations.map((recBike) => (
            <div
              key={recBike.id}
              className="rec-bike-card"
              onClick={() => handleRecommendationClick(recBike)}
            >
              <div className="rec-image-box">
                <img src={recBike.image} alt={recBike.name} className="rec-image" />
              </div>
              <div className="rec-content">
                <span className="rec-category">{recBike.category}</span>
                <h3 className="rec-name">{recBike.name}</h3>
                <div className="rec-footer">
                  <span className="rec-price">{recBike.price || "Nous contacter"}</span>
                  <button className="rec-btn">DÉCOUVRIR</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default MotoDetail;

