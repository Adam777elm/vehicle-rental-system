import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./CSS/SearchResults.css";

// --- CATALOGUE COMPLET & EXACT de tous les modèles AA Motors ---
const allStaticVehicles = [
    // ROADSTER
    { id: 201, name: "MT-10 SP",  category: "Roadster",      price: "195 000 DH", image: "https://www.ivors.ie/wp-content/uploads/2016/12/2017_yam_mt10dx_eu_bwm2_stu_001_03.jpg", description: "Le summum de l'Hyper Naked. Suspensions semi-actives Öhlins.", path: "/motos/roadster" },
    { id: 202, name: "MT-10",     category: "Roadster",      price: "175 000 DH", image: "https://www.yamaha-motor.com.au/-/media/products/motorcycle/road/maximum-torque/2025/mt10as/product-category-page/2025_mt10_mlnm4_aus_stu_001_750x600.ashx", description: "Puissance Master of Torque. Moteur CP4.", path: "/motos/roadster" },
    { id: 203, name: "MT-09 SP",  category: "Roadster",      price: "135 000 DH", image: "https://danfay.ie/cdn/shop/files/2024-Yamaha-MT09DX-EU-Icon_Performance-360-Degrees-001-03.jpg?v=1706098490&width=1946", description: "L'instinct de défi poussé à l'extrême. Suspensions premium Öhlins.", path: "/motos/roadster" },
    { id: 204, name: "MT-09",     category: "Roadster",      price: "115 000 DH", image: "https://danfay.ie/cdn/shop/files/2024-Yamaha-MT09DX-EU-Icon_Performance-360-Degrees-001-03.jpg?v=1706098490&width=1946", description: "The Dark Side of Japan. Plus légère, plus puissante.", path: "/motos/roadster" },
    { id: 205, name: "MT-07",     category: "Roadster",      price: "85 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/MT700A/2024-Yamaha-MT700A-EU-Storm_Fluo-360-Degrees-001-03.jpg", description: "L'attraction pure. Moteur CP2 au couple généreux.", path: "/motos/roadster" },
    { id: 206, name: "MT-125",    category: "Roadster",      price: "52 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/MT125A/2026-Yamaha-MT125A-EU-Tech_Black-Studio-001-03.jpg", description: "La reine des 125. Moteur haute technologie.", path: "/motos/roadster" },
    // SUPERSPORT
    { id: 101, name: "R1M",       category: "Supersport",    price: "285 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1SPL/2024-Yamaha-YZF1000R1SPL-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg", description: "La machine de piste ultime. Carénage en carbone.", path: "/motos/supersport" },
    { id: 102, name: "R1",        category: "Supersport",    price: "215 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1/2024-Yamaha-YZF1000R1-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "Conçue sans compromis. Moteur crossplane 1000 cm³.", path: "/motos/supersport" },
    { id: 103, name: "R9",        category: "Supersport",    price: "155 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/YZF900R9/2026-Yamaha-YZF900R9-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "Une nouvelle ère de performance. Moteur CP3.", path: "/motos/supersport" },
    { id: 104, name: "R7",        category: "Supersport",    price: "105 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF700R7/2024-Yamaha-YZF700R7-EU-Icon_Blue-Studio-001-03.jpg", description: "Finesse et agilité. Parfait équilibre sport/route.", path: "/motos/supersport" },
    // SPORT TOURING
    { id: 1,   name: "TRACER 9 GT+", category: "Sport Touring", price: "169 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATRDXCS/2025-Yamaha-MT09ATRDXCS-EU-Cobalt_Blue-360-Degrees-001-03.jpg", description: "Le nec plus ultra du Sport Touring. Radar et ACC.", path: "/motos/sport-touring" },
    { id: 5,   name: "TRACER 9 GT",  category: "Sport Touring", price: "155 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATRDXS/2025-Yamaha-MT09ATRDXS-EU-Ceramic_Ice-360-Degrees-001-03_Mobile.jpg", description: "Suspension semi-active KYB et valises rigides.", path: "/motos/sport-touring" },
    { id: 2,   name: "TRACER 9",     category: "Sport Touring", price: "135 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATR/2025-Yamaha-MT09ATR-EU-Redline-360-Degrees-001-03_Mobile.jpg", description: "L'aventure en toute liberté. CP3 890 cm³.", path: "/motos/sport-touring" },
    { id: 3,   name: "TRACER 7 GT",  category: "Sport Touring", price: "105 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/MT07TRGTS/2026-Yamaha-MT07TRGTS-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg", description: "Valises, bulle haute touring et selle confort.", path: "/motos/sport-touring" },
    // SCOOTERS
    { id: 501, name: "TMAX 560 ANNIVERSARY", category: "Scooter", price: "215 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500ASV/2026-Yamaha-XP500ASV-EU-Black_MAX_-360-Degrees-001-03_Mobile.jpg", description: "Édition exclusive Anniversaire.", path: "/motos/scooters" },
    { id: 506, name: "TMAX 560 TECH MAX",    category: "Scooter", price: "165 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/XP500A/2025-Yamaha-XP500A-EU-Icon_Black_-Studio-001-03.jpg", description: "Le summum du confort et de la technologie.", path: "/motos/scooters" },
    { id: 502, name: "TMAX 560",    category: "Scooter", price: "145 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500A/2026-Yamaha-XP500A-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "L'icône du design MAX.", path: "/motos/scooters" },
    { id: 503, name: "XMAX 300",    category: "Scooter", price: "85 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/XMAX300A/2025-Yamaha-XMAX300A-EU-Icon_Black_-360-Degrees-001-03_Mobile.jpg", description: "L'équilibre parfait, urbain et week-end.", path: "/motos/scooters" },
    { id: 504, name: "NMAX 155 TECH", category: "Scooter", price: "52 000 DH", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/G125YMSV/2025-Yamaha-G125YMSV-EU-Ceramic_Grey-360-Degrees-001-03_Mobile.jpg", description: "L'élégance urbaine ultimate.", path: "/motos/scooters" },
    { id: 505, name: "NMAX 125",    category: "Scooter", price: "42 000 DH",  image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/G125YM/2026-Yamaha-G125YM-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg", description: "L'urbain par excellence. Économique et agile.", path: "/motos/scooters" },
];

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const navigate = useNavigate();

    const [dbResults, setDbResults] = useState([]);
    const [loadingDB, setLoadingDB] = useState(true);

    useEffect(() => {
        if (query) {
            API.get(`/vehicles/search?keyword=${query}`)
                .then(res => {
                    setDbResults(res.data);
                    setLoadingDB(false);
                })
                .catch(() => setLoadingDB(false));
        } else {
            setLoadingDB(false);
        }
    }, [query]);

    // Normalize a string: lowercase + remove hyphens/spaces for flexible matching
    const normalize = (str) => str.toLowerCase().replace(/[-\s]/g, "");

    const normalizedQuery = normalize(query);

    // Filter static vehicles for instant results
    const staticResults = allStaticVehicles.filter(v =>
        normalize(v.name).includes(normalizedQuery) ||
        normalize(v.category).includes(normalizedQuery) ||
        normalize(v.description).includes(normalizedQuery) ||
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.category.toLowerCase().includes(query.toLowerCase())
    );

    const totalCount = staticResults.length + dbResults.length;

    return (
        <div className="search-page">
            <div className="search-header">
                <div className="search-header-content">
                    <h1>
                        Résultats pour <span className="search-query">"{query}"</span>
                    </h1>
                    <p>{totalCount} véhicule{totalCount > 1 ? "s" : ""} trouvé{totalCount > 1 ? "s" : ""}</p>
                </div>
            </div>

            <div className="search-container">
                {totalCount === 0 ? (
                    <div className="no-results">
                        <div className="no-results-icon">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <h2>Aucun résultat pour "{query}"</h2>
                        <p>Essayez d'autres termes : MT-09, Scooter, Roadster...</p>
                        <button onClick={() => navigate("/motos")} className="browse-btn">
                            PARCOURIR LE CATALOGUE
                        </button>
                    </div>
                ) : (
                    <div className="search-grid">
                        {staticResults.map(bike => (
                            <div
                                key={bike.id}
                                className="search-card"
                                onClick={() => navigate(`/moto/${bike.id}`, { state: { bike } })}
                            >
                                <div className="search-card-img">
                                    <span className="cat-badge">{bike.category}</span>
                                    <img
                                        src={bike.image}
                                        alt={bike.name}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                                <div className="search-card-body">
                                    <h3 className="search-card-name">{bike.name}</h3>
                                    <p className="search-card-desc">{bike.description}</p>
                                    <div className="search-card-footer">
                                        <span className="search-card-price">{bike.price}</span>
                                        <button className="details-btn">VOIR →</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!loadingDB && dbResults.map(bike => (
                            <div key={bike._id} className="search-card" onClick={() => navigate(`/moto/${bike._id}`)}>
                                <div className="search-card-img">
                                    <span className="cat-badge">{bike.category}</span>
                                    <img
                                        src={bike.image?.startsWith("http") ? bike.image : `http://${window.location.hostname}:5000/uploads/${bike.image}`}
                                        alt={bike.name}
                                    />
                                </div>
                                <div className="search-card-body">
                                    <h3 className="search-card-name">{bike.name}</h3>
                                    <p className="search-card-desc">{bike.description}</p>
                                    <div className="search-card-footer">
                                        <span className="search-card-price">{bike.price} DH</span>
                                        <button className="details-btn">VOIR →</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
