import React, { useState, useRef, useEffect } from "react";
import "./Marine.css";
import heroImg from "../assets/MARINE_IMG/marine-hero.jpg";
import marineVideo from "../assets/MARINE_IMG/hero-video.mp4";
import jetskiImg from "../assets/MARINE_IMG/marine-jetski.jpg";
import superjetImg from "../assets/MARINE_IMG/marine-superjet.jpg";
import waveboatImg from "../assets/MARINE_IMG/marine-waveboat.jpg";

function Marine() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la vidéo n'est plus visible (ex: scroll haut ou bas)
          if (!entry.isIntersecting && videoRef.current && !videoRef.current.muted) {
            videoRef.current.muted = true;
            setIsMuted(true);
          }
        });
      },
      { threshold: 0.1 } // Déclenche dès que - de 10% de la vidéo est visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    const handleVisibilityChange = () => {
      // Couper le son si on change d'onglet
      if (document.hidden && videoRef.current && !videoRef.current.muted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
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

  return (
    <div className="marine-page">
      <div className="marine-red-bar"></div>

      <section className="marine-hero-banner">
        <img src={heroImg} alt="Yamaha WaveRunner Marine" className="marine-banner-img" />
        <div className="marine-banner-overlay">
          <h1 className="marine-banner-title">Marine</h1>
        </div>
      </section>

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

      {/* DETAILED FEATURES SECTIONS */}
      <section className="marine-detailed-descriptions">
        {/* ROW 1: WaveRunner (Jet Ski) - Image Left */}
        <div className="marine-featured-row">
          <div className="marine-featured-image-box">
            <img src={jetskiImg} alt="Yamaha WaveRunner Jet Ski" />
            <div className="marine-image-overlay-gradient"></div>
          </div>
          <div className="marine-featured-text-box">
            <h2 className="marine-featured-title">WaveRunner</h2>
            <div className="marine-divider-red"></div>
            <p className="marine-featured-desc">
              Découvrez la quintessence du pilotage sur l'eau avec les Waverunners Yamaha. Moteurs suralimentés, confort exceptionnel et agilité chirurgicale pour dompter chaque vague avec un frisson infini.
            </p>
            <button className="marine-featured-explore-btn">DÉCOUVRIR</button>
          </div>
        </div>

        {/* ROW 2: SuperJet - Image Right */}
        <div className="marine-featured-row marine-right">
          <div className="marine-featured-image-box">
            <img src={superjetImg} alt="Yamaha SuperJet" />
            <div className="marine-image-overlay-gradient"></div>
          </div>
          <div className="marine-featured-text-box">
            <h2 className="marine-featured-title">SuperJet</h2>
            <div className="marine-divider-red"></div>
            <p className="marine-featured-desc">
              La légende du jet à bras sublimée. Taillé pour la course et le freestyle, le SuperJet délivre une accélération phénoménale et une légèreté absolue pour vous offrir une liberté d'action hors norme.
            </p>
            <button className="marine-featured-explore-btn">DÉCOUVRIR</button>
          </div>
        </div>

        {/* ROW 3: Wave Boat - Image Left */}
        <div className="marine-featured-row">
          <div className="marine-featured-image-box">
            <img src={waveboatImg} alt="Yamaha Jet Boat" />
            <div className="marine-image-overlay-gradient"></div>
          </div>
          <div className="marine-featured-text-box">
            <h2 className="marine-featured-title">Wave Boat</h2>
            <div className="marine-divider-red"></div>
            <p className="marine-featured-desc">
              Le mélange parfait entre luxe, convivialité et adrénaline sportive. Profitez d'un cockpit spacieux et de l'iconique technologie de propulsion Yamaha Jet Drive pour partager la mer autrement.
            </p>
            <button className="marine-featured-explore-btn">DÉCOUVRIR</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Marine;
