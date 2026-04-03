import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { saveFormSubmission } from "../../services/formSubmissionService";

// Import your icons
import userIcon from "../../images/icon/user-balck-icon.svg";
import emailIcon from "../../images/icon/sms-balck-icon.svg";
import phoneIcon from "../../images/icon/call-icon02.svg";
import uploadIcon from "../../images/icon/upload-icon.svg";
import listIcon from "../../images/icon/list-icon.svg";
import messageIcon from "../../images/icon/messages-icon.svg";
import arrowIcon from "../../images/icon/rotate-arrow-black02.svg";

const MAX_FILE_BYTES = 1.5 * 1024 * 1024;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

const ContactForm: React.FC = () => {
  const [forms, setForms] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    file: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);

  const [validator] = useState(
    new SimpleReactValidator({ className: "errorMessage" })
  );

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForms({ ...forms, [name]: value });

    if (validator.allValid()) validator.hideMessages();
    else validator.showMessages();
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForms({ ...forms, file });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validator.allValid()) {
      validator.showMessages();
      return;
    }

    setSubmitting(true);
    try {
      let fileBase64: string | undefined;
      let fileName: string | undefined;

      if (forms.file) {
        fileName = forms.file.name;
        if (forms.file.size <= MAX_FILE_BYTES) {
          try {
            fileBase64 = await readFileAsDataUrl(forms.file);
          } catch {
            fileBase64 = undefined;
          }
        }
      }

      await saveFormSubmission({
        name: forms.name,
        email: forms.email,
        phone: forms.phone,
        service: forms.service,
        message: forms.message,
        fileName,
        fileBase64,
      });

      alert(
        "Thank you! Your message has been submitted successfully. We'll get back to you soon."
      );

      setForms({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        file: null,
      });
      validator.hideMessages();
    } catch (error) {
      console.error("Error saving submission:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="xb-contact-input-form">
      <div className="row mt-none-20">
        {/* Name */}
        <div className="col-lg-6 col-md-6 mt-20">
          <div className="xb-input-field">
            <input
              id="author-name"
              name="name"
              type="text"
              value={forms.name}
              onChange={changeHandler}
              required
              disabled={submitting}
            />
            <label htmlFor="author-name">Your Name*</label>
            <img src={userIcon} alt="user" />
          </div>
          {validator.message("name", forms.name, "required|alpha_space")}
        </div>

        {/* Email */}
        <div className="col-lg-6 col-md-6 mt-20">
          <div className="xb-input-field">
            <input
              id="author-email"
              name="email"
              type="email"
              value={forms.email}
              onChange={changeHandler}
              required
              disabled={submitting}
            />
            <label htmlFor="author-email">Email Address*</label>
            <img src={emailIcon} alt="email" />
          </div>
          {validator.message("email", forms.email, "required|email")}
        </div>

        {/* Phone */}
        <div className="col-lg-6 col-md-6 mt-20">
          <div className="xb-input-field">
            <input
              id="author-phone"
              name="phone"
              type="text"
              value={forms.phone}
              onChange={changeHandler}
              required
              disabled={submitting}
            />
            <label htmlFor="author-phone">Contact No*</label>
            <img src={phoneIcon} alt="phone" />
          </div>
          {validator.message("phone", forms.phone, "required|numeric")}
        </div>

        {/* File Upload */}
        <div className="col-lg-6 col-md-6 mt-20">
          <div className="xb-input-field xb-select-file">
            <input type="file" onChange={fileHandler} disabled={submitting} />
            <img src={uploadIcon} alt="upload" />
            <span>{forms.file ? forms.file.name : "Attach file..."}</span>
          </div>
        </div>

        {/* Select Field */}
        <div className="col-lg-12 col-md-12 mt-20">
          <div className="xb-input-field xb-select-field">
            <select
              name="service"
              value={forms.service}
              onChange={changeHandler}
              required
              className="nice-select"
              disabled={submitting}
            >
              <option value="">Select Service*</option>
              <option value="Ecommerce Website Designing">Ecommerce Website Designing</option>
              <option value="Business Website Development">Business Website Development</option>
              <option value="Mobile application development">Mobile application development</option>
              <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
              <option value="Performance Marketing">Performance Marketing</option>
              <option value="Social Media Marketing & Advertising">Social Media Marketing & Advertising</option>
              <option value="Graphics Designing & Brand Profiling">Graphics Designing & Brand Profiling</option>
              <option value="Content Creation">Content Creation</option>

            </select>
            <img src={listIcon} alt="list" />
          </div>
          {validator.message("service", forms.service, "required")}
        </div>

        {/* Message */}
        <div className="col-lg-12 col-md-12 mt-20">
          <div className="xb-input-field xb-massage-field">
            <textarea
              id="massage"
              name="message"
              value={forms.message}
              onChange={changeHandler}
              required
              disabled={submitting}
            ></textarea>
            <label htmlFor="massage">Your Message..</label>
            <img src={messageIcon} alt="message" />
          </div>
          {validator.message("message", forms.message, "required")}
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-submit-btn mt-35">
        <button type="submit" className="thm-btn form-btn" disabled={submitting}>
          {submitting ? "Sending…" : "Submit Here"}
          <span className="xb-icon">
            <img src={arrowIcon} alt="arrow" />
            <img src={arrowIcon} alt="arrow" />
          </span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
