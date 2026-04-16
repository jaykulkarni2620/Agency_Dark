import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// ✅ Images
import bgImage from "../../images/bg/testimonial-bg.png";
import gifShape from "../../images/icon/animated-gif03.gif";
import avatar1 from "../../images/avatar/img01.jpg";
import avatar2 from "../../images/avatar/img02.jpg";
import avatar3 from "../../images/avatar/img03.jpg";
import avatar4 from "../../images/avatar/img04.jpg";
import avatar5 from "../../images/avatar/img05.jpg";

const testimonials = [
  {
    id: 1,
    source: "GoodFirms",
    rating: "5.0",
    content:
      '“Before Minexx, our ad spend was burning with nothing to show for it. Within 6 weeks they restructured our entire funnel our cost per lead dropped by 40% and we closed 3 enterprise deals that quarter.”',
    name: "Sachin Kamble",
    designation: "Founder - Savicnc",
    avatar: avatar1,
  },
  {
    id: 2,
    source: "Clutch",
    rating: "4.9",
    content:
      "“We rebranded completely with Minexx with new identity, new website, new positioning. Our sales team now has something they're proud to show. The brand actually reflects who we are now.”",
    name: "Shreya Mehta",
    designation: "CEO & Funder - Zimpo",
    avatar: avatar2,
  },
  {
    id: 3,
    source: "Clutch",
    rating: "5.0",
    content:
      "“They delivered a full e-commerce site in 3 weeks, which I didn't think was possible. Clean, fast, and our conversion rate went up 28% in the first month. No fluff, just execution.”",
    name: "Priya Anand",
    designation: "Manager - SwiftLogix",
    avatar: avatar3,
  },
  {
    id: 4,
    source: "GoodFirms",
    rating: "5.0",
    content:
      "“Our Instagram went from 2k to 41k followers in 5 months. The content strategy they built was specific to our audience  not generic templates. Engagement is consistently 3x industry average.”",
    name: "Arjun Joshi",
    designation: "CEO - BrightNest",
    avatar: avatar4,
  },
  {
    id: 5,
    source: "Clutch",
    rating: "4.7",
    content:
      "“We were ranking on page 4 for our core keywords. Six months with Minexx's SEO team and we're on page 1 for 11 keywords. Organic traffic is up 180%. The ROI speaks for itself.”",
    name: "Divya Sharma",
    designation: "Director - Finexa Capital",
    avatar: avatar5,
  },
  {
    id: 6,
    source: "Clutch",
    rating: "5.0",
    content:
      "“'ve worked with 4 agencies before Minexx. The difference is that these guys actually understand business — not just marketing. They pushed back on my ideas when needed, and they were right every time.”",
    name: "Nikhil Kulkarni",
    designation: "Manager - SwiftLogix",
    avatar: avatar3,
  },
];

const TestimonialSection: React.FC = () => {
  useEffect(() => {
    const bgEl = document.querySelector<HTMLElement>(".testimonial.bg_img");
    if (bgEl) bgEl.style.backgroundImage = `url(${bgImage})`;
  }, []);

  return (
    <section className="testimonial pb-150 bg_img">
      <div className="container">
        <div className="sec-title sec-title-center tes-sec-title text-center mb-50">
          <span className="sub-title mb-15">OUR TESTIMONIALS</span>
          <h2 className="title">
            Hear from our
            <img src={gifShape} alt="shape" /> happy customers
          </h2>
        </div>
      </div>

      <div className="xb-testimonial-slider">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={400}
          spaceBetween={30}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1700: { slidesPerView: 5 },
            1600: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="xb-testimonial-item">
                <div className="xb-item--inner xb-border">
                  <ul className="xb-item--rating list-unstyled ul_li">
                    <li>
                      <i className="fa-solid fa-star-sharp"></i>
                    </li>
                    <li>{item.source}</li>
                    <li>{item.rating}</li>
                  </ul>
                  <p className="xb-item--content">{item.content}</p>
                  <div className="xb-item--author ul_li">
                    <div className="xb-item--avatar">
                      {/* <img src={item.avatar} alt={item.name} /> */}
                    </div>
                    <div className="xb-item--holder">
                      <h3 className="xb-item--name">{item.name}</h3>
                      <span className="xb-item--desig">{item.designation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
