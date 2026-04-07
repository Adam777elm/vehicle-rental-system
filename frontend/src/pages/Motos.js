import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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

// Panoramic Banner
import lineupBanner from "../assets/MOTO_IMG/moto-lineup.jpg";

function Motos() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Scroll reveal observer (previous logic)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Sound scroll logic (like Home.js)
    const handleScroll = () => {
      if (videoRef.current) {
        const videoHeight = videoRef.current.offsetHeight;
        if (window.scrollY > videoHeight * 0.9 && !videoRef.current.muted) {
          videoRef.current.muted = true;
          setMuted(true);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.muted) {
        videoRef.current.muted = true;
        setMuted(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };


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

      {/* PANORAMIC LINEUP BANNER BECOMES MAIN HERO */}
      <section className="motos-lineup-banner reveal" style={{ position: 'relative' }}>
        <img src={lineupBanner} alt="Gamme Yamaha complète" className="lineup-banner-img" />
        <div className="lineup-banner-overlay"></div>
        
        <div className="hero-overlay reveal" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, width: '100%' }}>
          <h1 className="hero-title">GAMME MOTOS</h1>
          <p className="hero-subtitle">Choisissez votre terrain de jeu</p>
        </div>
      </section>

      {/* SEPARATEUR FUTURISTE */}
      <div className="futuristic-separator">
        <div className="separator-line"></div>
        <div className="separator-diamond"></div>
        <div className="separator-line"></div>
      </div>

      {/* VIDEO BECOMES SECONDARY BANNER */}
      <section className="motos-hero secondary-video">
        <video 
          ref={videoRef}
          className="hero-video" 
          autoPlay 
          muted={muted} 
          loop 
          playsInline
        >
          <source src={motoHeroVid} type="video/mp4" />
        </video>

        {/* SOUND TOGGLE */}
        <button className="sound-toggle" onClick={toggleSound}>
          {muted ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M23 9l-6 6" /><path d="M17 9l6 6" /></svg>
              <span>SOUND OFF</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              <span>SOUND ON</span>
            </>
          )}
        </button>
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
                <Link to={cat.link}>
                  <button className="category-btn">DÉCOUVRIR</button>
                </Link>
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
