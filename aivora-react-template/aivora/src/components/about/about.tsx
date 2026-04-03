import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import "./about.css";
import aboutBg from "../../images/bg/about-bg.png";

// Animated GIFs
import gif1 from "../../images/icon/original-66948a0d81d.gif";
import gif2 from "../../images/icon/0deec720000b2066289b.gif";
import gif3 from "../../images/icon/b10c3e43e836d32554bf.gif";

// About images
import img01 from "../../images/about/img01.png";
import img02 from "../../images/about/img02.png";
import img03 from "../../images/about/img03.png";

import { Link } from "react-router-dom";

const AboutSection: React.FC = () => {
  useEffect(() => {
    const bgEl = document.querySelector<HTMLElement>(".xb-about-img-wrap");
    if (bgEl) bgEl.style.backgroundImage = `url(${aboutBg})`;
  }, []);

  // ✅ Add titles here
  const aboutItems = [
    {
      img: img01,
      title: "A Team That Treats Your Brand Like Their Own",
    },
    {
      img: img02,
      title: "We Started With a Simple Question",
    },
    {
      img: img03,
      title: "Built on Honesty, Driven by Results",
    },
  ];

  return (
    <section className="about pt-140">
      <div className="container">
        <div className="sec-title about-sec-title mb-75">
          <span className="sub-title">Who We are?</span>
          <h2 className="title">
          We Build. We Design. We Deliver.
          </h2>
        </div>
      </div>

      {/* ✅ Marquee */}
      <div className="xb-about-img-wrap bg_img wow">
        <Marquee speed={40} gradient={false} pauseOnHover={false}>
          {aboutItems.map((item, idx) => (
            <div key={idx} className="xb-about-img-item img-hove-effect">
              
              {/* Image */}
              <div className="xb-img">
                <Link to="/service-details">
                  <img src={item.img} alt={`about-${idx + 1}`} />
                </Link>
              </div>

              {/* ✅ Title Below Image */}
              <h4 className="xb-img-title">
                {item.title}
              </h4>

            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default AboutSection;