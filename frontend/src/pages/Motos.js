import React, { useEffect } from "react";
import "./Motos.css";

// Hero Video from MOTO_IMG
import motoHeroVid from "../assets/MOTO_IMG/MotoHeroVid.mp4";

// Category Images from MOTO_IMG
import supersportImg from "../assets/MOTO_IMG/supersport.png";
import roadsterImg from "../assets/MOTO_IMG/roadster.png";
import sporttouringImg from "../assets/MOTO_IMG/sporttouring.png";
import offroadImg from "../assets/MOTO_IMG/offroad.png";

// Background Images for descriptions
import bgSupersport from "../assets/MOTO_IMG/bg-supersport.jpg";
import bgRoadster from "../assets/MOTO_IMG/bg-roadster.jpg";
import bgSportTouring from "../assets/MOTO_IMG/bg-sporttouring.jpg";
import bgOffroad from "../assets/MOTO_IMG/bg-offroad.jpg";

function Motos() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  const fullDescriptions = [
    {
      id: "ss",
      title: "L'Univers Supersport",
      desc: "Développées sur les circuits les plus prestigieux du monde, nos Supersport YZF-R offrent des performances aérodynamiques sans compromis et une précision chirurgicale en virage.",
      bg: bgSupersport,
      side: "left"
    },
    {
      id: "rd",
      title: "Le Côté Sombre : Roadster",
      desc: "Brutes, agressives et dépouillées du superflu. La gamme MT combine un couple foudroyant à un style urbain radical pour dompter la jungle de béton.",
      bg: bgRoadster,
      side: "right"
    },
    {
      id: "st",
      title: "L'Horizon Sport Touring",
      desc: "Parce que le voyage compte autant que la destination. Alliez le confort d'un voyage luxueux à la sportivité légendaire de nos moteurs pour des aventures sans fin.",
      bg: bgSportTouring,
      side: "left"
    },
    {
      id: "or",
      title: "Dominez l'Inconnu : Off Road",
      desc: "Du sable saharien aux sentiers de l'Atlas. Nos motos Ténéré sont forgées pour l'aventure pure, offrant une endurance et une fiabilité à toute épreuve.",
      bg: bgOffroad,
      side: "right"
    }
  ];

  return (
    <div className="motos-page">
      <div className="motos-top-bar"></div>

      <section className="motos-hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={motoHeroVid} type="video/mp4" />
        </video>
        <div className="hero-overlay reveal">
          <h1 className="hero-title">GAMME MOTOS</h1>
          <p className="hero-subtitle">Choisissez votre terrain de jeu</p>
        </div>
      </section>

      <section className="motos-categories-section">
        <div className="categories-grid-container">
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              className="category-card reveal" 
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
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

      {/* FULL WIDTH DESCRIPTIONS SECTION */}
      <section className="motos-detailed-descriptions">
        {fullDescriptions.map((item) => (
          <div key={item.id} className={`featured-row ${item.side}`}>
            <div className="featured-image-box reveal">
              <img src={item.bg} alt={item.title} />
              <div className="image-overlay-gradient"></div>
            </div>
            <div className="featured-text-box reveal">
              <h3 className="featured-title">{item.title}</h3>
              <div className="divider-red"></div>
              <p className="featured-desc">{item.desc}</p>
              <button className="featured-explore-btn">EN SAVOIR PLUS</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Motos;
