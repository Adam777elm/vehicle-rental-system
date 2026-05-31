import React, { useState, useEffect } from "react";
import "./CSS/Marketplace.css";

// Moroccan cities and prominent motorcycle brands
const BRANDS = ["Yamaha", "BMW", "Kawasaki", "Honda", "Suzuki", "Ducati"];
const LOCATIONS = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès"];
const CONDITIONS = [
  { id: "neuf", label: "Neuf (État Vitrine)" },
  { id: "excellent", label: "Excellent" },
  { id: "tres-bon", label: "Très bon" }
];
const CATEGORIES = ["Toutes", "Supersport", "Roadster", "Adventure", "Sport Touring", "Scooter"];

// Premium high-quality mock data for Used Motorcycles in Morocco
const USED_MOTORCYCLES = [
  {
    id: 1,
    title: "Yamaha MT-09 SP - Öhlins Edition",
    brand: "Yamaha",
    model: "MT-09 SP",
    category: "Roadster",
    year: 2023,
    mileage: 6200,
    price: 129000,
    condition: "excellent",
    conditionLabel: "Excellent",
    location: "Casablanca",
    image: "https://danfay.ie/cdn/shop/files/2024-Yamaha-MT09DX-EU-Icon_Performance-360-Degrees-001-03.jpg?v=1706098490&width=1946",
    description: "Superbe MT-09 SP en état irréprochable. Suspensions semi-actives Öhlins haut de gamme, Shifter Up & Down très fluide, cartographie moteur réglable, pneus Michelin neufs. Entretiens exclusifs chez la maison Yamaha. Première main.",
    specs: {
      engine: "CP3 - 890 cm³ (3 cylindres)",
      power: "119 ch",
      color: "Icon Performance (Bleu/Noir)",
      gearbox: "Manuelle 6 rapports + Shifter",
      fuel: "Essence (Sans Plomb)",
      owners: "1ère Main"
    },
    sellerName: "Youssef El Alami",
    sellerPhone: "+212774593031"
  },
  {
    id: 2,
    title: "BMW R 1250 GS Adventure - HP Pack",
    brand: "BMW",
    model: "R 1250 GS Adventure",
    category: "Adventure",
    year: 2021,
    mileage: 18400,
    price: 215000,
    condition: "excellent",
    conditionLabel: "Excellent",
    location: "Rabat",
    image: "https://www.bmw-motorrad.ch/content/dam/bmwmotorradnsc/marketCH/common/images/models/adventure/r1250gs-adventure/2022/22-09/stage/nsc-r1250gsa-stage-1920x1080.jpg.asset.1663155799757.jpg",
    description: "Vends magnifique R 1250 GSA finition HP toutes options. Écran TFT connecté, suspension pilotée ESA dynamic, 3 valises alu BMW d'origine, feux additionnels LED, barres de protection moteur et réservoir. Prête pour les longs voyages.",
    specs: {
      engine: "Boxer - 1254 cm³ ShiftCam",
      power: "136 ch",
      color: "Coloris HP (Blanc/Bleu/Rouge)",
      gearbox: "Manuelle 6 rapports",
      fuel: "Essence",
      owners: "2ème Main"
    },
    sellerName: "Karim Benchakroun",
    sellerPhone: "+212774593031"
  },
  {
    id: 3,
    title: "Kawasaki Z900 Performance - Carbon",
    brand: "Kawasaki",
    model: "Z900",
    category: "Roadster",
    year: 2022,
    mileage: 9500,
    price: 99000,
    condition: "tres-bon",
    conditionLabel: "Très bon",
    location: "Marrakech",
    image: "https://images.caradisiac.com/images/1/3/3/0/191330/S0-kawasaki-z900-et-z900-se-2022-de-nouveaux-coloris-au-programme-687258.jpg",
    description: "Z900 version Performance avec échappement Akrapovič Carbone homologué. Capot de selle arrière sport, bulle fumée haute performance, protections moteur d'origine. Moto très soignée, dort toujours dans un garage fermé.",
    specs: {
      engine: "4 cylindres en ligne - 948 cm³",
      power: "125 ch",
      color: "Tech Black / Lime Green",
      gearbox: "Manuelle 6 rapports",
      fuel: "Essence",
      owners: "1ère Main"
    },
    sellerName: "Abdou Boumchita",
    sellerPhone: "+212774593031"
  },
  {
    id: 4,
    title: "Yamaha YZF-R1 - Edition 60ème Anniversaire",
    brand: "Yamaha",
    model: "YZF-R1",
    category: "Supersport",
    year: 2022,
    mileage: 4800,
    price: 245000,
    condition: "neuf",
    conditionLabel: "Neuf (État Vitrine)",
    location: "Casablanca",
    image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2022/YZF1000R1WGP/2022-Yamaha-YZF1000R1WGP-EU-Silky_White-Studio-001-03.jpg",
    description: "Rarissime Yamaha R1 en livrée mythique WGP 60th Anniversary (Blanc & Rouge Speedblock). Moto de passionné achetée neuve chez le concessionnaire officiel. Entièrement d'origine, aucune modification esthétique ou mécanique. État concours.",
    specs: {
      engine: "CP4 Crossplane - 998 cm³",
      power: "200 ch",
      color: "WGP 60th Anniversary (Blanc/Rouge)",
      gearbox: "Manuelle 6 vitesses + Shifter QSS",
      fuel: "Essence",
      owners: "1ère Main"
    },
    sellerName: "Mohamed Alami",
    sellerPhone: "+212774593031"
  },
  {
    id: 5,
    title: "Honda CRF1100L Africa Twin Adventure",
    brand: "Honda",
    model: "CRF1100L Africa Twin",
    category: "Adventure",
    year: 2020,
    mileage: 22000,
    price: 138000,
    condition: "tres-bon",
    conditionLabel: "Très bon",
    location: "Tanger",
    image: "https://www.honda.co.jp/news/2019/image/2191023-crf1100l.jpg",
    description: "Africa Twin Adventure Sports avec boîte séquentielle DCT double embrayage. Bulle haute réglable, poignées chauffantes, protections de radiateur, bagagerie souple d'aventure incluse. Moto robuste idéale pour les pistes de l'Atlas.",
    specs: {
      engine: "Bicylindre en ligne - 1084 cm³",
      power: "102 ch",
      color: "Tricolore HRC (Bleu/Blanc/Rouge)",
      gearbox: "Automatique DCT double embrayage",
      fuel: "Essence",
      owners: "2ème Main"
    },
    sellerName: "Anass El Miri",
    sellerPhone: "+212774593031"
  },
  {
    id: 6,
    title: "Yamaha TMAX 560 Tech MAX - Dark Petrol",
    brand: "Yamaha",
    model: "TMAX 560 Tech MAX",
    category: "Scooter",
    year: 2023,
    mileage: 3200,
    price: 168000,
    condition: "neuf",
    conditionLabel: "Neuf (État Vitrine)",
    location: "Agadir",
    image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2023/XP500A/2023-Yamaha-XP500A-EU-Dark_Petrol-360-Degrees-001-03_Mobile.jpg",
    description: "Le roi incontesté des maxi-scooters dans sa version haut de gamme Tech MAX. Coloris exclusif Dark Petrol, selle chauffante, poignées chauffantes, pare-brise à réglage électrique, régulateur de vitesse, suspension arrière réglable. Carnet de garantie à jour.",
    specs: {
      engine: "Bicylindre parallèle - 562 cm³",
      power: "47.6 ch (A2 éligible)",
      color: "Dark Petrol",
      gearbox: "Automatique CVT",
      fuel: "Essence",
      owners: "1ère Main"
    },
    sellerName: "Yassine Mansouri",
    sellerPhone: "+212774593031"
  },
  {
    id: 7,
    title: "BMW S 1000 XR - M Pack Touring",
    brand: "BMW",
    model: "S 1000 XR",
    category: "Sport Touring",
    year: 2022,
    mileage: 8100,
    price: 198000,
    condition: "excellent",
    conditionLabel: "Excellent",
    location: "Rabat",
    image: "https://www.press.bmwgroup.com/global/photo/comp/T0318536EN/the-new-bmw-s-1000-xr-m-package-09/2020",
    description: "L'hybride parfait entre performances supersportives de la S1000RR et confort de voyage d'un trail routier. Équipé du Pack M complet (silencieux Akrapovič Titane, jantes forgées M légères, selle sport M) et du Pack Touring (supports valises, GPS Navigator 6). Une vraie bombe routière.",
    specs: {
      engine: "4 cylindres en ligne - 999 cm³",
      power: "165 ch",
      color: "M Motorsport (Blanc/Bleu/Rouge)",
      gearbox: "Manuelle 6 rapports + Shifter Pro",
      fuel: "Essence",
      owners: "1ère Main"
    },
    sellerName: "Mehdi Benjelloun",
    sellerPhone: "+212774593031"
  },
  {
    id: 8,
    title: "Suzuki GSX-S 1000 GT - Grand Tourisme",
    brand: "Suzuki",
    model: "GSX-S 1000 GT",
    category: "Sport Touring",
    year: 2023,
    mileage: 5500,
    price: 135000,
    condition: "excellent",
    conditionLabel: "Excellent",
    location: "Casablanca",
    image: "https://images.caradisiac.com/images/3/0/0/2/193002/S0-essai-suzuki-gsx-s1000gt-le-sport-tourisme-est-de-retour-695079.jpg",
    description: "Sportive routière dynamique et technologique. Équipée du Shifter bidirectionnel ultra rapide, valises latérales peintes couleur carrosserie incluses, régulateur de vitesse, connectivité smartphone complète sur grand écran TFT. Très agréable en duo.",
    specs: {
      engine: "4 cylindres en ligne issu de la GSX-R - 999 cm³",
      power: "152 ch",
      color: "Deep Blue Metallic",
      gearbox: "Manuelle 6 rapports + Shifter Up/Down",
      fuel: "Essence",
      owners: "1ère Main"
    },
    sellerName: "Houssam Tazi",
    sellerPhone: "+212774593031"
  }
];

