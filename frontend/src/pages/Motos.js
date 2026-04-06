import React from "react";
import "./Motos.css";

// Hero Video from MOTO_IMG
import motoHeroVid from "../assets/MOTO_IMG/MotoHeroVid.mp4";

// Category Images from MOTO_IMG
import supersportImg from "../assets/MOTO_IMG/supersport.png";
import roadsterImg from "../assets/MOTO_IMG/roadster.png";
import sporttouringImg from "../assets/MOTO_IMG/sporttouring.png";
import offroadImg from "../assets/MOTO_IMG/offroad.png";

function Motos() {
  const categories = [
    {
      id: 1,
      title: "SUPERSPORT",
      subtitle: "Race-born performance",
      image: supersportImg,
      link: "/motos/supersport"
    },
    {
      id: 2,
      title: "ROADSTER",
      subtitle: "The Dark Side of Japan",
      image: roadsterImg,
      link: "/motos/roadster"
    },
    {
      id: 3,
      title: "SPORT TOURING",
      subtitle: "Roads of Life",
      image: sporttouringImg,
      link: "/motos/sport-touring"
    },
    {
      id: 4,
      title: "OFF ROAD",
      subtitle: "Beyond the Horizon",
      image: offroadImg,
      link: "/motos/off-road"
    }
  ];

  return (
    <div className="motos-page">
      {/* HERO SECTION: VIDEO HEADER */}
      <section className="motos-hero">
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={motoHeroVid} type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <h1 className="hero-title">GAMME MOTOS</h1>
          <p className="hero-subtitle">Choisissez votre terrain de jeu</p>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="motos-categories-section">
        <div className="categories-grid-container">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.title} className="category-img" />
              </div>
              <div className="category-content">
                <span className="category-tag">YAMAHA RANGE</span>
                <h2 className="category-title">{cat.title}</h2>
                <p className="category-desc">{cat.subtitle}</p>
                <button className="category-btn">DÉCOUVRIR</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Motos;
