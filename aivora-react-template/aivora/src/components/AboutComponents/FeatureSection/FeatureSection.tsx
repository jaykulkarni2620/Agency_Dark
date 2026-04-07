import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";


// Import your background + icons
import bgImage from "../../../images/bg/feature-bg.jpg";
import icon01 from "../../../images/icon/fea-small-icon01.svg";
import icon04 from "../../../images/icon/fea-small-icon04.svg";
import icon02 from "../../../images/icon/fea-small-icon02.svg";
import icon06 from "../../../images/icon/fea-small-icon06.svg";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const FeatureSection: React.FC = () => {

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Reset background
    gsap.set(el, {
      backgroundPosition: "center 0px",
      backgroundSize: "cover",
    });

    // GSAP Parallax Effect
    gsap.to(el, {
      backgroundPositionY: "200px", // how much parallax to move
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",   // start when section enters screen
        end: "bottom top",     // end when section leaves screen
        scrub: 1,              // smooth parallax scroll
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="feature-section parallax-section"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >

<div className="container">
  <div className="row">
    <div className="col-lg-8">
      <div className="xb-feature-content">
        
        <div className="sec-title sec-title-center fea-sec-title mb-35">
          <span className="sub-title mb-20">WHO WE ARE</span>
          <h2 className="title title-line_height">
            Your Growth Partner in Digital
          </h2>
        </div>

        {/* Removed boxes and added content */}
        <div className="row mt-none-30">
          <div className="col-lg-12 mt-30">
            
            <p className="mb-30">
            Minexx is a digital marketing agency in Virar that helps businesses grow with SEO, high-converting websites, and performance-driven marketing strategies. Unlike most agencies, we don't take on projects we can't deliver because your time, budget, and trust matter more than a quick deal.
<br /><br />
            Everything we build has one purpose behind it your growth. We don't just deliver services and disappear. We work as your growth partner, staying accountable, communicating clearly, and pushing until the numbers actually move.


            </p>

            <div className="hero-btn scale-animation wow">
                <Link className="thm-btn agency-btn" to="/about">
                  <span className="text"> Know More →</span>
                  <span className="arrow">
                    <span className="arrow-icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="5.06592"
                          y="19.9785"
                          width="20.5712"
                          height="2.61221"
                          transform="rotate(-40.2798 5.06592 19.9785)"
                          fill="white"
                        />
                        <rect
                          x="7.97095"
                          y="7.24463"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 7.97095 7.24463)"
                          fill="white"
                        />
                        <rect
                          x="11.6523"
                          y="7.54834"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 11.6523 7.54834)"
                          fill="white"
                        />
                        <rect
                          x="15.334"
                          y="7.85205"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 15.334 7.85205)"
                          fill="white"
                        />
                        <rect
                          x="18.7119"
                          y="11.8374"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.7119 11.8374)"
                          fill="white"
                        />
                        <rect
                          x="18.4084"
                          y="15.52"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.4084 15.52)"
                          fill="white"
                        />
                        <rect
                          x="18.104"
                          y="19.2012"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.104 19.2012)"
                          fill="white"
                        />
                      </svg>
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="5.06592"
                          y="19.9785"
                          width="20.5712"
                          height="2.61221"
                          transform="rotate(-40.2798 5.06592 19.9785)"
                          fill="white"
                        />
                        <rect
                          x="7.97095"
                          y="7.24463"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 7.97095 7.24463)"
                          fill="white"
                        />
                        <rect
                          x="11.6523"
                          y="7.54834"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 11.6523 7.54834)"
                          fill="white"
                        />
                        <rect
                          x="15.334"
                          y="7.85205"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 15.334 7.85205)"
                          fill="white"
                        />
                        <rect
                          x="18.7119"
                          y="11.8374"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.7119 11.8374)"
                          fill="white"
                        />
                        <rect
                          x="18.4084"
                          y="15.52"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.4084 15.52)"
                          fill="white"
                        />
                        <rect
                          x="18.104"
                          y="19.2012"
                          width="2.61221"
                          height="2.61221"
                          transform="rotate(-40.2798 18.104 19.2012)"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</div>
      {/* <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="xb-feature-content">
              <div className="sec-title sec-title-center fea-sec-title mb-35">
                <span className="sub-title mb-20">WHO WE ARE</span>
                <h2 className="title title-line_height">
                  Why our services are better than others?
                </h2>
              </div>

              <div className="row mt-none-30"> */}

                {/* Item 1 
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon01} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        Secure, ethical & <br /> scalable AI
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Item 2 
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2 xb-border">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon04} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        Expert team of AI <br /> specialists
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Item 3 
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon02} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        Custom-built <br /> solutions that fit you
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Item 4 
                <div className="col-lg-6 col-md-6 mt-30">
                  <div className="xb-feature-item xb-feature-item2 xb-border">
                    <div className="xb-item--inner xb-border">
                      <span className="xb-item--icon">
                        <img src={icon06} alt="icon" />
                      </span>
                      <h2 className="xb-item--title">
                        Client-centered, <br /> business-focused
                      </h2>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div> */}
    </section>
  );
};

export default FeatureSection;