function Marketplace() {
  // Navigation / Scroll-Reveal Simulation
  useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll reveal observer
    const observerOptions = { threshold: 0.05 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.market-reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [minYear, setMinYear] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Selected Listing for Detail Modal
  const [selectedBike, setSelectedBike] = useState(null);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setSelectedCategory("Toutes");
    setSelectedLocation("");
    setSelectedCondition("");
    setMinPrice("");
    setMaxPrice("");
    setMaxMileage("");
    setMinYear("");
    setSortBy("newest");
  };

  // Filter & Sort Logic
  const filteredBikes = USED_MOTORCYCLES.filter(bike => {
    const matchSearch = bike.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bike.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bike.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBrand = selectedBrand ? bike.brand === selectedBrand : true;
    const matchCategory = selectedCategory !== "Toutes" ? bike.category === selectedCategory : true;
    const matchLocation = selectedLocation ? bike.location === selectedLocation : true;
    const matchCondition = selectedCondition ? bike.condition === selectedCondition : true;
    
    const bikePrice = bike.price;
    const matchMinPrice = minPrice ? bikePrice >= parseFloat(minPrice) : true;
    const matchMaxPrice = maxPrice ? bikePrice <= parseFloat(maxPrice) : true;
    
    const matchMaxMileage = maxMileage ? bike.mileage <= parseInt(maxMileage) : true;
    const matchMinYear = minYear ? bike.year >= parseInt(minYear) : true;

    return matchSearch && matchBrand && matchCategory && matchLocation && matchCondition && matchMinPrice && matchMaxPrice && matchMaxMileage && matchMinYear;
  });

  // Sort function
  const sortedBikes = [...filteredBikes].sort((a, b) => {
    if (sortBy === "newest") return b.year - a.year || b.id - a.id;
    if (sortBy === "cheapest") return a.price - b.price;
    if (sortBy === "highest") return b.price - a.price;
    return 0;
  });

  // Generate WhatsApp Link
  const getWhatsAppLink = (bike) => {
    const message = `Bonjour, je suis intéressé par votre annonce de la "${bike.title} (${bike.year})" affichée à ${bike.price.toLocaleString("fr-FR")} DH sur AA Motors. Est-elle toujours disponible ?`;
    return `https://wa.me/212774593031?text=${encodeURIComponent(message)}`;
  };

  // Generate Email Link
  const getEmailLink = (bike) => {
    const subject = `Annonce AA Motors : ${bike.title}`;
    const body = `Bonjour,\n\nJe vous contacte concernant l'annonce pour la moto "${bike.title}" (${bike.year}) à ${bike.price.toLocaleString("fr-FR")} DH.\n\nMerci de me recontacter pour planifier une visite ou obtenir plus de renseignements.\n\nCordialement.`;
    return `mailto:boumchitaabdoullah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="market-page">
      <div className="market-red-bar"></div>

      {/* HERO BANNER SECTION */}
      <section className="market-hero">
        <img 
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1600" 
          alt="Used Motorcycle Marketplace" 
          className="market-hero-bg" 
        />
        <div className="market-hero-overlay"></div>
        <div className="market-hero-content">
          <div className="market-hero-badge">
            <span className="market-badge-dot"></span>
            Le Marché d'Occasion Premium
          </div>
          <h1 className="market-hero-title">
            Motorcycle <span className="market-title-gradient">Marketplace</span>
          </h1>
          <p className="market-hero-desc">
            Découvrez notre sélection exclusive de motos d’occasion de prestige. Inspectées avec soin, garanties et prêtes à prendre la route au meilleur prix du marché marocain.
          </p>
        </div>
      </section>

      {/* FILTER & CONTROLS SECTION */}
      <div className="market-controls-wrapper">
        <div className="market-controls-panel">
          
          {/* Main search and sort */}
          <div className="market-search-row">
            <div className="market-search-bar">
              <svg 
                className="market-search-icon-inside"
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher par marque, modèle ou titre (ex: MT-09 SP, R1...)"
                className="market-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="market-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Trier par"
            >
              <option value="newest">Les plus récentes</option>
              <option value="cheapest">Prix croissant</option>
              <option value="highest">Prix décroissant</option>
            </select>
          </div>

          {/* Detailed Filters Grid */}
          <div className="market-filters-grid">
            
            {/* Brand */}
            <div className="market-filter-group">
              <label className="market-filter-label">Marque</label>
              <select
                className="market-filter-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Toutes les marques</option>
                {BRANDS.map((brand, i) => (
                  <option key={i} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Category / Type */}
            <div className="market-filter-group">
              <label className="market-filter-label">Catégorie</label>
              <select
                className="market-filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map((cat, i) => (
                  <option key={i} value={cat}>{cat === "Toutes" ? "Toutes les catégories" : cat}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="market-filter-group">
              <label className="market-filter-label">Budget (DH)</label>
              <div className="market-range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  className="market-filter-input"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="market-range-sep">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="market-filter-input"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Mileage */}
            <div className="market-filter-group">
              <label className="market-filter-label">Kilométrage Max</label>
              <select
                className="market-filter-select"
                value={maxMileage}
                onChange={(e) => setMaxMileage(e.target.value)}
              >
                <option value="">Peu importe</option>
                <option value="5000">Moins de 5 000 km</option>
                <option value="10000">Moins de 10 000 km</option>
                <option value="15000">Moins de 15 000 km</option>
                <option value="25000">Moins de 25 000 km</option>
              </select>
            </div>

            {/* Year */}
            <div className="market-filter-group">
              <label className="market-filter-label">Année Min</label>
              <select
                className="market-filter-select"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
              >
                <option value="">Peu importe</option>
                <option value="2023">2023 & plus</option>
                <option value="2022">2022 & plus</option>
                <option value="2021">2021 & plus</option>
                <option value="2020">2020 & plus</option>
              </select>
            </div>

            {/* Location */}
            <div className="market-filter-group">
              <label className="market-filter-label">Ville</label>
              <select
                className="market-filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Toutes les villes</option>
                {LOCATIONS.map((loc, i) => (
                  <option key={i} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div className="market-filter-group">
              <label className="market-filter-label">État</label>
              <select
                className="market-filter-select"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                <option value="">Tous les états</option>
                {CONDITIONS.map((cond) => (
                  <option key={cond.id} value={cond.id}>{cond.label}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button 
              className="market-reset-btn"
              onClick={handleResetFilters}
            >
              Réinitialiser
            </button>

          </div>
        </div>
      </div>

      {/* SUBSECTION FOR "LES MOTOS D'OCCASION" */}
      <div className="market-section-title-wrapper">
        <div className="market-section-title-container">
          <span className="market-section-subtitle">Exclusivité Maroc</span>
          <h2 className="market-section-title">Les Motos d'Occasion</h2>
        </div>
        <span className="market-results-count">
          {sortedBikes.length} {sortedBikes.length > 1 ? "annonces trouvées" : "annonce trouvée"}
        </span>
      </div>

      {/* MOTORCYCLE LISTINGS GRID */}
      <section className="market-listings-container">
        {sortedBikes.length > 0 ? (
          <div className="market-listings-grid">
            {sortedBikes.map((bike) => (
              <article key={bike.id} className="market-card market-reveal">
                
                {/* Image and Badges */}
                <div className="market-card-img-wrapper">
                  <img 
                    src={bike.image} 
                    alt={bike.title} 
                    className="market-card-img" 
                    loading="lazy" 
                  />
                  <div className="market-card-img-gradient"></div>
                  <div className="market-card-badges">
                    <span className={`market-card-badge-cond ${bike.condition}`}>
                      {bike.conditionLabel}
                    </span>
                  </div>
                  <span className="market-card-price-tag">
                    {bike.price.toLocaleString("fr-FR")} DH
                  </span>
                </div>

                {/* Card Body */}
                <div className="market-card-body">
                  <div className="market-card-meta">
                    <span>{bike.brand}</span>
                    <span>{bike.category}</span>
                  </div>
                  <h3 className="market-card-title">{bike.title}</h3>

                  {/* Specs */}
                  <div className="market-card-specs">
                    <div className="market-card-spec-item">
                      <span className="market-card-spec-icon">📅</span>
                      <span>Année {bike.year}</span>
                    </div>
                    <div className="market-card-spec-item">
                      <span className="market-card-spec-icon">🛣️</span>
                      <span>{bike.mileage.toLocaleString("fr-FR")} km</span>
                    </div>
                    <div className="market-card-spec-item">
                      <span className="market-card-spec-icon">⚙️</span>
                      <span>{bike.specs.engine.split(" - ")[0]}</span>
                    </div>
                    <div className="market-card-spec-item">
                      <span className="market-card-spec-icon">⚡</span>
                      <span>{bike.specs.power}</span>
                    </div>
                  </div>

                  {/* Footer (Location + Actions) */}
                  <div className="market-card-footer">
                    <div className="market-card-location">
                      <span>📍</span>
                      <span>{bike.location}</span>
                    </div>
                    
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        className="market-card-btn"
                        onClick={() => setSelectedBike(bike)}
                      >
                        Voir détails
                      </button>
                      <a 
                        href={getWhatsAppLink(bike)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="market-card-btn-primary"
                        style={{ textDecoration: "none" }}
                      >
                        Contacter
                      </a>
                    </div>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="market-empty-state">
            <div className="market-empty-icon">🏍️🔍</div>
            <h3>Aucun résultat trouvé</h3>
            <p>Nous n'avons trouvé aucune moto correspondant à vos critères de recherche actuels. Essayez de réinitialiser vos filtres ou d'élargir votre recherche.</p>
            <button 
              className="market-reset-btn"
              onClick={handleResetFilters}
              style={{ float: "none", display: "inline-block" }}
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </section>

      {/* MOTORCYCLE DETAIL MODAL */}
      {selectedBike && (
        <div className="market-modal-overlay" onClick={() => setSelectedBike(null)}>
          <div className="market-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button 
              className="market-modal-close" 
              onClick={() => setSelectedBike(null)}
              aria-label="Fermer le modal"
            >
              ✕
            </button>

            <div className="market-modal-grid">
              
              {/* Left Column: Image */}
              <div className="market-modal-media">
                <img 
                  src={selectedBike.image} 
                  alt={selectedBike.title} 
                  className="market-modal-img" 
                />
                <div className="market-modal-media-gradient"></div>
              </div>

              {/* Right Column: Detailed Specs and Seller info */}
              <div className="market-modal-info">
                <span className="market-modal-brand">{selectedBike.brand} • {selectedBike.category}</span>
                <h2 className="market-modal-title">{selectedBike.title}</h2>
                
                <div className="market-modal-price">
                  {selectedBike.price.toLocaleString("fr-FR")} DH
                </div>

                {/* Grid of full specifications */}
                <div className="market-modal-specs-list">
                  <div>
                    <div className="market-modal-spec-label">Année-Modèle</div>
                    <div className="market-modal-spec-value">{selectedBike.year}</div>
                  </div>
                  <div>
                    <div className="market-modal-spec-label">Kilométrage</div>
                    <div className="market-modal-spec-value">{selectedBike.mileage.toLocaleString("fr-FR")} km</div>
                  </div>
                  <div>
                    <div className="market-modal-spec-label">Moteur</div>
                    <div className="market-modal-spec-value">{selectedBike.specs.engine}</div>
                  </div>
                  <div>
                    <div className="market-modal-spec-label">Puissance</div>
                    <div className="market-modal-spec-value">{selectedBike.specs.power}</div>
                  </div>
                  <div>
                    <div className="market-modal-spec-label">Boîte de Vitesses</div>
                    <div className="market-modal-spec-value">{selectedBike.specs.gearbox}</div>
                  </div>
                  <div>
                    <div className="market-modal-spec-label">État général</div>
                    <div className="market-modal-spec-value">{selectedBike.conditionLabel}</div>
                  </div>
                  <div>
                    <div className="market-modal-spec-label">Couleur Extérieure</div>
                    <div className="market-modal-spec-value">{selectedBike.specs.color}</div>
                  </div>
                  <div>
                    <div className="market-modal-spec-label">Disponibilité</div>
                    <div className="market-modal-spec-value">{selectedBike.location}</div>
                  </div>
                </div>

                {/* Short text description */}
                <div className="market-modal-description">
                  {selectedBike.description}
                </div>

                {/* Seller Section */}
                <div className="market-seller-box">
                  <div className="market-seller-header">
                    <div className="market-seller-avatar">
                      {selectedBike.sellerName.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div className="market-seller-name-box">
                      <span className="market-seller-name">{selectedBike.sellerName}</span>
                      <span className="market-seller-role">Vendeur Partenaire Certifié</span>
                    </div>
                  </div>
                  
                  <div className="market-modal-actions">
                    <a 
                      href={getWhatsAppLink(selectedBike)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="market-action-btn-wa"
                    >
                      <span>💬 Contacter sur WhatsApp</span>
                    </a>
                    <a 
                      href={getEmailLink(selectedBike)}
                      className="market-action-btn-mail"
                    >
                      <span>✉️ Envoyer un E-mail</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Marketplace;
