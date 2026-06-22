import React, { useState, useRef, useEffect } from "react";
import "./CSS/Sketchfab3DSection.css";

/**
 * Sketchfab3DSection
 * ──────────────────
 * Lazy-loads the Sketchfab iframe only once the section scrolls into view
 * (IntersectionObserver) so the initial page load stays fast.
 *
 * Accessibility
 * - Section has role="region" + aria-label for screen readers
 * - iframe has a meaningful <title> attribute (set via HTML attribute)
 * - CTA button is a native <a> with descriptive aria-label
 *
 * SEO
 * - Uses semantic HTML: <section>, <h2>, <p>
 * - Structured so a single <h2> is the primary heading of this section
 */
function Sketchfab3DSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Lazy-load: activate iframe only when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sketchfab-section"
      aria-label="Interactive 3D motorcycle viewer"
      role="region"
    >
      {/* Decorative background orbs */}
      <div className="sfb-orb sfb-orb--red" aria-hidden="true" />
      <div className="sfb-orb sfb-orb--blue" aria-hidden="true" />

      <div className="sfb-inner">
        {/* ── Text header ── */}
        <header className="sfb-header">
          <span className="sfb-eyebrow" aria-hidden="true">
            MOTEUR LÉGENDAIRE
          </span>
          <h2 className="sfb-title">Le plus puissant moteur de chez Yamaha</h2>
          <p className="sfb-subtitle">
            Explorez la Yamaha YZF-R1 en 3D interactif. Pivotez, zoomez et observez chaque détail mécanique.
          </p>
        </header>

        {/* ── 3D viewer container ── */}
        <div className="sfb-viewer-wrap">
          {/* Loading skeleton shown until iframe fires onLoad */}
          {!iframeLoaded && (
            <div className="sfb-skeleton" aria-hidden="true">
              <div className="sfb-skeleton-pulse" />
              <div className="sfb-skeleton-label">
                <span className="sfb-skeleton-icon">
                  {/* Cube icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </span>
                <span>Chargement du modèle 3D…</span>
              </div>
            </div>
          )}

          {/* Sketchfab iframe — rendered only when section is visible */}
          {isVisible && (
            <div
              className="sketchfab-embed-wrapper sfb-embed"
              style={{ opacity: iframeLoaded ? 1 : 0 }}
            >
              <iframe
                title="Yamaha R1 2017"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking=""
                execution-while-out-of-viewport=""
                execution-while-not-rendered=""
                web-share=""
                src="https://sketchfab.com/models/db9b22c5b6c2462b902835275131f4af/embed"
                onLoad={() => setIframeLoaded(true)}
                className="sfb-iframe"
                loading="lazy"
                aria-label="Interactive 3D model of Yamaha R1 2017 – use mouse or touch to rotate and zoom"
              />

              {/* Attribution – kept per Sketchfab embed requirements */}
              <p className="sfb-attribution">
                <a
                  href="https://sketchfab.com/3d-models/yamaha-r1-2017-db9b22c5b6c2462b902835275131f4af?utm_medium=embed&utm_campaign=share-popup&utm_content=db9b22c5b6c2462b902835275131f4af"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="sfb-attr-link"
                >
                  Yamaha R1 2017
                </a>{" "}
                by{" "}
                <a
                  href="https://sketchfab.com/Rievera?utm_medium=embed&utm_campaign=share-popup&utm_content=db9b22c5b6c2462b902835275131f4af"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="sfb-attr-link"
                >
                  RieveraDesign
                </a>{" "}
                on{" "}
                <a
                  href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=db9b22c5b6c2462b902835275131f4af"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="sfb-attr-link"
                >
                  Sketchfab
                </a>
              </p>
            </div>
          )}

          {/* Interaction hint badges */}
          <div className="sfb-hints" aria-hidden="true">
            <span className="sfb-hint-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V7a5 5 0 0 1 10 0v4"/><rect x="3" y="11" width="18" height="11" rx="2"/></svg>
              Pivoter
            </span>
            <span className="sfb-hint-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              Zoomer
            </span>
            <span className="sfb-hint-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              Plein écran
            </span>
          </div>
        </div>

        {/* ── CTA button ── */}
        <div className="sfb-cta-wrap">
          <a
            href="/moto/101"
            className="sfb-cta-btn"
            aria-label="Découvrir la Yamaha R1M"
          >
            <span>Découvrir la R1M</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Sketchfab3DSection;
