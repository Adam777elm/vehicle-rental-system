import React, { useState } from "react";
import "./CSS/Equipement.css";

const EQUIPEMENT_ITEMS = [
  {
    id: 901,
    name: "SHOEI X-SPRINT YAMAHA GP",
    category: "Casques",
    description: "Casque de piste ultime en fibre de carbone multi-composite, aileron aérodynamique et ventilation GP active.",
    price: "9 500 DH",
    image: "https://www.shoei-europe.com/wp-content/uploads/2021/11/X-Spirit-3-Marc-Marquez-Concept-2-TC-1.png",
    specs: {
      material: "Fibres AIM+ multicouches",
      safety: "Homologation FIM ECE 22.06",
      weight: "1 350g"
    }
  },
  {
    id: 902,
    name: "DAINESE MUGELLO 2 D-AIR",
    category: "Blousons",
    description: "Combinaison en cuir de kangourou avec système airbag d'activation D-Air® intégré et plaques de titane.",
    price: "24 500 DH",
    image: "https://www.dainese.com/on/demandware.static/-/Sites-dainese-master-catalog/default/dw119c43d7/images/motorcycle/suits/leather-suits/201d10023_001_front.png",
    specs: {
      material: "Cuir de Kangourou & Titane",
      safety: "Système Airbag D-Air®",
      weight: "4.8 kg"
    }
  },
  {
    id: 903,
    name: "ALPINESTARS SUPERTECH R GP",
    category: "Bottes",
    description: "Bottes de course de référence portées par les champions de MotoGP. Chausson intérieur biomécanique séparé.",
    price: "5 800 DH",
    image: "https://images.mx-academy.com/product_images/supertech-r-boots-alpinestars-black-white-red-yellow.png",
    specs: {
      material: "Microfibre high-tech & TPU",
      safety: "Protection cheville biomécanique",
      weight: "950g par botte"
    }
  },
  {
    id: 904,
    name: "YAMAHA FACTORY RACING JACKET",
    category: "Blousons",
    description: "Blouson en cuir de vachette premium aux couleurs officielles Yamaha Racing. Protections coudes et épaules homologuées.",
    price: "6 200 DH",
    image: "https://cdn.yamaha-motor.eu/prod/apparel/2024/b24-rj103-e1/B24-RJ103-E1-00-Yamaha-Racing-Leather-Jacket-Apparel-02.png",
    specs: {
      material: "Cuir de vachette 1.3mm",
      safety: "Protections CE Niveau 2",
      weight: "2.1 kg"
    }
  },
  {
    id: 905,
    name: "FIVE RFX1 REPLICA YAMAHA",
    category: "Gants",
    description: "Gants de course haut de gamme. Coques de protection en carbone ventilées, cuir de chèvre et coutures en Kevlar.",
    price: "3 100 DH",
    image: "https://five-gloves.com/wp-content/uploads/2020/07/RFX1_REPLICA_ATTACK_RED_YELLOW_FLUO_FRONT.png",
    specs: {
      material: "Cuir de chèvre & Carbone",
      safety: "Homologation KP1 CE",
      weight: "320g la paire"
    }
  },
  {
    id: 906,
    name: "YAMAHA RACING TEAM CAP",
    category: "Accessoires",
    description: "Casquette officielle de l'équipe de course Yamaha Paddock Blue. Ajustable, respirante et légère.",
    price: "350 DH",
    image: "https://cdn.yamaha-motor.eu/prod/apparel/2024/n24-fh302-b0/N24-FH302-B0-00-Yamaha-Racing-Team-Cap-Apparel-01.png",
    specs: {
      material: "100% Coton organique",
      safety: "Visière anti-UV active",
      weight: "80g"
    }
  }
];

function Equipement() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const categories = ["Tous", "Casques", "Blousons", "Gants", "Bottes", "Accessoires"];

  const filteredItems = activeCategory === "Tous"
    ? EQUIPEMENT_ITEMS
    : EQUIPEMENT_ITEMS.filter(item => item.category === activeCategory);

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500);
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price.replace('DH', 'DHS'),
      quantity: 1,
      image: item.image,
      category: item.category,
      type: "vente"
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(c => c.id === cartItem.id);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    showToast(`${item.name} ajouté au panier !`, "success");
    
    // Dispatch localstorage event to update navbar cart count if needed
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="eq-page">
      <div className="eq-red-bar"></div>

      {/* TOAST NOTIFICATION */}
      {toast.visible && (
        <div className={`toast-notification ${toast.type}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>{toast.message}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="eq-hero">
        <div className="eq-hero-overlay"></div>
        <div className="eq-hero-content">
          <span className="eq-hero-eyebrow">PROTECTION & STYLE</span>
          <h1 className="eq-hero-title">ÉQUIPEMENT RIDER</h1>
          <p className="eq-hero-desc">
            Explorez notre sélection officielle d'accessoires et d'équipements homologués pour rouler avec style et en toute sécurité.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="eq-catalog-section">
        <div className="eq-filters">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`eq-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="eq-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="eq-card">
              <div className="eq-image-box">
                <span className="eq-item-tag">{item.category.toUpperCase()}</span>
                <img
                  src={item.image}
                  alt={item.name}
                  className="eq-item-img"
                  onError={(e) => {
                    e.target.src = "https://cdn.yamaha-motor.eu/prod/apparel/2024/b24-rj103-e1/B24-RJ103-E1-00-Yamaha-Racing-Leather-Jacket-Apparel-02.png";
                  }}
                />
              </div>

              <div className="eq-card-content">
                <h3 className="eq-item-name">{item.name}</h3>
                <p className="eq-item-desc">{item.description}</p>
                
                {/* Tech Specs */}
                <div className="eq-specs-grid">
                  <div className="eq-spec-cell">
                    <span className="eq-spec-label">MATIÈRE</span>
                    <span className="eq-spec-val">{item.specs.material}</span>
                  </div>
                  <div className="eq-spec-cell">
                    <span className="eq-spec-label">SÉCURITÉ</span>
                    <span className="eq-spec-val">{item.specs.safety}</span>
                  </div>
                  <div className="eq-spec-cell">
                    <span className="eq-spec-label">POIDS</span>
                    <span className="eq-spec-val">{item.specs.weight}</span>
                  </div>
                </div>

                <div className="eq-card-footer">
                  <span className="eq-item-price">{item.price}</span>
                  <button 
                    className="eq-buy-btn"
                    onClick={(e) => handleAddToCart(item, e)}
                  >
                    AJOUTER AU PANIER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Equipement;
