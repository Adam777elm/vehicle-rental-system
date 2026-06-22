import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/Marine.css";
import heroImg from "../assets/MARINE_IMG/marine-hero.png";
import marineVideo from "../assets/MARINE_IMG/hero-video.mp4";
import jetskiImg from "../assets/MARINE_IMG/marine-jetski.png";
import superjetImg from "../assets/MARINE_IMG/marine-superjet.png";
import waveboatImg from "../assets/MARINE_IMG/marine-waveboat.png";
import Superjet3DSection from "../components/Superjet3DSection";

function Marine() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Scroll reveal observer
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

    const video = videoRef.current;

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && video && !video.muted) {
            video.muted = true;
            setIsMuted(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (video) {
      visibilityObserver.observe(video);
    }

    const handleVisibilityChange = () => {
      if (document.hidden && video && !video.muted) {
        video.muted = true;
        setIsMuted(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      if (video) {
        visibilityObserver.unobserve(video);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const categories = [
    {
      id: 1,
      title: "WAVERUNNER",
      subtitle: "Feel the Water",
      image: jetskiImg,
      link: "/marine/waverunner"
    },
    {
      id: 2,
      title: "SUPERJET",
      subtitle: "Stand-Up Racing",
      image: superjetImg,
      link: "/marine/superjet"
    },
    {
      id: 3,
      title: "WAVE BOAT",
      subtitle: "The Jet Boat Revolution",
      image: waveboatImg,
      link: "/marine/waveboat"
    }
  ];

  return (
    <div className="marine-page">
      <div className="marine-red-bar"></div>

      {/* HERO BANNER */}
      <section className="marine-hero-banner reveal">
        <img src={heroImg} alt="Yamaha WaveRunner Marine" className="marine-banner-img" />
        <div className="marine-banner-overlay">
          <h1 className="marine-banner-title">Marine</h1>
          <p className="marine-banner-subtitle-tagline">Choisissez votre sillage</p>
        </div>
      </section>

      {/* FUTURISTIC SEPARATOR */}
      <div className="futuristic-separator">
        <div className="separator-line"></div>
        <div className="separator-diamond"></div>
        <div className="separator-line"></div>
      </div>

      {/* CATEGORIES SECTION GRID */}
      <section className="marine-categories-section">
        <div className="categories-grid-container">
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              className="category-card reveal" 
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.title} className="category-img" />
              </div>
              <div className="category-content">
                <span className="category-tag">YAMAHA MARINE</span>
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

      {/* FUTURISTIC SEPARATOR */}
      <div className="futuristic-separator">
        <div className="separator-line"></div>
        <div className="separator-diamond"></div>
        <div className="separator-line"></div>
      </div>

      {/* Interactive 3D Model Section */}
      <Superjet3DSection />

      {/* FUTURISTIC SEPARATOR */}
      <div className="futuristic-separator">
        <div className="separator-line"></div>
        <div className="separator-diamond"></div>
        <div className="separator-line"></div>
      </div>

      {/* SECONDARY VIDEO SECTION */}
      <section className="marine-video-section">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline 
          className="marine-secondary-video"
        >
          <source src={marineVideo} type="video/mp4" />
        </video>
        <div className="marine-video-overlay"></div>
        <button className="sound-toggle" onClick={toggleMute}>
          {isMuted ? (
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

      {/* FUTURISTIC SEPARATOR */}
      <div className="futuristic-separator">
        <div className="separator-line"></div>
        <div className="separator-diamond"></div>
        <div className="separator-line"></div>
      </div>

      {/* DETAILED FEATURES SECTIONS */}
      <section className="marine-detailed-descriptions">
        {/* ROW 1: WaveRunner (Jet Ski) - Image Left */}
        <div className="marine-featured-row featured-row left reveal">
          <div className="marine-featured-image-box featured-image-box">
            <img src={jetskiImg} alt="Yamaha WaveRunner Jet Ski" />
            <div className="marine-image-overlay-gradient image-overlay-gradient"></div>
          </div>
          <div className="marine-featured-text-box featured-text-box">
            <h2 className="marine-featured-title featured-title">WaveRunner</h2>
            <div className="marine-divider-red divider-red"></div>
            <p className="marine-featured-desc featured-desc">
              Découvrez la quintessence du pilotage sur l'eau avec les Waverunners Yamaha. Moteurs suralimentés, confort exceptionnel et agilité chirurgicale pour dompter chaque vague avec un frisson infini.
            </p>
            <div className="featured-specs">
              <div className="spec-item"><span className="spec-dot"></span> Moteur SVHO suralimenté 1.8L</div>
              <div className="spec-item"><span className="spec-dot"></span> Système RiDE (frein & marche arrière)</div>
              <div className="spec-item"><span className="spec-dot"></span> Écran couleur Connext connecté</div>
              <div className="spec-item"><span className="spec-dot"></span> Coque ultralégère en NanoXcel2</div>
            </div>
          </div>
        </div>

        {/* ROW 2: SuperJet - Image Right */}
        <div className="marine-featured-row featured-row right reveal">
          <div className="marine-featured-image-box featured-image-box">
            <img src={superjetImg} alt="Yamaha SuperJet" />
            <div className="marine-image-overlay-gradient image-overlay-gradient"></div>
          </div>
          <div className="marine-featured-text-box featured-text-box">
            <h2 className="marine-featured-title featured-title">SuperJet</h2>
            <div className="marine-divider-red divider-red"></div>
            <p className="marine-featured-desc featured-desc">
              La légende du jet à bras sublimée. Taillé pour la course et le freestyle, le SuperJet délivre une accélération phénoménale et une légèreté absolue pour vous offrir une liberté d'action hors norme.
            </p>
            <div className="featured-specs">
              <div className="spec-item"><span className="spec-dot"></span> Moteur 4 temps TR-1 à 3 cylindres</div>
              <div className="spec-item"><span className="spec-dot"></span> Colonne de direction réglable</div>
              <div className="spec-item"><span className="spec-dot"></span> Coque large optimisée pour le stand-up</div>
              <div className="spec-item"><span className="spec-dot"></span> Mode L-Mode pour l'apprentissage</div>
            </div>
          </div>
        </div>

        {/* ROW 3: Wave Boat - Image Left */}
        <div className="marine-featured-row featured-row left reveal">
          <div className="marine-featured-image-box featured-image-box">
            <img src={waveboatImg} alt="Yamaha Jet Boat" />
            <div className="marine-image-overlay-gradient image-overlay-gradient"></div>
          </div>
          <div className="marine-featured-text-box featured-text-box">
            <h2 className="marine-featured-title featured-title">Wave Boat</h2>
            <div className="marine-divider-red divider-red"></div>
            <p className="marine-featured-desc featured-desc">
              Le mélange parfait entre luxe, convivialité et adrénaline sportive. Profitez d'un cockpit spacieux et de l'iconique technologie de propulsion Yamaha Jet Drive pour partager la mer autrement.
            </p>
            <div className="featured-specs">
              <div className="spec-item"><span className="spec-dot"></span> Capacité d'accueil jusqu'à 10 personnes</div>
              <div className="spec-item"><span className="spec-dot"></span> Connexion instantanée en 15 secondes</div>
              <div className="spec-item"><span className="spec-dot"></span> Salon de pont convertible en bain de soleil</div>
              <div className="spec-item"><span className="spec-dot"></span> Option arceau de wakeboard & audio premium</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Marine;
