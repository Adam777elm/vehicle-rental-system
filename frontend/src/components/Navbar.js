import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import aaLogo from "../assets/HOME_IMG/Logo-2.png";

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <Link to="/equipement">EQUIPEMENT</Link>
                    <Link to="/about">POLITIQUES DE QUALITÉ</Link>
                </div>

                {/* AI AGENT SWITCH */}
                <div className="ai-agent">
                    <span className="ai-text">Ai Agent</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider">
                            <span className="on-label">ON</span>
                        </span>
                    </label>
                </div>
            </div>

            {/* RIGHT: CAPSULE */}
            <div className="nav-right">
                <div className={`icon-capsule ${showSearch ? 'search-open' : ''}`}>
                    <div
                        className="nav-icon search-icon"
                        onClick={() => setShowSearch(!showSearch)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>

                    {showSearch && (
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            autoFocus
                            onBlur={() => setShowSearch(false)}
                        />
                    )}

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
                <Link to="/equipement" onClick={() => setMenuOpen(false)}>EQUIPEMENT</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>POLITIQUES DE QUALITÉ</Link>
                
                {/* AI AGENT SWITCH MOBILE */}
                <div className="ai-agent-mobile">
                    <span>Ai Agent Mode</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider">
                            <span className="on-label">ON</span>
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