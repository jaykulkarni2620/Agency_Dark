import React, { useRef, useEffect, useCallback } from "react";
import "./CylinderCarouselSection.css";

// Default images (use project images; replace with your 1.png–10.png paths if needed)
import projectImg01 from "../../images/project/project-img01.jpg";
import projectImg02 from "../../images/project/project-img02.jpg";
import projectImg03 from "../../images/project/project-img03.jpg";
import projectImg04 from "../../images/project/project-img04.jpg";

const DEFAULT_IMAGES = [
  projectImg01,
  projectImg02,
  projectImg03,
  projectImg04,
];

const CARD_WIDTH = 260;
const GAP = 20;
const COUNT = 20;
const CYLINDER_RADIUS = ((CARD_WIDTH + GAP) * COUNT) / (2 * Math.PI);
const DRAG_FACTOR = 0.2;
const FRICTION = 0.95;

export interface CylinderCarouselSectionProps {
  /** Button label above the title */
  // buttonLabel?: string;
  /** Main heading */
  title?: string;
  /** Subtitle / description */
  subtitle?: string;
  /** Image sources (optional; uses project images by default) */
  images?: string[];
}

const CylinderCarouselSection: React.FC<CylinderCarouselSectionProps> = ({
  // buttonLabel = "",
  title = "",
  subtitle = "",
  images = DEFAULT_IMAGES,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  const anglePerCard = 360 / COUNT;

  const updateCarousel = useCallback(() => {
    const track = trackRef.current;
    if (!track?.children.length) return;

    const currentRotation = currentRotationRef.current;

    Array.from(track.children).forEach((el, index) => {
      if (!(el instanceof HTMLElement)) return;
      const baseAngle = index * anglePerCard;
      const totalAngle = baseAngle + currentRotation;
      el.style.transform = `rotateY(${totalAngle}deg) translateZ(${-CYLINDER_RADIUS}px)`;
    });
  }, [anglePerCard]);

  const runInertia = useCallback(() => {
    const animate = () => {
      if (isDraggingRef.current) return;

      let v = velocityRef.current;
      v *= FRICTION;
      velocityRef.current = v;
      currentRotationRef.current += v;
      updateCarousel();

      if (Math.abs(v) > 0.01) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        animationIdRef.current = null;
      }
    };
    animate();
  }, [updateCarousel]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastXRef.current = e.clientX;
      velocityRef.current = 0;
      if (animationIdRef.current != null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      track.style.cursor = "grabbing";
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - lastXRef.current;
      currentRotationRef.current += delta * DRAG_FACTOR;
      velocityRef.current = delta * DRAG_FACTOR;
      lastXRef.current = e.clientX;
      updateCarousel();
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        track.style.cursor = "grab";
        runInertia();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      lastXRef.current = e.touches[0].clientX;
      velocityRef.current = 0;
      if (animationIdRef.current != null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = e.touches[0].clientX;
      const delta = clientX - lastXRef.current;
      currentRotationRef.current += delta * DRAG_FACTOR;
      velocityRef.current = delta * DRAG_FACTOR;
      lastXRef.current = clientX;
      updateCarousel();
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      runInertia();
    };

    track.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    track.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    updateCarousel();

    return () => {
      track.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      track.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationIdRef.current != null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [updateCarousel, runInertia]);

  return (
    <section className="carousel-3d-section">
      <div className="carousel-header">
        {/* <button type="button" className="carousel-btn">
          {/* {buttonLabel} 
        </button> */}
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <section className="cylinder-carousel-section">
        <div className="cylinder-viewport">
          <div
            className="cylinder-transform-layer"
            id="cylinderTrack"
            ref={trackRef}
            role="list"
            aria-label="3D carousel"
          >
            {Array.from({ length: COUNT }, (_, i) => {
              const imgSrc = images[i % images.length];
              return (
                <div
                  key={i}
                  className="cylinder-item"
                  role="listitem"
                  style={{ transform: `rotateY(${i * anglePerCard}deg) translateZ(${-CYLINDER_RADIUS}px)` }}
                >
                  <img src={imgSrc} alt={`Project ${i + 1}`} />
                  <div className="item-info-overlay">
                    <h3 className="item-heading">Project {i + 1}</h3>
                    <p className="item-subtext">Digital Design</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default CylinderCarouselSection;
