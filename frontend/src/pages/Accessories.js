import React, { useState, useEffect } from "react";
import "./CSS/Accessories.css";

import lifeJacketImg from "../assets/MARINE_IMG/life-jacket.png";
import coverImg from "../assets/MARINE_IMG/waverunner-cover.png";
import coolerImg from "../assets/MARINE_IMG/marine-cooler.png";
import anchorImg from "../assets/MARINE_IMG/folding-anchor.png";

const ACCESSORIES_ITEMS = [
  {
    id: 951,
    name: "GILET DE SAUVETAGE YAMAHA DELUXE",
    category: "Sécurité",
    description: "Gilet en néoprène haut de gamme à haute flottabilité avec boucles robustes, conçu pour le confort et la sécurité active lors des sorties WaveRunner.",
    price: "1 200 DH",
    image: lifeJacketImg,
    specs: {
      material: "Néoprène double épaisseur",
      safety: "Certifié ISO 12402-5 (50N)",
      sizes: "S, M, L, XL"
    }
  },
  {
    id: 952,
    name: "HOUSSE DE PROTECTION WAVERUNNER PREMIUM",
    category: "Protection",
    description: "Housse sur mesure imperméable et résistante aux UV pour protéger votre WaveRunner de la poussière, de la saleté et des intempéries.",
    price: "2 400 DH",
    image: coverImg,
    specs: {
      material: "Polyester Sur Last® ultra-durable",
      fit: "Ajustement élastique sur mesure",
      tech: "Système de ventilation sous vide"
    }
  },
  {
    id: 953,
    name: "GLACIÈRE MARINE ISOTHERME YAMAHA",
    category: "Confort",
    description: "Glacière marine robuste à isolation renforcée, idéale pour conserver vos boissons et aliments au frais durant de longues journées en mer.",
    price: "3 500 DH",
    image: coolerImg,
    specs: {
      capacity: "25 Litres",
      tech: "Isolation mousse polyuréthane injectée",
      retention: "Jusqu'à 3 jours de glace"
    }
  },
  {
    id: 954,
    name: "ANCRE GRAPIN PLIABLE WAVERUNNER",
    category: "Mouillage",
    description: "Kit d'ancrage complet comprenant une ancre grapin pliable en acier galvanisé de 1,5 kg, une corde marine de 10m et une bouée.",
    price: "950 DH",
    image: anchorImg,
    specs: {
      weight: "1.5 kg",
      material: "Acier galvanisé anti-corrosion",
      contents: "Ancre + Corde 10m + Bouée + Sac"
    }
  }
];

function Accessories() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const categories = ["Tous", "Sécurité", "Protection", "Confort", "Mouillage"];
  
  const filteredItems = activeCategory === "Tous" 
    ? ACCESSORIES_ITEMS 
    : ACCESSORIES_ITEMS.filter(item => item.category === activeCategory);
    
  const handleOrderWhatsApp = (item) => {
    const text = `Bonjour AA Motors, je souhaite commander l'accessoire marine "${item.name}" au prix de ${item.price}. Est-il disponible ?`;
    const url = `https://wa.me/212774593031?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="acc-page">
      <div className="acc-red-bar"></div>
      
      {/* HERO SECTION */}
      <section className="acc-hero">
        <div className="acc-hero-overlay"></div>
        <div className="acc-hero-content">
          <span className="acc-hero-eyebrow">EQUIPEMENTS MARINE</span>
          <h1 className="acc-hero-title">Accessoires d'Origine</h1>
          <p className="acc-hero-desc">
            Optimisez vos sorties en mer avec notre sélection exclusive d'accessoires officiels Yamaha WaveRunner et bateaux. Sécurité, protection et confort garantis.
          </p>
        </div>
      </section>
      
      {/* CATALOG SECTION */}
      <section className="acc-catalog-section">
        
        {/* FILTERS */}
        <div className="acc-filters">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`acc-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* GRID */}
        <div className="acc-grid">
          {filteredItems.map(item => (
            <article key={item.id} className="acc-card">
              <div className="acc-image-box">
                <span className="acc-category-badge">{item.category}</span>
                <img src={item.image} alt={item.name} className="acc-image" />
              </div>
              
              <div className="acc-content">
                <h3 className="acc-name">{item.name}</h3>
                <p className="acc-desc">{item.description}</p>
                
                {/* Tech Specs */}
                <div className="acc-specs-box">
                  {Object.entries(item.specs).map(([key, val], idx) => (
                    <div key={idx} className="acc-spec-row">
                      <span className="acc-spec-label">
                        {key === "material" ? "Matériau" : 
                         key === "safety" ? "Sécurité" : 
                         key === "sizes" ? "Tailles" : 
                         key === "fit" ? "Ajustement" : 
                         key === "tech" ? "Technologie" : 
                         key === "capacity" ? "Capacité" : 
                         key === "retention" ? "Rétention" : 
                         key === "weight" ? "Poids" : key} :
                      </span>
                      <span className="acc-spec-val">{val}</span>
                    </div>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="acc-card-footer">
                  <span className="acc-price">{item.price}</span>
                  <button 
                    className="acc-order-btn"
                    onClick={() => handleOrderWhatsApp(item)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm12.008-21.84c-5.43 0-9.85 4.41-9.854 9.836 0 1.93.498 3.81 1.442 5.488l.156.27-1.066 3.896 3.992-1.047.262.155c1.581.938 3.393 1.433 5.257 1.433h.005c5.431 0 9.85-4.409 9.855-9.836C22.022 5.28 17.583 2.16 12.008 2.16zm5.388 12.915c-.295-.148-1.748-.862-2.02-.962-.27-.099-.467-.148-.663.148-.196.297-.759.962-.931 1.16-.172.196-.344.22-.64.072-.295-.148-1.25-.46-2.38-1.467-.88-.785-1.474-1.755-1.647-2.052-.172-.296-.018-.456.13-.603.133-.132.296-.346.444-.519.148-.173.197-.297.296-.495.099-.198.05-.371-.025-.519-.075-.148-.663-1.6-.909-2.193-.24-.58-.504-.5-.688-.509-.178-.009-.382-.01-.586-.01-.205 0-.537.077-.817.382-.28.305-1.071 1.047-1.071 2.553 0 1.506 1.094 2.962 1.242 3.16.148.197 2.152 3.286 5.213 4.61.728.315 1.297.503 1.74.646.732.233 1.398.2 1.925.12.587-.088 1.748-.714 1.995-1.401.246-.688.246-1.277.172-1.401-.074-.124-.27-.198-.566-.346z"/>
                    </svg>
                    Commander via WhatsApp
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
      </section>
    </div>
  );
}

export default Accessories;
