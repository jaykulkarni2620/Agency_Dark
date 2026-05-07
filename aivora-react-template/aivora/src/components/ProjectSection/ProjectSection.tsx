import React, { useEffect } from "react";

// ✅ Images
import projectBg from "../../images/bg/project-bg.png";
import gifRound from "../../images/icon/b10c3e43e836d32554bf.gif";
import projectImg01 from "../../images/project/web1.png";
import projectImg02 from "../../images/project/web2.png";
import projectImg03 from "../../images/project/web3.png";
import projectImg04 from "../../images/project/web4.png";

// ✅ Icons
import icon01 from "../../images/icon/1.png";
import icon02 from "../../images/icon/2.png";
import icon03 from "../../images/icon/3.png";
import icon08 from "../../images/icon/project-icon08.svg";
import icon09 from "../../images/icon/project-icon09.svg";
import icon10 from "../../images/icon/project-icon10.svg";
import icon11 from "../../images/icon/project-icon11.svg";
import icon12 from "../../images/icon/project-icon12.svg";
import icon13 from "../../images/icon/project-icon13.svg";

import { Link } from "react-router-dom";

const ProjectSection: React.FC = () => {
  useEffect(() => {
    // ✅ TS FIX
    const bgElement = document.querySelector<HTMLElement>(".project.bg_img");
    if (bgElement) {
      bgElement.style.backgroundImage = `url(${projectBg})`;
    }

    const items = document.querySelectorAll<HTMLElement>(".xb-project-item");
    const paginations = document.querySelectorAll<HTMLElement>(
      ".xb-project-pagination li"
    );

    if (!items.length || !paginations.length) return;

    items.forEach((item) => {
      item.style.transition = "opacity 0.6s ease";
      item.style.opacity = "1";
    });

    const updateActive = () => {
      let indexToActivate = 0;
      const triggerLine = window.innerHeight * 0.3;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          indexToActivate = index;
        }
      });

      paginations.forEach((el) => el.classList.remove("active"));
      paginations[indexToActivate]?.classList.add("active");

      items.forEach((item, i) => {
        if (i === indexToActivate) {
          item.style.opacity = "1";
        } else if (i < indexToActivate) {
          item.style.opacity = "0.3";
        } else {
          item.style.opacity = "1";
        }
      });
    };

    window.addEventListener("scroll", updateActive);
    updateActive();

    return () => {
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  const projects = [
    {
      img: projectImg01,
      title: "Luxury Skincare Brand Website",
      desc: "High-converting skincare eCommerce website.",
      industry: "Beauty & Skincare",
      country: "Punjab, India",
      techs: [icon01, icon02, icon03],
      url: "https://bluemercury.com/",
    },
    {
      img: projectImg02,
      title: "Luxury Jewelry eCommerce Website",
      desc: "Premium jewelry shopping experience.",
      industry: "Jewelry & Accessories",
      country: "Mumbai, India",
      techs: [icon01, icon08, icon09],
      url: "https://www.gilijewels.com/",
    },
    {
      img: projectImg03,
      title: "Modern Furniture eCommerce Website",
      desc: "Clean and modern furniture platform.",
      industry: "Furniture & Home Decor",
      country: "Mumbai, India",
      techs: [icon10, icon11, icon01],
      url: "https://www.naturalliving.co.in/",
    },
    {
      img: projectImg04,
      title: "CNC Machinery Business Website",
      desc: "Industrial CNC business website.",
      industry: "Manufacturing",
      country: "Mumbai, Maharashtra",
      techs: [icon08, icon12, icon13],
      url: "https://savicnc.com",
    },
  ];

  return (
    <section className="project bg_img pt-135 pb-150">
      <div className="container">
        <div className="sec-title custom-sec-title xb-sec-padding text-center">
          <span className="sub-title">Our Projects</span>

          <h2 className="title">
            See the results that reflect of our hard work
          </h2>

          <div className="xb-heading-btn d-inline">
            <Link className="thm-btn agency-btn" to="/project">
              <span className="text">view more projects</span>

              {/* ✅ ARROW BACK */}
              <span className="arrow">
                <span className="arrow-icon">
                  {[...Array(2)].map((_, i) => (
                    <svg key={i} width="28" height="28" viewBox="0 0 28 28">
                      <rect x="5.06" y="19.97" width="20.57" height="2.61" transform="rotate(-40.27 5.06 19.97)" fill="white"/>
                      <rect x="7.97" y="7.24" width="2.61" height="2.61" transform="rotate(-40.27 7.97 7.24)" fill="white"/>
                      <rect x="11.65" y="7.54" width="2.61" height="2.61" transform="rotate(-40.27 11.65 7.54)" fill="white"/>
                      <rect x="15.33" y="7.85" width="2.61" height="2.61" transform="rotate(-40.27 15.33 7.85)" fill="white"/>
                      <rect x="18.71" y="11.83" width="2.61" height="2.61" transform="rotate(-40.27 18.71 11.83)" fill="white"/>
                      <rect x="18.40" y="15.52" width="2.61" height="2.61" transform="rotate(-40.27 18.40 15.52)" fill="white"/>
                      <rect x="18.10" y="19.20" width="2.61" height="2.61" transform="rotate(-40.27 18.10 19.20)" fill="white"/>
                    </svg>
                  ))}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mxw-1800">
        <div className="xb-project-wrap">

          <div className="xb-project-pagination-wrap">
            <ul className="xb-project-pagination">
              <li>1</li>
              <li className="active">2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>

          <div className="xb-project-inner">
            {projects.map((project, index) => (
              <div
                key={index}
                className="xb-project-item bg_img"
                style={{ backgroundImage: `url(${project.img})` }}
              >
                <div className="xb-project-content">
                  <div className="xb-item--inner xb-border">

                    <h2 className="xb-item--title">{project.title}</h2>
                    <p className="xb-item--content">{project.desc}</p>

                    <ul className="xb-item--list ul_li">
                      <li>Industry: <span>{project.industry}</span></li>
                      <li>Country: <span>{project.country}</span></li>
                    </ul>

                    <div className="xb-item--technologie ul_li">
                      <span>Core Technologies:</span>
                      <ul className="list-unstyled ul_li">
                        {project.techs.map((icon, i) => (
                          <li key={i}>
                            <img src={icon} alt="icon" />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* ✅ EXTERNAL LINK BUTTON WITH ARROW */}
                    <div className="xb-item---btn mt-70">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="thm-btn agency-btn"
                      >
                        <span className="text">View Live Site</span>

                        <span className="arrow">
                          <span className="arrow-icon">
                            {[...Array(2)].map((_, i) => (
                              <svg key={i} width="28" height="28" viewBox="0 0 28 28">
                                <rect x="5.06" y="19.97" width="20.57" height="2.61" transform="rotate(-40.27 5.06 19.97)" fill="white"/>
                                <rect x="7.97" y="7.24" width="2.61" height="2.61" transform="rotate(-40.27 7.97 7.24)" fill="white"/>
                                <rect x="11.65" y="7.54" width="2.61" height="2.61" transform="rotate(-40.27 11.65 7.54)" fill="white"/>
                                <rect x="15.33" y="7.85" width="2.61" height="2.61" transform="rotate(-40.27 15.33 7.85)" fill="white"/>
                                <rect x="18.71" y="11.83" width="2.61" height="2.61" transform="rotate(-40.27 18.71 11.83)" fill="white"/>
                                <rect x="18.40" y="15.52" width="2.61" height="2.61" transform="rotate(-40.27 18.40 15.52)" fill="white"/>
                                <rect x="18.10" y="19.20" width="2.61" height="2.61" transform="rotate(-40.27 18.10 19.20)" fill="white"/>
                              </svg>
                            ))}
                          </span>
                        </span>

                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectSection;