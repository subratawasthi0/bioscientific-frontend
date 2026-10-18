import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

function About() {
  return (
    <div className="about-page-wrapper">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="about-page-hero-banner">
        <div className="about-page-hero-content">
          <span className="about-page-hero-tag">About Us</span>
          <h1 className="about-page-hero-title">
            Scientific Products. <span>Reliable Supply.</span> Global Reach.
          </h1>
          <p className="about-page-hero-subtitle">
            Crest Bioscientific is a leading manufacturer and supplier of
            laboratory chemicals, reagents, glassware, consumables and bulk
            chemicals serving customers across India and global markets.
          </p>
          <div className="about-page-hero-buttons">
            <Link to="/products" className="about-page-btn-primary">
              Explore Products <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to="/contact" className="about-page-btn-outline">
              Enquire Now <i className="fas fa-envelope"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHO WE ARE
      ========================================================= */}
      <section className="about-page-section">
        <div className="about-page-section-title">
          <span className="about-page-section-tag">Who We Are</span>
          <h2>Your Trusted Partner in Scientific Supply</h2>
        </div>
        <div className="about-page-who">
          <div className="about-page-who-image">
            <img src="/image7.jpg" alt="Crest Bioscientific Facility" />
          </div>
          <div className="about-page-who-text">
            <h3>Delivering Quality, Consistency & Reliability</h3>
            <p>
              Crest Bioscientific is one of the leading manufacturers and
              suppliers of laboratory chemicals, laboratory consumables,
              laboratory glassware and bulk chemicals, catering to the diverse
              requirements of the scientific, pharmaceutical, biotechnology,
              research and industrial sectors.
            </p>
            <p>
              With decades of experience in the industry, we have built a strong
              presence across domestic and international markets, serving
              customers with a comprehensive range of scientific products and
              dependable supply solutions.
            </p>
            <p>
              Our commitment to quality, consistency and customer satisfaction
              drives everything we do, enabling us to build lasting
              relationships and deliver reliable solutions to customers across
              global markets.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          MORE THAN A SUPPLIER
      ========================================================= */}
      <section className="about-page-supplier">
        <div className="about-page-supplier-inner">
          <div className="about-page-section-title">
            <span className="about-page-section-tag">Our Philosophy</span>
            <h2>More Than a Supplier</h2>
          </div>
          <div className="about-page-supplier-grid">
            <div className="about-page-supplier-text">
              <h3>Building Trust Through Every Order</h3>
              <p>
                At Crest Bioscientific, we believe that supplying chemicals and
                scientific products is about more than fulfilling an order. It
                is about delivering consistent quality, reliable specifications
                and dependable supply that our customers can trust.
              </p>
              <p>
                From laboratory chemicals and reagents to bulk chemicals and
                specialized scientific products, we focus on maintaining the
                right balance of quality, consistency and reliability at every
                stage of the supply process.
              </p>
              <p>
                We understand that in the chemical and scientific industry,
                every product matters. That is why we value clear communication,
                technical understanding, consistent quality and responsive
                service—from the first enquiry to final delivery.
              </p>
              <p>
                Our goal is not simply to supply a product, but to build
                long-term business relationships based on trust, performance and
                mutual growth.
              </p>
            </div>
            <div className="about-page-supplier-image">
              <img src="/image4.jpg" alt="Quality Assurance" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISION / MISSION / VALUES
      ========================================================= */}
      <section className="about-page-vmv">
        <div className="about-page-vmv-inner">
          <div className="about-page-vmv-title">
            <h2>Our Vision, Mission & Values</h2>
            <p>The foundation that drives everything we do</p>
          </div>
          <div className="about-page-vmv-grid">
            <div className="about-page-vmv-card">
              <div className="about-page-vmv-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Vision</h3>
              <p>
                To be a globally trusted name in chemicals and scientific
                products, recognized for quality, reliability and long-term
                partnerships.
              </p>
            </div>
            <div className="about-page-vmv-card">
              <div className="about-page-vmv-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Mission</h3>
              <p>
                To deliver quality products, consistent supply and dependable
                service that create lasting value for our customers.
              </p>
            </div>
            <div className="about-page-vmv-card">
              <div className="about-page-vmv-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Values</h3>
              <p>Quality · Integrity · Reliability · Partnership · Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CREST BIOSCIENTIFIC
      ========================================================= */}
      <section className="about-page-why">
        <div className="about-page-section-title">
          <span className="about-page-section-tag">Why Choose Us</span>
          <h2>Why Crest Bioscientific</h2>
        </div>
        <div className="about-page-why-grid">
          <div className="about-page-why-card">
            <div className="about-page-why-icon">
              <i className="fas fa-flask"></i>
            </div>
            <h4>One Place for Your Laboratory Needs</h4>
            <p>
              From laboratory chemicals and reagents to glassware, consumables
              and specialized scientific products, we offer a comprehensive
              range under one roof.
            </p>
          </div>
          <div className="about-page-why-card">
            <div className="about-page-why-icon">
              <i className="fas fa-award"></i>
            </div>
            <h4>Quality You Can Rely On</h4>
            <p>
              We are committed to delivering products that meet defined quality
              and specification requirements, with consistency at every stage.
            </p>
          </div>
          <div className="about-page-why-card">
            <div className="about-page-why-icon">
              <i className="fas fa-industry"></i>
            </div>
            <h4>Manufacturing & Product Expertise</h4>
            <p>
              Our manufacturing capabilities and technical understanding help us
              deliver products suited to diverse laboratory, research and
              industrial applications.
            </p>
          </div>
          <div className="about-page-why-card">
            <div className="about-page-why-icon">
              <i className="fas fa-truck-fast"></i>
            </div>
            <h4>Consistent & Dependable Supply</h4>
            <p>
              We focus on maintaining product availability, consistent quality
              and dependable delivery to support our customers' ongoing
              requirements.
            </p>
          </div>
          <div className="about-page-why-card">
            <div className="about-page-why-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h4>Built for Long-Term Business</h4>
            <p>
              We believe strong businesses are built on trust. Our focus is on
              transparent communication, reliable service and relationships that
              grow over time.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          DIRECTOR'S MESSAGE
      ========================================================= */}
      <section className="about-page-director">
        <div className="about-page-director-inner">
          <div className="about-page-director-image">
            <img src="/image2.jpg" alt="Director" />
          </div>
          <div className="about-page-director-text">
            <span className="about-page-director-tag">
              From Director's Desk
            </span>
            <h2>A Message From the Director</h2>
            <div className="about-page-director-quote">
              <p>
                "Our vision is to build Crest Bioscientific into a globally
                trusted name in scientific and laboratory products, where
                quality, integrity and long-term relationships remain at the
                heart of everything we do."
              </p>
            </div>
            <p>
              Crest Bioscientific was founded with a simple purpose — to make
              scientific procurement easier, more reliable and more efficient
              for our customers.
            </p>
            <p>
              We are building an integrated ecosystem of laboratory chemicals,
              reagents, laboratory glassware, consumables, bulk chemicals and
              specialized scientific products, so our customers can meet more of
              their requirements through one trusted partner instead of managing
              multiple suppliers.
            </p>
            <p>
              For us, this is about more than offering a wide product range. It
              is about delivering consistent quality, dependable supply and
              professional service, while building strong relationships with our
              customers and distributors.
            </p>
            <p>
              As we grow, our focus will remain on understanding customer
              requirements, expanding our capabilities and creating greater
              value for the businesses we serve.
            </p>
            <p>
              We believe that trust is earned through every product, every
              commitment and every relationship — and that is the foundation on
              which we are building Crest Bioscientific.
            </p>
            <div className="about-page-director-signature">
              <strong>— Director</strong>
              <span>Crest Bioscientific</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GLOBAL SUPPLY CAPABILITIES
      ========================================================= */}
      {/* <section className="about-page-global">
        <div className="about-page-section-title">
          <span className="about-page-section-tag">Global Reach</span>
          <h2>Global Supply Capabilities</h2>
          <p>Supporting customers across India and international markets</p>
        </div>
        <div className="about-page-global-grid">
          <div className="about-page-global-card">
            <div className="about-page-global-icon"><i className="fas fa-file-invoice"></i></div>
            <h4>Export Documentation</h4>
          </div>
          <div className="about-page-global-card">
            <div className="about-page-global-icon"><i className="fas fa-box"></i></div>
            <h4>Packaging</h4>
          </div>
          <div className="about-page-global-card">
            <div className="about-page-global-icon"><i className="fas fa-ship"></i></div>
            <h4>Logistics Coordination</h4>
          </div>
          <div className="about-page-global-card">
            <div className="about-page-global-icon"><i className="fas fa-plane-departure"></i></div>
            <h4>International Shipment Support</h4>
          </div>
        </div>
      </section> */}

      {/* =========================================================
          QUALITY & RELIABILITY
      ========================================================= */}
      <section className="about-page-quality">
        <div className="about-page-quality-inner">
          <div className="about-page-quality-title">
            <h2>Quality & Reliability</h2>
            <p>The pillars that ensure every delivery meets expectations</p>
          </div>
          <div className="about-page-quality-grid">
            <div className="about-page-quality-item">
              <i className="fas fa-certificate"></i>
              <h4>Product Quality</h4>
            </div>
            <div className="about-page-quality-item">
              <i className="fas fa-file-alt"></i>
              <h4>Documentation</h4>
            </div>
            <div className="about-page-quality-item">
              <i className="fas fa-search"></i>
              <h4>Traceability</h4>
            </div>
            <div className="about-page-quality-item">
              <i className="fas fa-box-open"></i>
              <h4>Packaging</h4>
            </div>
            <div className="about-page-quality-item">
              <i className="fas fa-truck"></i>
              <h4>Reliable Supply</h4>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA BANNER
      ========================================================= */}
      <section className="about-page-cta">
        <div className="about-page-cta-inner">
          <h2>Let's Build a Reliable Partnership</h2>
          <p>
            Join our growing family of customers and distributors who trust
            Crest Bioscientific.
          </p>
          <Link to="/contact" className="about-page-cta-btn">
            Get in Touch <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
