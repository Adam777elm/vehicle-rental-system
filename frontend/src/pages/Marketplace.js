import React, { useState, useEffect } from "react";
import "./CSS/Marketplace.css";

// Moroccan cities and prominent motorcycle brands
const BRANDS = ["Yamaha", "BMW", "Kawasaki", "Honda", "Suzuki", "Ducati", "Harley-Davidson", "KTM", "Triumph"];
const LOCATIONS = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès", "Oujda", "Meknès", "Kenitra"];
const CONDITIONS = [
  { id: "neuf", label: "Neuf (État Vitrine)" },
  { id: "excellent", label: "Excellent" },
  { id: "tres-bon", label: "Très bon" }
];
const CATEGORIES = ["Roadster", "Supersport", "Adventure", "Sport Touring", "Scooter"];
const FILTER_CATEGORIES = ["Toutes", ...CATEGORIES];

// Category fallback images (high resolution) to ensure stunning listings if user doesn't provide an image URL
const CATEGORY_IMAGES = {
  Roadster: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
  Supersport: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
  Adventure: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800",
  "Sport Touring": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
  Scooter: "https://images.unsplash.com/photo-1563260797-cb5cd70254c8?auto=format&fit=crop&q=80&w=800"
};

function Marketplace() {
  // Listings state initialized from localStorage to enable fully dynamic persistency
  const [bikes, setBikes] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem("aa_marketplace_motos");
    if (saved) {
      setBikes(JSON.parse(saved));
    } else {
      // Initialize with an empty array as requested: "remove the actual motos occasion"
      setBikes([]);
    }

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

  // Sync state to localStorage whenever listing changes
  const saveToLocalStorage = (updatedBikes) => {
    localStorage.setItem("aa_marketplace_motos", JSON.stringify(updatedBikes));
    setBikes(updatedBikes);
  };

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

  // Add Product Form / Modal State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBike, setNewBike] = useState({
    title: "",
    brand: "Yamaha",
    model: "",
    category: "Roadster",
    year: "",
    mileage: "",
    price: "",
    condition: "excellent",
    location: "Casablanca",
    image: "",
    description: "",
    engine: "",
    power: "",
    gearbox: "",
    fuel: "Essence",
    sellerName: "",
    sellerPhone: ""
  });

  // Handle new listing submission
  const handleAddBikeSubmit = (e) => {
    e.preventDefault();
    if (!newBike.title || !newBike.model || !newBike.price || !newBike.sellerName || !newBike.sellerPhone) {
      alert("Veuillez remplir tous les champs obligatoires (Titre, Modèle, Prix, Nom et Téléphone).");
      return;
    }

    const defaultImg = CATEGORY_IMAGES[newBike.category] || CATEGORY_IMAGES.Roadster;
    const finalImage = newBike.image.trim() !== "" ? newBike.image.trim() : defaultImg;

    const conditionObj = CONDITIONS.find(c => c.id === newBike.condition);

    const bikeToAdd = {
      id: Date.now(), // Unique ID
      title: newBike.title,
      brand: newBike.brand,
      model: newBike.model,
      category: newBike.category,
      year: parseInt(newBike.year) || new Date().getFullYear(),
      mileage: parseInt(newBike.mileage) || 0,
      price: parseFloat(newBike.price) || 0,
      condition: newBike.condition,
      conditionLabel: conditionObj ? conditionObj.label : "Excellent",
      location: newBike.location,
      image: finalImage,
      description: newBike.description || "Aucune description fournie par le vendeur.",
      specs: {
        engine: newBike.engine || "Non spécifié",
        power: newBike.power || "Non spécifié",
        color: "D'origine",
        gearbox: newBike.gearbox || "Manuelle",
        fuel: newBike.fuel || "Essence",
        owners: "1ère Main"
      },
      sellerName: newBike.sellerName,
      sellerPhone: newBike.sellerPhone
    };

    const updated = [bikeToAdd, ...bikes];
    saveToLocalStorage(updated);

    // Reset Form & Close
    setNewBike({
      title: "",
      brand: "Yamaha",
      model: "",
      category: "Roadster",
      year: "",
      mileage: "",
      price: "",
      condition: "excellent",
      location: "Casablanca",
      image: "",
      description: "",
      engine: "",
      power: "",
      gearbox: "",
      fuel: "Essence",
      sellerName: "",
      sellerPhone: ""
    });
    setShowAddForm(false);
  };

  // Delete product (Allows user to manage their marketplace)
  const handleDeleteBike = (bikeId, e) => {
    e.stopPropagation();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      const updated = bikes.filter(b => b.id !== bikeId);
      saveToLocalStorage(updated);
      if (selectedBike && selectedBike.id === bikeId) {
        setSelectedBike(null);
      }
    }
  };

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
  const filteredBikes = bikes.filter(bike => {
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
    // Standardize phone format
    let cleanPhone = bike.sellerPhone.replace(/\s+/g, '').replace('+', '');
    if (!cleanPhone.startsWith('212')) {
      if (cleanPhone.startsWith('0')) {
        cleanPhone = '212' + cleanPhone.substring(1);
      } else {
        cleanPhone = '212' + cleanPhone;
      }
    }
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
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
            Découvrez notre sélection exclusive de motos d’occasion de prestige ou vendez la vôtre en quelques clics. Connectez-vous instantanément avec des acheteurs passionnés partout au Maroc.
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
                {FILTER_CATEGORIES.map((cat, i) => (
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
          <span className="market-section-subtitle">Marché Collaboratif</span>
          <h2 className="market-section-title">Les Motos d'Occasion</h2>
        </div>
        
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <span className="market-results-count">
            {sortedBikes.length} {sortedBikes.length > 1 ? "annonces trouvées" : "annonce trouvée"}
          </span>
          <button 
            className="market-card-btn-primary"
            onClick={() => setShowAddForm(true)}
            style={{ padding: "12px 24px", fontSize: "14px" }}
          >
            Publier une annonce 🏍️
          </button>
        </div>
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
                  
                  {/* Delete button (Allows user to delete listings they added) */}
                  <button 
                    className="market-delete-badge"
                    onClick={(e) => handleDeleteBike(bike.id, e)}
                    title="Supprimer cette annonce"
                  >
                    🗑️
                  </button>

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
            <h3>Aucune moto en vente</h3>
            <p>Le marché est actuellement vide. Devenez le premier vendeur et commencez à publier vos propres annonces d’occasion dès maintenant !</p>
            <button 
              className="market-card-btn-primary"
              onClick={() => setShowAddForm(true)}
              style={{ float: "none", display: "inline-block", padding: "14px 28px", marginTop: "10px" }}
            >
              Publier ma première annonce 🏍️
            </button>
          </div>
        )}
      </section>

      {/* ADD PRODUCT FORM MODAL */}
      {showAddForm && (
        <div className="market-modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="market-modal-content form-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "700px" }}>
            
            <button 
              className="market-modal-close" 
              onClick={() => setShowAddForm(false)}
              aria-label="Fermer le formulaire"
            >
              ✕
            </button>

            <form onSubmit={handleAddBikeSubmit} className="market-form">
              <h2 className="market-form-title">🏍️ Publier une Moto d'Occasion</h2>
              <p className="market-form-desc">Complétez les informations pour ajouter instantanément votre moto sur notre Marketplace.</p>

              <div className="market-form-grid">
                
                {/* Title */}
                <div className="market-form-group full-width">
                  <label className="market-form-label">Titre de l'annonce *</label>
                  <input 
                    type="text" 
                    className="market-form-input" 
                    placeholder="Ex: Yamaha MT-09 SP - Öhlins Edition"
                    value={newBike.title}
                    onChange={(e) => setNewBike({...newBike, title: e.target.value})}
                    required
                  />
                </div>

                {/* Brand */}
                <div className="market-form-group">
                  <label className="market-form-label">Marque *</label>
                  <select 
                    className="market-form-select"
                    value={newBike.brand}
                    onChange={(e) => setNewBike({...newBike, brand: e.target.value})}
                  >
                    {BRANDS.map((brand, i) => (
                      <option key={i} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div className="market-form-group">
                  <label className="market-form-label">Modèle *</label>
                  <input 
                    type="text" 
                    className="market-form-input" 
                    placeholder="Ex: MT-09 SP"
                    value={newBike.model}
                    onChange={(e) => setNewBike({...newBike, model: e.target.value})}
                    required
                  />
                </div>

                {/* Category */}
                <div className="market-form-group">
                  <label className="market-form-label">Catégorie *</label>
                  <select 
                    className="market-form-select"
                    value={newBike.category}
                    onChange={(e) => setNewBike({...newBike, category: e.target.value})}
                  >
                    {CATEGORIES.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div className="market-form-group">
                  <label className="market-form-label">Année-Modèle *</label>
                  <input 
                    type="number" 
                    className="market-form-input" 
                    placeholder="Ex: 2023"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={newBike.year}
                    onChange={(e) => setNewBike({...newBike, year: e.target.value})}
                    required
                  />
                </div>

                {/* Price */}
                <div className="market-form-group">
                  <label className="market-form-label">Prix (DH) *</label>
                  <input 
                    type="number" 
                    className="market-form-input" 
                    placeholder="Ex: 129000"
                    value={newBike.price}
                    onChange={(e) => setNewBike({...newBike, price: e.target.value})}
                    required
                  />
                </div>

                {/* Mileage */}
                <div className="market-form-group">
                  <label className="market-form-label">Kilométrage (km) *</label>
                  <input 
                    type="number" 
                    className="market-form-input" 
                    placeholder="Ex: 6200"
                    value={newBike.mileage}
                    onChange={(e) => setNewBike({...newBike, mileage: e.target.value})}
                    required
                  />
                </div>

                {/* Condition */}
                <div className="market-form-group">
                  <label className="market-form-label">État général</label>
                  <select 
                    className="market-form-select"
                    value={newBike.condition}
                    onChange={(e) => setNewBike({...newBike, condition: e.target.value})}
                  >
                    {CONDITIONS.map((cond) => (
                      <option key={cond.id} value={cond.id}>{cond.label}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="market-form-group">
                  <label className="market-form-label">Ville *</label>
                  <select 
                    className="market-form-select"
                    value={newBike.location}
                    onChange={(e) => setNewBike({...newBike, location: e.target.value})}
                  >
                    {LOCATIONS.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Image URL */}
                <div className="market-form-group full-width">
                  <label className="market-form-label">URL de l'image (Laissez vide pour utiliser une image de démonstration premium de la catégorie)</label>
                  <input 
                    type="url" 
                    className="market-form-input" 
                    placeholder="Ex: https://..."
                    value={newBike.image}
                    onChange={(e) => setNewBike({...newBike, image: e.target.value})}
                  />
                </div>

                {/* Description */}
                <div className="market-form-group full-width">
                  <label className="market-form-label">Description détaillée</label>
                  <textarea 
                    className="market-form-textarea" 
                    placeholder="Décrivez l'état de la moto, les options installées, les entretiens effectués..."
                    value={newBike.description}
                    onChange={(e) => setNewBike({...newBike, description: e.target.value})}
                    rows="3"
                  />
                </div>

                {/* Specs: Engine size */}
                <div className="market-form-group">
                  <label className="market-form-label">Cylindrée Moteur</label>
                  <input 
                    type="text" 
                    className="market-form-input" 
                    placeholder="Ex: 890 cm³ (3 cylindres)"
                    value={newBike.engine}
                    onChange={(e) => setNewBike({...newBike, engine: e.target.value})}
                  />
                </div>

                {/* Specs: Power */}
                <div className="market-form-group">
                  <label className="market-form-label">Puissance (ch)</label>
                  <input 
                    type="text" 
                    className="market-form-input" 
                    placeholder="Ex: 119 ch"
                    value={newBike.power}
                    onChange={(e) => setNewBike({...newBike, power: e.target.value})}
                  />
                </div>

                {/* Specs: Gearbox */}
                <div className="market-form-group">
                  <label className="market-form-label">Boîte de vitesses</label>
                  <input 
                    type="text" 
                    className="market-form-input" 
                    placeholder="Ex: Manuelle 6 rapports"
                    value={newBike.gearbox}
                    onChange={(e) => setNewBike({...newBike, gearbox: e.target.value})}
                  />
                </div>

                {/* Specs: Fuel */}
                <div className="market-form-group">
                  <label className="market-form-label">Carburant</label>
                  <select 
                    className="market-form-select"
                    value={newBike.fuel}
                    onChange={(e) => setNewBike({...newBike, fuel: e.target.value})}
                  >
                    <option value="Essence">Essence</option>
                    <option value="Electrique">Électrique</option>
                  </select>
                </div>

                {/* Seller Name */}
                <div className="market-form-group">
                  <label className="market-form-label">Nom complet du vendeur *</label>
                  <input 
                    type="text" 
                    className="market-form-input" 
                    placeholder="Ex: Youssef El Alami"
                    value={newBike.sellerName}
                    onChange={(e) => setNewBike({...newBike, sellerName: e.target.value})}
                    required
                  />
                </div>

                {/* Seller Phone */}
                <div className="market-form-group">
                  <label className="market-form-label">Téléphone WhatsApp *</label>
                  <input 
                    type="tel" 
                    className="market-form-input" 
                    placeholder="Ex: +212 600 000 000 ou 06..."
                    value={newBike.sellerPhone}
                    onChange={(e) => setNewBike({...newBike, sellerPhone: e.target.value})}
                    required
                  />
                </div>

              </div>

              <div className="market-form-actions">
                <button 
                  type="button" 
                  className="market-reset-btn"
                  onClick={() => setShowAddForm(false)}
                  style={{ height: "auto", alignSelf: "unset" }}
                >
                  Annuler
                </button>
                <button type="submit" className="market-card-btn-primary" style={{ padding: "14px 28px" }}>
                  Publier l'annonce
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

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
