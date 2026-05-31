import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import aaLogo from "../assets/HOME_IMG/Logo-2.png";

// Full vehicle catalogue for autocomplete (with full data for MotoDetail state)
const ALL_VEHICLES = [
    // Roadster
    { id: 201, name: "MT-10 SP",  category: "Roadster",      price: "195 000 DH", image: "https://www.ivors.ie/wp-content/uploads/2016/12/2017_yam_mt10dx_eu_bwm2_stu_001_03.jpg", description: "Le summum de l'Hyper Naked. Suspensions semi-actives Öhlins de 2ème génération et coloris exclusif Icon Performance.", features: ["Suspension Öhlins Gen 2", "Sabot moteur 3 pièces", "Durites de frein tressées", "Coloris Icon Performance"] },
    { id: 202, name: "MT-10",     category: "Roadster",      price: "175 000 DH", image: "https://www.yamaha-motor.com.au/-/media/products/motorcycle/road/maximum-torque/2025/mt10as/product-category-page/2025_mt10_mlnm4_aus_stu_001_750x600.ashx", description: "Puissance Master of Torque. Le moteur CP4 issu de la R1 délivre un couple époustouflant.", features: ["Moteur CP4 de 998 cm³", "Shifter QSS de série", "Écran TFT 4,2 pouces", "YVSL"] },
    { id: 203, name: "MT-09 SP",  category: "Roadster",      price: "135 000 DH", image: "https://danfay.ie/cdn/shop/files/2024-Yamaha-MT09DX-EU-Icon_Performance-360-Degrees-001-03.jpg?v=1706098490&width=1946", description: "L'instinct de défi poussé à l'extrême. Suspensions premium Öhlins et mode circuit dédié.", features: ["Amortisseur arrière Öhlins", "Mode TRACK", "Bras oscillant alu brossé", "Système Smart Key"] },
    { id: 204, name: "MT-09",     category: "Roadster",      price: "115 000 DH", image: "https://danfay.ie/cdn/shop/files/2024-Yamaha-MT09DX-EU-Icon_Performance-360-Degrees-001-03.jpg?v=1706098490&width=1946", description: "The Dark Side of Japan. Plus légère, plus puissante et dotée d'une technologie d'aide au pilotage de pointe.", features: ["Nouveau carénage compact", "IMU à 6 axes", "Écran TFT 5 pouces", "Positions réglables"] },
    { id: 205, name: "MT-07",     category: "Roadster",      price: "85 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/MT700A/2024-Yamaha-MT700A-EU-Storm_Fluo-360-Degrees-001-03.jpg", description: "L'attraction pure. Moteur CP2 généreux, moto la plus vendue de sa catégorie.", features: ["Moteur CP2 coupleux", "Écran TFT connecté", "Disques 298 mm", "LED intégral"] },
    { id: 206, name: "MT-125",    category: "Roadster",      price: "52 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/MT125A/2026-Yamaha-MT125A-EU-Tech_Black-Studio-001-03.jpg", description: "La reine des 125. Moteur haute technologie et habillage agressif.", features: ["Moteur 125 cm³ VVA", "Embrayage antidribble", "Écran TFT connecté", "Style Hyper Naked"] },
    // Supersport
    { id: 101, name: "R1M",       category: "Supersport",    price: "285 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1SPL/2024-Yamaha-YZF1000R1SPL-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg", description: "La machine de piste ultime. Suspension électronique Öhlins et carénage en carbone.", features: ["Suspension ERS Öhlins", "Carénage carbone", "CCU GPS", "Bridgestone RS11"] },
    { id: 102, name: "R1",        category: "Supersport",    price: "215 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1/2024-Yamaha-YZF1000R1-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "Conçue sans compromis. Moteur crossplane 1000 cm³ et châssis ultra-léger.", features: ["Moteur crossplane CP4", "EBM", "ABS en virage", "TFT couleur"] },
    { id: 103, name: "R9",        category: "Supersport",    price: "155 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/YZF900R9/2026-Yamaha-YZF900R9-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "Une nouvelle ère de performance. Moteur CP3 à couple élevé.", features: ["Moteur CP3", "Ailerons aérodynamiques", "Shifter 3ème gen", "Modes de conduite"] },
    { id: 104, name: "R7",        category: "Supersport",    price: "105 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF700R7/2024-Yamaha-YZF700R7-EU-Icon_Blue-Studio-001-03.jpg", description: "Finesse et agilité. Équilibre parfait entre puissance et comportement sportif.", features: ["Moteur CP2 réactif", "Carénage fin", "Embrayage A&S", "Position sportive"] },
    // Sport Touring
    { id: 1,   name: "TRACER 9 GT+", category: "Sport Touring", price: "169 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATRDXCS/2025-Yamaha-MT09ATRDXCS-EU-Cobalt_Blue-360-Degrees-001-03.jpg", description: "Le nec plus ultra du Sport Touring. Radar ACC, suspension semi-active et TFT 7 pouces.", features: ["Radar ACC", "Suspension semi-active KYB", "Écran TFT 7\"", "Valises rigides"] },
    { id: 5,   name: "TRACER 9 GT",  category: "Sport Touring", price: "155 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATRDXS/2025-Yamaha-MT09ATRDXS-EU-Ceramic_Ice-360-Degrees-001-03_Mobile.jpg", description: "La voyageuse sportive ultime avec suspension semi-active KYB.", features: ["Valises rigides", "Phares directionnels LED", "Poignées chauffantes", "QSS"] },
    { id: 2,   name: "TRACER 9",     category: "Sport Touring", price: "135 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATR/2025-Yamaha-MT09ATR-EU-Redline-360-Degrees-001-03_Mobile.jpg", description: "L'aventure en toute liberté. CP3 890 cm³ et cadre aluminium.", features: ["CP3 890 cm³ EU5", "Cadre alu coulé", "IMU 6 axes", "LED intégral"] },
    { id: 3,   name: "TRACER 7 GT",  category: "Sport Touring", price: "105 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/MT07TRGTS/2026-Yamaha-MT07TRGTS-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg", description: "Prête pour toutes les aventures. Valises, bulle haute touring et selle confort.", features: ["Valises latérales", "Bulle touring", "Selle confort", "Icon Performance"] },
    // Scooters
    { id: 501, name: "TMAX 560 ANNIVERSARY", category: "Scooter", price: "215 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500ASV/2026-Yamaha-XP500ASV-EU-Black_MAX_-360-Degrees-001-03_Mobile.jpg", description: "Édition exclusive Anniversaire Black MAX avec finitions premium.", features: ["Édition limitée Black MAX", "Jantes forgées", "Selle exclusive", "Badge numéroté"] },
    { id: 506, name: "TMAX 560 TECH MAX",    category: "Scooter", price: "165 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/XP500A/2025-Yamaha-XP500A-EU-Icon_Black_-Studio-001-03.jpg", description: "Le summum du confort et de la technologie maxi-scooter.", features: ["Selle chauffante", "Pare-brise électrique", "TFT 7\"", "Régulateur de vitesse"] },
    { id: 502, name: "TMAX 560",    category: "Scooter",   price: "145 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500A/2026-Yamaha-XP500A-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "L'icône du design MAX. Style agressif et agilité redoutable.", features: ["EURO5 560 cm³", "Smart Key", "Contrôle de traction", "Grand coffre"] },
    { id: 503, name: "XMAX 300",    category: "Scooter",   price: "85 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/XMAX300A/2025-Yamaha-XMAX300A-EU-Icon_Black_-360-Degrees-001-03_Mobile.jpg", description: "L'équilibre parfait entre usage urbain et escapades week-end.", features: ["Fourche type moto", "Phare en X", "Connectivité smartphone", "ABS + TCS"] },
    { id: 504, name: "NMAX 155 TECH", category: "Scooter", price: "52 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/G125YMSV/2025-Yamaha-G125YMSV-EU-Ceramic_Grey-360-Degrees-001-03_Mobile.jpg", description: "L'élégance urbaine ultime. Edition TECH Ceramic Grey connectée.", features: ["CCU connecté", "Start & Stop", "ABS de série", "LED premium"] },
    { id: 505, name: "NMAX 125",    category: "Scooter",   price: "42 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/G125YM/2026-Yamaha-G125YM-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "L'urbain par excellence. Économique, agile et moderne.", features: ["EURO5 125 cm³", "Rangement casque intégral", "Bluetooth", "Disques av/ar"] },
];

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const normalize = (str) => str.toLowerCase().replace(/[-\s]/g, "");

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        if (val.trim().length >= 1) {
            const norm = normalize(val);
            const filtered = ALL_VEHICLES.filter(v =>
                normalize(v.name).includes(norm) ||
                normalize(v.category).includes(norm)
            ).slice(0, 6); // max 6 suggestions
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSearch(false);
            setSearchQuery("");
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (vehicle) => {
        // Find the full vehicle data from SearchResults catalogue
        navigate(`/moto/${vehicle.id}`, { state: { bike: {
            id: vehicle.id,
            name: vehicle.name,
            category: vehicle.category,
            price: vehicle.price || "Nous contacter",
            description: vehicle.description || "",
            image: vehicle.image || "",
            type: "vente",
            features: vehicle.features || [],
            specs: vehicle.specs || {}
        }}});
        setShowSearch(false);
        setSearchQuery("");
        setSuggestions([]);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
        if (e.key === "Escape") { setShowSearch(false); setSearchQuery(""); setSuggestions([]); }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);
                setSearchQuery("");
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Apply global light mode class
    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add("light-mode");
        } else {
            document.body.classList.remove("light-mode");
        }
    }, [isLightMode]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Masquer si on descend de plus de 50px, Afficher si on remonte
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
        <nav className={`navbar ${isVisible ? "" : "navbar-hidden"}`}>
            {/* LEFT: LOGOS */}
            <div className="logo-section">
                <Link to="/">
                    <img src={aaLogo} alt="AA Motors" className="aa-logo" />
                </Link>
            </div>

            {/* CENTER: NAV PILL */}
            <div className="nav-center">
                <div className="nav-pill">
                    <Link to="/">ACCUEIL</Link>
                    <Link to="/motos">ROUTE</Link>
                    <Link to="/location-trips">LOCATION & TRIPS</Link>
                    <Link to="/marine">MARINE</Link>
                    <Link to="/marketplace">MARKETPLACE</Link>
                    <Link to="/about">POLITIQUES DE QUALITÉ</Link>
                </div>

                {/* LIGHT/DARK MODE SWITCH */}
                <div className="ai-agent">
                    <span className="ai-text">{isLightMode ? "Mode Clair" : "Mode Sombre"}</span>
                    <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={isLightMode}
                          onChange={() => setIsLightMode(!isLightMode)} 
                        />
                        <span className="slider">
                            <span className="on-label">ON</span>
                        </span>
                    </label>
                </div>
            </div>

            {/* RIGHT: CAPSULE */}
            <div className="nav-right">
                <div className={`icon-capsule ${showSearch ? 'search-open' : ''}`}>
                    <div ref={searchRef} className="search-wrapper">
                        <div
                            className="nav-icon search-icon"
                            onClick={() => showSearch ? handleSearch() : setShowSearch(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>

                        {showSearch && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Rechercher une moto..."
                                    className="search-input"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleSearchKeyDown}
                                />
                                {suggestions.length > 0 && (
                                    <div className="search-suggestions">
                                        {suggestions.map((v, i) => (
                                            <div
                                                key={i}
                                                className="suggestion-item"
                                                onMouseDown={() => handleSuggestionClick(v)}
                                            >
                                                <span className="sug-name">{v.name}</span>
                                                <span className="sug-cat">{v.category}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <Link to="/login" className="nav-icon user-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </Link>

                    <Link to="/cart" className="nav-icon cart-icon-wrapper">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </Link>

                    {/* Hamburger Button (Mobile Only) */}
                    <div className="nav-icon hamburger-icon" onClick={() => setMenuOpen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </div>
        </nav>

        {/* FULLSCREEN MOBILE MENU */}
        <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
            <div className="mobile-menu-header">
                <img src={aaLogo} alt="AA Motors" className="aa-logo-mobile" />
                <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className="mobile-menu-links">
                <Link to="/" onClick={() => setMenuOpen(false)}>ACCUEIL</Link>
                <Link to="/motos" onClick={() => setMenuOpen(false)}>ROUTE</Link>
                <Link to="/location-trips" onClick={() => setMenuOpen(false)}>LOCATION & TRIPS</Link>
                <Link to="/marine" onClick={() => setMenuOpen(false)}>MARINE</Link>
                <Link to="/marketplace" onClick={() => setMenuOpen(false)}>MARKETPLACE</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>POLITIQUES DE QUALITÉ</Link>
                
                {/* LIGHT/DARK MODE SWITCH MOBILE */}
                <div className="ai-agent-mobile">
                    <span>Thème Visuel</span>
                    <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={isLightMode}
                          onChange={() => setIsLightMode(!isLightMode)}
                        />
                        <span className="slider">
                            <span className="on-label">{isLightMode ? 'CLAIR' : 'SOMBRE'}</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>

        {/* BOTTOM NAVIGATION (MOBILE ONLY) */}
        <div className="bottom-nav">
            <Link to="/" className="bottom-nav-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>Accueil</span>
            </Link>
            <Link to="/motos" className="bottom-nav-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span>Motos</span>
            </Link>
            <Link to="/cart" className="bottom-nav-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span>Panier</span>
            </Link>
            <Link to="/login" className="bottom-nav-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Profil</span>
            </Link>
        </div>
        </>
    );
}

export default Navbar;