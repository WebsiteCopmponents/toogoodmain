Project Name :- TooGood.agency
bio :-  a early stage  web and mobile app design  and development studio  based in uk (online based)  we do web design  mobile design  custom dashboard, mobile app, uiux,

Web Design
Purposeful, conversion-focused design that turns visitors into customers and positions your brand as the obvious choice in your market.
Web Development
Fast, secure, scalable websites built on clean code — engineered for performance, SEO, and easy long-term maintenance.
Web Applications
Custom web apps built around your actual workflows — from internal dashboards to customer-facing platforms — designed to scale with your business.
Mobile Applications
Native and cross-platform mobile apps that feel fast, intuitive, and on-brand — built for iOS and Android from a single, efficient codebase.
AI Automation
We identify the repetitive, time-draining tasks in your business and replace them with intelligent workflows — so your team can focus on what actually needs a human.
AI Chatbots
Custom-trained chatbots that qualify leads, answer customer questions, and support your team 24/7 — trained on your business, not a generic script.
UI/UX Design
Research-backed interface design that removes friction, guides users to action, and makes every product you ship feel effortless to use.
domain management
social management
SEO
business email setup


connected services 
social media  advertising
360 seo
google advertising


in export default function Services({
  eyebrow = "Our Services",  here mention (
    Web Design
Purposeful, conversion-focused design that turns visitors into customers and positions your brand as the obvious choice in your market.
Web Development
Fast, secure, scalable websites built on clean code — engineered for performance, SEO, and easy long-term maintenance.
Web Applications
Custom web apps built around your actual workflows — from internal dashboards to customer-facing platforms — designed to scale with your business.
Mobile Applications
Native and cross-platform mobile apps that feel fast, intuitive, and on-brand — built for iOS and Android from a single, efficient codebase.
AI Automation
We identify the repetitive, time-draining tasks in your business and replace them with intelligent workflows — so your team can focus on what actually needs a human.
AI Chatbots
Custom-trained chatbots that qualify leads, answer customer questions, and support your team 24/7 — trained on your business, not a generic script.
UI/UX Design
Research-backed interface design that removes friction, guides users to action, and makes every product you ship feel effortless to use.
domain management
social management
SEO
business email setup
  )

//File : our-services.tsx
export default function OurServices({ className }: { className?: string }) {  (
    here actually we need  to keep main services + linked services like  
connected services 
social media  advertising
360 seo
google advertising
)


#industries
healthcare
realestate
restaurents
finance
saas
education(related
)


changes //File : industries.tsx   make changes as per industries and keep  images based on taht


all  content keep based on this 


for features section  

just  change contents  only dont touch  svg icosn   will check later


contact section 

[
    
    make  a contact.tsx  and  keep form  in another componetn lets make clear and properly later will conect  formw ith   hostinger  mail api  to send admin  dont keep exampleenv
    ignore  fonts colors in this prompt will use later

    "use client";

import React, { useState } from "react";

export default function Contact01Orbit({ className }: { className?: string }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    plan: "",
    location: "",
    date: "2026-01-02"
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors.includes(name)) {
      setErrors(prev => prev.filter((err: string) => err !== name));
    }
  };

  const handleSubmit = () => {
    setSuccess(false);
    const requiredFields = ["firstName", "lastName", "email", "phone", "plan", "location", "date"];
    const newErrors = requiredFields.filter((field: string) => !formData[field as keyof typeof formData]);

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      setSuccess(true);
    }
  };

  return (
    <>
      

      <section className={"w-full " + (className || "")} style={{ backgroundColor: "#fefffe", display: "flex", justifyContent: "center", padding: "140px 40px", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>
        <style>{"\n          .join-left {\n            position: relative;\n            width: 520px;\n            height: 680px;\n            border-radius: 20px;\n            overflow: hidden;\n            flex-shrink: 0;\n          }\n          .join-image {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n            object-position: top;\n            display: block;\n          }\n          .info-bar {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            height: 80px;\n            display: flex;\n          }\n          .info-half {\n            flex: 1;\n            display: flex;\n            align-items: center;\n            gap: 14px;\n            padding: 0 24px;\n          }\n          .info-half.white { background: white; }\n          .info-half.lime { background: #c9f11a; }\n          .info-icon-circle {\n            width: 38px;\n            height: 38px;\n            background: #111;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: white;\n            font-size: 18px;\n            flex-shrink: 0;\n          }\n          .info-text { display: flex; flex-direction: column; }\n          .info-label { font-size: 12px; font-weight: 500; margin-bottom: 2px; }\n          .white .info-label { color: #888; }\n          .lime .info-label { color: #333; }\n          .info-value { font-size: 15px; font-weight: 700; color: #111; }\n          .lime .info-value { font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }\n          .field-input, .field-select {\n            width: 100%;\n            padding: 14px 16px;\n            border: 1.5px solid #e0e1e1;\n            border-radius: 10px;\n            font-size: 14px;\n            color: #333;\n            background: white;\n            box-sizing: border-box;\n            transition: all 0.2s ease;\n          }\n          .field-input:focus, .field-select:focus {\n            border-color: #c9f11a;\n            outline: none;\n            box-shadow: 0 0 0 3px rgba(200,240,26,0.2);\n          }\n          .field-input.error, .field-select.error { border-color: #ee4544; }\n          .submit-btn {\n            width: 100%;\n            background: #111;\n            color: white;\n            border: none;\n            border-radius: 12px;\n            padding: 10px 10px 10px 28px;\n            font-size: 17px;\n            font-weight: 700;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            cursor: pointer;\n            transition: background 0.2s ease;\n            margin-top: 10px;\n          }\n          .submit-btn:hover { background: #222; }\n          .btn-circle {\n            width: 44px;\n            height: 44px;\n            background: #c9f11a;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: #111;\n            font-size: 18px;\n            font-weight: 900;\n          }\n          @media (max-width: 1024px) {\n            .join-left { width: 400px; height: 550px; }\n          }\n          @media (max-width: 768px) {\n            .join-container { flex-direction: column !important; align-items: center !important; }\n            .join-left, .join-right { width: 100% !important; max-width: 100% !important; }\n            .join-left { height: 500px; }\n            .form-row { flex-direction: column !important; gap: 20px !important; margin-bottom: 0 !important; }\n            .form-field { margin-bottom: 20px; }\n          }\n          @media (max-width: 480px) {\n            .info-bar { flex-direction: column; height: auto; }\n            .info-half { padding: 16px 24px; }\n            .join-left { height: 400px; }\n          }\n        "}</style>

        <div
          className="join-container"
          style={{ maxWidth: "1200px", width: "100%", display: "flex", gap: "60px", alignItems: "flex-end" }}
        >
          {/* Left Column */}
          <div className="join-left">
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800"
              alt="Join Orbit Fitness"
              className="join-image"
              referrerPolicy="no-referrer"
            />
            <div className="info-bar">
              <div className="info-half white">
                <div className="info-icon-circle">&#x1F3A7;</div>
                <div className="info-text">
                  <span className="info-label">Emergency Contact</span>
                  <span className="info-value">+1 (800) 123-456</span>
                </div>
              </div>
              <div className="info-half lime">
                <div className="info-icon-circle">&#x2709;&#xFE0F;</div>
                <div className="info-text">
                  <span className="info-label">Support Mail</span>
                  <span className="info-value">info@orbit.io</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            className="join-right"
            style={{ flex: 1, maxWidth: "580px" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "26px", height: "26px", background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "6px", height: "6px", background: "#c9f11a", borderRadius: "50%" }}></div>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.16em", color: "#111", textTransform: "uppercase" }}>CONTACT</span>
            </div>

            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "42px", color: "#0d0d0c", textTransform: "uppercase", lineHeight: 1.05, margin: "0 0 32px 0" }}>
              HAVE QUESTIONS<br />
              OR WANT TO JOIN?
            </h2>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="form-row" style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div className="form-field" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#111", marginBottom: "6px", textTransform: "uppercase" }}>FIRST NAME *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className={"field-input" + (errors.includes("firstName") ? " error" : "")}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#111", marginBottom: "6px", textTransform: "uppercase" }}>LAST NAME *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className={"field-input" + (errors.includes("lastName") ? " error" : "")}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div className="form-field" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#111", marginBottom: "6px", textTransform: "uppercase" }}>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={"field-input" + (errors.includes("email") ? " error" : "")}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#111", marginBottom: "6px", textTransform: "uppercase" }}>PHONE *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+44"
                    className={"field-input" + (errors.includes("phone") ? " error" : "")}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div className="form-field" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#111", marginBottom: "6px", textTransform: "uppercase" }}>SELECT PLAN *</label>
                  <select
                    name="plan"
                    className={"field-select" + (errors.includes("plan") ? " error" : "")}
                    value={formData.plan}
                    onChange={handleInputChange}
                  >
                    <option value="">Select one...</option>
                    <option value="Basic Plan">Basic Plan</option>
                    <option value="Pro Plan">Pro Plan</option>
                    <option value="Elite Plan">Elite Plan</option>
                    <option value="Team Plan">Team Plan</option>
                  </select>
                </div>
              </div>

              <div className="form-row" style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div className="form-field" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#111", marginBottom: "6px", textTransform: "uppercase" }}>LOCATION *</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="London, UK"
                    className={"field-input" + (errors.includes("location") ? " error" : "")}
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-field" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#111", marginBottom: "6px", textTransform: "uppercase" }}>DATE *</label>
                  <input
                    type="date"
                    name="date"
                    className={"field-input" + (errors.includes("date") ? " error" : "")}
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button className="submit-btn" onClick={() => handleSubmit()}>
                <span>Reserve Your Spot</span>
                <div className="btn-circle">&raquo;</div>
              </button>

              {success && (
                <div style={{ marginTop: "12px", fontSize: "14px", color: "#16a24b", fontWeight: 500 }}>
                  &#10003; Your spot has been reserved!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}]





animated  footer bg is blue  change to our primary color

and  

after all changes  create new repo in git and push
