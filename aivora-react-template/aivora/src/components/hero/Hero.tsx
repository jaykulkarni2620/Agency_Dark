import React from "react";
import { Link } from "react-router-dom";

// Image imports (using your provided path)
import heroBg from "../../images/bg/hero_bg.png";
import heroIcon from "../../images/icon/animated-gif02.gif";
import heroIcon2 from "../../images/icon/Girl_lap.png";
import featureIcon1 from "../../images/icon/feature-icon01.svg";
import featureIcon2 from "../../images/icon/feature-icon02.svg";
import featureIcon3 from "../../images/icon/feature-icon03.svg";

const HeroSection: React.FC = () => {
  return (
    <section
      className="hero hero-style pos-rel bg_img"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="container">
        <div className="row">
          {/* ---------- Left Content ---------- */}
          <div className="col-lg-9 col-md-9">
            <div className="hero-content pt-4">
              <h2 className="title scale-animation wow">
              We Build Brands That Mean Business
              </h2>
              
              <p className="sub-title scale-animation wow">
                Minexx is a results-driven digital agency helping businesses grow online through sharp strategy, bold creative, and marketing that actually works.
              </p>
              <div className="hero-btn scale-animation wow">
                <Link className="thm-btn agency-btn" to="/contact">
                  <span className="text"> Let's Build Together →</span>
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

          {/* ---------- Right Icon ---------- */}
          <div className="col-lg-3 col-md-3">
            <div
              className="hero-icon wow zoomIn"
              data-wow-delay="700ms"
              data-wow-duration="800ms"
            >
              <img src={heroIcon2} alt="Hero icon" />
            </div>
          </div>
        </div>

        {/* ---------- Features ---------- */}
        <div className="row mt-35">
          <div className="col-lg-4 col-md-6 mt-30">
            <div
              className="xb-feature-item wow fadeInUp"
              data-wow-delay="700ms"
              data-wow-duration="600ms"
            >
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon1} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">We Say No To Projects We Can't Deliver</h2>
                  <p className="xb-item--content">
                  Honest from day one. If it's not the right fit, we'll tell you — because your time and money matter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-30">
            <div
              className="xb-feature-item wow fadeInUp"
              data-wow-delay="800ms"
              data-wow-duration="600ms"
            >
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon2} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">Our Work Has To Make You Money</h2>
                  <p className="xb-item--content">
                  Pretty websites that don't bring business are useless. Everything we build has a purpose behind it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-30">
            <div
              className="xb-feature-item wow fadeInUp"
              data-wow-delay="900ms"
              data-wow-duration="600ms"
            >
              <div className="xb-item--inner xb-border">
                <span className="xb-item--icon">
                  <img src={featureIcon3} alt="icon" />
                </span>
                <div className="xb-item--holder">
                  <h2 className="xb-item--title">You'll Always Know Where Things Stand</h2>
                  <p className="xb-item--content">
                  Weekly updates, open communication, no radio silence. You're never left wondering what's happening.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
