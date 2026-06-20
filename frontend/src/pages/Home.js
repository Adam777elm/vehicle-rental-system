import React, { useState, useRef, useEffect } from "react";
import "./CSS/Home.css";
import motoVideo from "../assets/HOME_IMG/MotoVid.mp4";
import heroBanner from "../assets/HOME_IMG/hero_banner.png";

import motoImg from "../assets/HOME_IMG/R1-1.jpg";
import locaImg from "../assets/HOME_IMG/Loca3.jpg";
import marineImg from "../assets/HOME_IMG/JetSki-1.jpg";
import equipImg from "../assets/HOME_IMG/Equip-1.avif";

function Home() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Couper le son si on a défilé 90% de la vidéo
      if (videoRef.current) {
        const videoHeight = videoRef.current.offsetHeight;
        const videoTop = videoRef.current.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > (videoTop + videoHeight * 0.9) && !videoRef.current.muted) {
          videoRef.current.muted = true;
          setMuted(true);
        }
      }

      // Déclencher l'animation des stats au scroll
      const statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          setAnimateStats(true);
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

    // Initial check in case stats section is already visible
    handleScroll();

    return () => {
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
      title: "Motos",
      subtitle: "REVS YOUR HEART",
      image: motoImg,
      link: "/motos"
    },
    {
      id: 2,
      title: "Location&Trips",
      subtitle: "DISCOVER FREEDOM",
      image: locaImg,
      link: "/location-trips"
    },
    {
      id: 3,
      title: "Marine",
      subtitle: "FEEL THE WATER",
      image: marineImg,
      link: "/marine"
    },
    {
      id: 4,
      title: "Marketplace",
      subtitle: "BUY & SELL BIKES",
      image: equipImg,
      link: "/marketplace"
    }
  ];

  return (
    <div className="home-container">
      {/* 1. HERO SECTION WITH IMAGE DESIGN */}
      <section className="hero-image-section" style={{ backgroundImage: `url(${heroBanner})` }}>
        <div className="hero-image-overlay">
          <div className="hero-image-content">
            <span className="hero-badge">PREMIUM VEHICLE RENTAL & MARKETPLACE</span>
            <h1 className="hero-main-title">
              THE NEXT GENERATION <br />
              <span className="highlight-text">OF ADVENTURE</span>
            </h1>
            <p className="hero-description">
              Experience the thrill of high-performance motorcycles, marine sports, and customized road trips. Rent or buy your dream machine today.
            </p>
            <div className="hero-cta-buttons">
              <a href="/motos" className="btn-primary">Explore Fleet</a>
              <a href="/location-trips" className="btn-secondary">Plan a Trip</a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-subtitle">OUR CATEGORIES</span>
          <h2 className="section-title">CHOOSE YOUR PASSION</h2>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <a key={cat.id} href={cat.link} className="category-box">
              <img src={cat.image} alt={cat.title} className="category-image" />
              <div className="category-overlay">
                <span className="category-subtitle">{cat.subtitle}</span>
                <h2 className="category-title">{cat.title}</h2>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 3. VIDEO SECTION */}
      <section className="video-section">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="home-video"
            autoPlay
            loop
            muted={muted}
            playsInline
          >
            <source src={motoVideo} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
          <div className="video-content-overlay">
            <div className="video-text-content">
              <span className="video-badge">FEEL THE POWER</span>
              <h2>REACTION TO MOTION</h2>
              <p>Unleash the performance and technology built into every vehicle we offer.</p>
            </div>
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
          </div>
        </div>
      </section>

      {/* 4. STATISTICS SECTION WITH GRAPHS */}
      <section className={`stats-section ${animateStats ? "animated" : ""}`}>
        <div className="section-header">
          <span className="section-subtitle">LIVE METRICS</span>
          <h2 className="section-title">PERFORMANCE STATS</h2>
        </div>
        <div className="stats-container">
          <div className="stats-grid">
            {/* Stat Card 1: Rentals completed */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">12.5k+</span>
                <span className="stat-label">Rentals Completed</span>
              </div>
              {/* Graphic representation: Bar Chart */}
              <div className="stat-graph-container">
                <div className="bar-chart">
                  <div className="chart-bar" style={{ height: "40%" }}></div>
                  <div className="chart-bar" style={{ height: "55%" }}></div>
                  <div className="chart-bar" style={{ height: "70%" }}></div>
                  <div className="chart-bar" style={{ height: "85%" }}></div>
                  <div className="chart-bar" style={{ height: "100%" }}></div>
                </div>
              </div>
            </div>

            {/* Stat Card 2: Satisfaction Rate */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">98.4%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
              {/* Graphic representation: Radial Circular Graph */}
              <div className="stat-graph-container radial">
                <svg className="radial-svg" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle-progress" strokeDasharray="98, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>

            {/* Stat Card 3: Active Fleet size */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M21 12H3M12 3v18" /></svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">640+</span>
                <span className="stat-label">Vehicles in Fleet</span>
              </div>
              {/* Graphic representation: Area Peak Line */}
              <div className="stat-graph-container line">
                <svg className="line-svg" viewBox="0 0 100 40">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--yamaha-blue)" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="var(--yamaha-blue)" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path className="line-bg" d="M0,40 L10,32 L30,35 L50,15 L70,25 L90,5 L100,10 L100,40 Z" />
                  <path className="line-stroke" d="M0,40 L10,32 L30,35 L50,15 L70,25 L90,5 L100,10" />
                </svg>
              </div>
            </div>

            {/* Stat Card 4: Top Destinations */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">45+</span>
                <span className="stat-label">Guided Destinations</span>
              </div>
              {/* Graphic representation: Target Circles */}
              <div className="stat-graph-container target">
                <div className="target-ring ring-1"></div>
                <div className="target-ring ring-2"></div>
                <div className="target-ring ring-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;