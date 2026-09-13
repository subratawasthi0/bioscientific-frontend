import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will get back to you shortly.");
    console.log("Form Data:", form);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ background: "#1A3C8F", color: "white", padding: "60px 0", textAlign: "center" }}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out for quotes or support.</p>
      </div>

      <div className="container" style={{ padding: "60px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "start" }}>
          {/* Left: Contact Info & Map */}
          <div>
            <h3 style={{ color: "#1A3C8F", marginBottom: "20px" }}>Get in Touch</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "30px" }}>
              <div><i className="fas fa-map-marker-alt" style={{ color: "#1A3C8F", width: "25px" }}></i> 123, Industrial Area, Mumbai - 400001</div>
              <div><i className="fas fa-phone" style={{ color: "#1A3C8F", width: "25px" }}></i> +91 98765 43210</div>
              <div><i className="fas fa-envelope" style={{ color: "#1A3C8F", width: "25px" }}></i> info@namechemicals.com</div>
              <div><i className="fas fa-clock" style={{ color: "#1A3C8F", width: "25px" }}></i> Mon - Sat: 9:00 AM - 6:00 PM</div>
            </div>

            <h4 style={{ marginBottom: "15px" }}>Find Us Here</h4>
            <div style={{ borderRadius: "12px", overflow: "hidden", height: "200px", background: "#eee", border: "1px solid #ddd" }}>
              <iframe 
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.738560951402!2d72.8688853!3d19.0771848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7e5e5e5e5e5%3A0x123456789abcdef!2sMumbai!5e0!3m2!1sen!2sin!4v1610000000000" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
              </iframe>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div style={{ background: "#f8fafc", padding: "40px", borderRadius: "16px" }}>
            <h3 style={{ color: "#1A3C8F", marginBottom: "25px" }}>Send an Inquiry</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ddd" }} />
                <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ddd" }} />
              </div>
              <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ddd", width: "100%", marginTop: "15px" }} />
              <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ddd", width: "100%", marginTop: "15px" }} />
              <textarea name="message" placeholder="Your Message..." rows="5" value={form.message} onChange={handleChange} required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ddd", width: "100%", marginTop: "15px", resize: "vertical" }}></textarea>
              <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "20px", justifyContent: "center" }}>SUBMIT INQUIRY</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;