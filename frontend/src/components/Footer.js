import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import aaLogo from "../assets/HOME_IMG/Logo-2.png";

function Footer() {
    return (
        <footer className="footer">
            {/* Decorative top glow line */}
            <div className="footer-glow-line"></div>

            <div className="footer-content">
                {/* COLUMN 1: BRAND */}
                <div className="footer-col footer-brand">
                    <Link to="/">
                        <img src={aaLogo} alt="AA Motors" className="footer-logo" />
                    </Link>
                    <p className="footer-tagline">
                        <span className="tagline-yamaha">YAMAHA</span>
                        <span className="tagline-revs">Revs Your Heart</span>
                    </p>

                    <div className="footer-contacts">
                        <div className="contact-item">
                            <span className="contact-icon">📍</span>
                            <div>
                                <span className="contact-label">Showroom Ain Diab Casablanca</span>
                                <span className="contact-numbers">05 22 04 06 50 / 06 56 25 25 25</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: INFORMATIONS */}
                <div className="footer-col">
                    <h4 className="footer-heading">Informations</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">À Propos</Link></li>
                        <li>
                            <a href="mailto:contact@aamotors.ma" rel="noopener noreferrer">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* COLUMN 3: PRODUITS */}
                <div className="footer-col">
                    <h4 className="footer-heading">Produits</h4>

                    <div className="footer-subcategory">
                        <span className="subcategory-label">Route</span>
                        <ul className="footer-links">
                            <li><Link to="/motos">Motos</Link></li>
                            <li><Link to="/motos/scooters">Scooters</Link></li>
                        </ul>
                    </div>

                    <div className="footer-subcategory">
                        <span className="subcategory-label">Tout-terrain</span>
                        <ul className="footer-links">
                            <li><Link to="/motos/off-road">Motos Off-Road</Link></li>
                            <li><a href="#">Quads</a></li>
                        </ul>
                    </div>

                    <div className="footer-subcategory">
                        <span className="subcategory-label">Marine</span>
                        <ul className="footer-links">
                            <li><Link to="/marine">Waverunner</Link></li>
                            <li><Link to="/marine/waveboat">Yamaha Boats</Link></li>
                        </ul>
                    </div>
                </div>

                {/* COLUMN 4: CONDITIONS GÉNÉRALES */}
                <div className="footer-col">
                    <h4 className="footer-heading">Conditions Générales</h4>
                    <ul className="footer-links" style={{ marginBottom: '25px' }}>
                        <li><Link to="/conditions-vente">Conditions de Vente</Link></li>
                        <li><Link to="/conditions-garantie">Conditions de Garantie</Link></li>
                        <li><Link to="/service-apres-vente">Service Après-Vente</Link></li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="footer-bottom">
                <p>© 2024 AA Motors - Tous droits réservés</p>
            </div>
        </footer>
    );
}

export default Footer;
