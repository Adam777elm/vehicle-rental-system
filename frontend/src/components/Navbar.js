import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import yamahaLogo from "../assets/HOME_IMG/Logo-1.png";
import aaLogo from "../assets/HOME_IMG/Logo-2.png";

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
        <nav className={`navbar ${isVisible ? "" : "navbar-hidden"}`}>
            {/* LEFT: LOGOS */}
            <div className="logo-section">
                <img src={yamahaLogo} alt="Yamaha" className="yamaha-logo" />
                <img src={aaLogo} alt="AA Motors" className="aa-logo" />
            </div>

            {/* CENTER: NAV PILL */}
            <div className="nav-center">
                <div className="nav-pill">
                    <Link to="/">ACCUEIL</Link>
                    <Link to="/motos">MOTOS</Link>
                    <Link to="/location-trips">LOCATION & TRIPS</Link>
                    <Link to="/marine">MARINE</Link>
                    <Link to="/equipement">EQUIPEMENT</Link>
                    <Link to="/about">À PROPOS</Link>
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
                </div>
            </div>

        </nav>
    );
}

export default Navbar;