import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import ContactInfoSection from "./ContactInfoSection";
import ContactForm from "../../components/ContactFrom/ContactForm";

// import background image
import contactBg from "../../images/bg/contact-bg02.png";

const ContactPage: React.FC = () => {
  return (
    <Fragment>
      <div className='about-page inner-page'>
        <div className="body_wrap o-clip">
          <Header />
          <main>
            <PageTitle pageTitle="Contact us" pagesub="Contact us" />
            <ContactInfoSection />
            <section className="contact">
              <div className="container">
                <div
                  className="xb-contact-wrap xb-border bg_img"
                  style={{
                    backgroundImage: `url(${contactBg})`,
                  }}
                >
                  <div className="xb-contact-form xb-main-contact xb-border">
                    <div className="form-heading text-center mb-30">
                      <h3 className="title">Ready to collaborate with us?</h3>
                      <p className="sub-title clr-white">
                        Who knows where a single message might lead you.
                      </p>
                    </div>

                    <ContactForm/>
                  </div>

                  {/* Google Map Embed */}
                  <div className="google-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.520143153216!2d72.80314502531415!3d19.476245189285418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9f63e251411%3A0xf241f70fb93ebd27!2sPoonam%20Imperial%2C%20Evershine%20Globle%20City%2C%20Dongarpada%2C%20Rustomjee%20Global%20City%2C%20Virar%20West%2C%20Vasai-Virar%2C%20Maharashtra%20401303!5e0!3m2!1sen!2sin!4v1776328913621!5m2!1sen!2sin"
                    loading="lazy"
                    title="gmap"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    allowFullScreen
                  ></iframe>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <Scrollbar />
        </div>
      </div>
    </Fragment>
  );
};

export default ContactPage;