// import React, { useRef, useEffect, useState } from "react"; // 👈 Added useState
// import { Link } from "react-router-dom";

// function Home() {
//   // --- 1. SLIDESHOW STATE & LOGIC ---
//   const slides = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image6.jpg'];
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000); // Changes every 4 seconds

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   // --- 2. SCROLL ANIMATION LOGIC (YOUR EXISTING CODE) ---
//   const featuresListRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-in");
//           }
//         });
//       },
//       { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
//     );

//     if (featuresListRef.current) {
//       const featureTexts = featuresListRef.current.querySelectorAll(".feature-text");
//       featureTexts.forEach((text, index) => {
//         text.style.transitionDelay = index * 0.15 + "s";
//         observer.observe(text);
//       });
//     }

//     return () => {
//       if (featuresListRef.current) {
//         const featureTexts = featuresListRef.current.querySelectorAll(".feature-text");
//         featureTexts.forEach((text) => observer.unobserve(text));
//       }
//     };
//   }, []);

//   return (
//     <>
//       {/* --- HERO SECTION (UPDATED SLIDESHOW) --- */}
//       <section className="hero">

//         {/* Changed to a container that holds all slides */}
//         <div className="hero-background">
//           {slides.map((slide, index) => (
//             <div
//               key={index}
//               className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
//               style={{ backgroundImage: `url('${slide}')` }}
//             ></div>
//           ))}
//         </div>

//         {/* Your existing text and gradient remain untouched */}
//         <div className="hero-content">
//           <h1>
//             Innovative Chemical
//             <br />
//             Solutions for a Better
//             <br />
//             Tomorrow
//           </h1>
//           <p>
//             High performance chemicals and solvents for a wide range of
//             industrial applications.
//           </p>
//           <Link to="/products" className="btn-primary">
//             EXPLORE PRODUCTS →
//           </Link>
//         </div>

//         {/* 👈 NEW: Slide Indicator Dots */}
//         <div className="hero-indicators">
//           {slides.map((_, index) => (
//             <span
//               key={index}
//               className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => setCurrentSlide(index)}
//             ></span>
//           ))}
//         </div>

//         <a
//           href="https://wa.me/919876543210"
//           className="whatsapp-btn"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <i className="fab fa-whatsapp" style={{ fontSize: "1.5rem" }}></i>{" "}
//           Chat on WhatsApp
//         </a>
//       </section>

//       {/* --- THE REST OF YOUR CODE REMAINS EXACTLY THE SAME BELOW --- */}

//       {/* --- SEARCH SECTION --- */}
//       <section className="search-section">
//         <div className="container search-wrapper">
//           <div className="search-features">
//             <span>
//               <i className="fas fa-flask"></i> Wide Product Range
//             </span>
//             <span>
//               <i className="fas fa-check-circle"></i> Premium Quality
//             </span>
//             <span>
//               <i className="fas fa-truck"></i> Timely Delivery
//             </span>
//             <span>
//               <i className="fas fa-headset"></i> Technical Support
//             </span>
//           </div>
//           <div className="search-box">
//             <input type="text" placeholder="Search for products..." />
//             <select>
//               <option>All Categories</option>
//             </select>
//             <button>
//               <i className="fas fa-search"></i> SEARCH
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* --- PRODUCT CATEGORIES (Preview) --- */}
//       <section
//         className="container"
//         style={{ paddingTop: "40px", paddingBottom: "60px" }}
//       >
//         <div className="section-title">
//           <p className="subtitle">OUR PRODUCT CATEGORIES</p>
//           <h2>High Quality Chemical Solutions</h2>
//         </div>
//         <div className="product-grid">
//           {[
//             {
//               icon: "fa-flask",
//               title: "Solvents",
//               desc: "High purity solvents for various industrial applications.",
//             },
//             {
//               icon: "fa-vial",
//               title: "Speciality Chemicals",
//               desc: "Advanced and innovative chemical solutions.",
//             },
//             {
//               icon: "fa-microscope",
//               title: "Lab Chemicals",
//               desc: "Chemicals designed for research & analysis.",
//             },
//             {
//               icon: "fa-industry",
//               title: "Process Chemicals",
//               desc: "Efficient and safe process operations.",
//             },
//             {
//               icon: "fa-oil-can",
//               title: "Petrochemicals",
//               desc: "High grade petrochemicals for diverse industries.",
//             },
//             {
//               icon: "fa-leaf",
//               title: "Green Chemicals",
//               desc: "Environmentally responsible & sustainable solutions.",
//             },
//           ].map((item, index) => (
//             <div className="product-card" key={index}>
//               <div className="icon-wrapper">
//                 <i className={`fas ${item.icon}`}></i>
//               </div>
//               <h3>{item.title}</h3>
//               <p>{item.desc}</p>
//               <Link to="/products" className="view-link">
//                 VIEW PRODUCTS{" "}
//                 <i
//                   className="fas fa-arrow-right"
//                   style={{ fontSize: "0.8rem", marginLeft: "5px" }}
//                 ></i>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- ABOUT PREVIEW --- */}
//       <section className="container about-section">
//         <div className="about-image">
//           <img src="/image7.jpg" alt="Industrial Plant" />
//         </div>
//         <div className="about-content">
//           <h3 className="subtitle">ABOUT US</h3>
//           <h2>Reliable Partner. Superior Solutions.</h2>
//           <p>
//             CREST BIOSCIENTIFIC is a leading manufacturer and supplier of high
//             quality chemicals, solvents and specialty products.
//           </p>
//           <div className="stats">
//             <div className="stat-item">
//               <h4>25+</h4>
//               <p>Years of Exp.</p>
//             </div>
//             <div className="stat-item">
//               <h4>500+</h4>
//               <p>Happy Customers</p>
//             </div>
//             <div className="stat-item">
//               <h4>100+</h4>
//               <p>Product Variants</p>
//             </div>
//             <div className="stat-item">
//               <h4>10+</h4>
//               <p>Countries Served</p>
//             </div>
//           </div>
//           <Link to="/about" className="btn-outline">
//             KNOW MORE ABOUT US →
//           </Link>
//         </div>
//       </section>

//       {/* --- WHY CHOOSE US --- */}
//       <section className="why-choose-us-section">
//         <div className="container">
//           <span className="sub-heading">WHY CHOOSE US</span>
//           <h2 className="main-heading">Commitment to Quality. Focused on You.</h2>
//           <div className="features-list" ref={featuresListRef}>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-check"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Quality Assurance</h3>
//                 <p>
//                   Strict quality control and testing to deliver the best
//                   products.
//                 </p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-gears"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Advanced Technology</h3>
//                 <p>
//                   Modern infrastructure and advanced manufacturing processes.
//                 </p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-user-tie"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Expert Team</h3>
//                 <p>Experienced professionals ensuring customer satisfaction.</p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <div className="icon-wrapper">
//                 <i className="fa-solid fa-leaf"></i>
//               </div>
//               <div className="feature-text">
//                 <h3>Sustainability</h3>
//                 <p>Committed to safe practices and a sustainable future.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- EVENTS PREVIEW --- */}
//       <section className="container events-section">
//         <div className="events-header">
//           <div>
//             <p className="subtitle">UPCOMING EVENTS</p>
//             <h2 className="section-heading">
//               Meet Us at Industry Leading Events
//             </h2>
//           </div>
//           <Link to="/events" className="view-all-link">
//             VIEW ALL EVENTS <i className="fas fa-arrow-right"></i>
//           </Link>
//         </div>
//         <div className="events-grid">
//           {[
//             {
//               src: "/idmwbSRRx4_logos.png",
//               alt: "ICC",
//               date: "26 - 28 November 2024",
//               title: "ICC Annual Conference 2024",
//               location: "India Expo Centre, Greater Noida",
//             },
//             {
//               src: "/chemspec-europe-logo-vector.png",
//               alt: "Chemspec",
//               date: "05 - 06 June 2024",
//               title: "Chemspec Europe 2024",
//               location: "Koelnmesse, Cologne, Germany",
//             },
//             {
//               src: "/iduBzsPe-8_1785830344236.png",
//               alt: "CPM",
//               date: "04 - 06 December 2024",
//               title: "CPM India 2024",
//               location: "Bombay Exhibition Centre, Mumbai",
//             },
//           ].map((event, index) => (
//             <div className="event-card" key={index}>
//               <div className="event-logo-area">
//                 <img src={event.src} alt={event.alt} />
//               </div>
//               <div className="event-details">
//                 <div className="event-meta">
//                   <i className="fas fa-calendar-alt"></i>
//                   <span>{event.date}</span>
//                 </div>
//                 <h4>{event.title}</h4>
//                 <div className="event-location">
//                   <i className="fas fa-map-marker-alt"></i>
//                   <span>{event.location}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../api"; // Connects to your backend

function Home() {
  // --- 1. SLIDESHOW DATA ---
  const slides = [
    {
      image: "/image14.jpg",
      title: "Innovative Chemical\nSolutions for a Better\nTomorrow",
      desc: "High performance chemicals and solvents for a wide range of industrial applications.",
    },
    {
      image: "/image2.jpg",
      title: "Sustainable & Green\nChemistry Solutions\n ABOUT US",
      desc: "Environmentally responsible products designed for a cleaner, greener future.",
      linkTo: "/about",
    },
    {
      image: "/image3.jpg",
      title: "Advanced Laboratory\nReagents & Specialties",
      desc: "High-purity lab chemicals and specialty reagents tailored for cutting-edge research.",
    },
    {
      image: "/image4.jpg",
      title: "Industrial-Grade\nProcess Chemicals",
      desc: "Reliable and efficient process chemicals for petrochemicals and manufacturing industries.",
    },
    {
      image: "/image6.jpg",
      title: "Global Supply Chain &\nTimely Delivery",
      desc: "Ensuring worldwide availability with on-time delivery and premium quality standards.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  // --- 2. AUTO PLAY LOGIC ---
  // const resetTimer = () => {
  //   if (timerRef.current) clearInterval(timerRef.current);
  //   timerRef.current = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 5000);
  // };

  // useEffect(() => {
  //   resetTimer();
  //   return () => clearInterval(timerRef.current);
  // }, [slides.length]);
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000,
    );
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  // --- 3. MANUAL SLIDER ARROWS ---
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  // --- 4. LIVE DATA FROM BACKEND ---
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [packagings, setPackagings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await api.get("/dashboard/products/list");
        setProducts(productRes.data || []);

        const eventRes = await api.get("/dashboard/events/list");
        setEvents(eventRes.data || []);

        const blogRes = await api.get("/dashboard/blogs/list");
        setBlogs(blogRes.data || []);
        
        const packRes = await api.get("/dashboard/packagings/list");
        setPackagings(packRes.data || []);
      } catch (err) {
        console.error("Failed to fetch data from backend:", err.message);
      }
    };
    fetchData();
  }, []);

  // --- 5. SPLIT PRODUCTS BY CATEGORY ---
  // const labChemicals = products.filter(
  //   (p) => p.category?.trim() === "Laboratory Chemicals",
  // );
  // const labGlasswares = products.filter(
  //   (p) => p.category?.trim() === "Laboratory Glasswares",
  // );

  // --- 6. SCROLL ANIMATION LOGIC ---
  const featuresListRef = useRef(null);
  const aboutSectionRef = useRef(null);
  // 🆕 ADD THE NEW REF HERE
  const industriesRef = useRef(null);

  // --- Existing useEffect for features ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (featuresListRef.current) {
      const featureTexts =
        featuresListRef.current.querySelectorAll(".feature-text");
      featureTexts.forEach((text, index) => {
        text.style.animationDelay = index * 0.15 + "s";
        observer.observe(text);
      });
    }
    return () => {
      if (featuresListRef.current) {
        const featureTexts =
          featuresListRef.current.querySelectorAll(".feature-text");
        featureTexts.forEach((text) => observer.unobserve(text));
      }
    };
  }, []);

  // --- Existing useEffect for About section ---
  useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-about");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (aboutSectionRef.current) {
      const aboutImage = aboutSectionRef.current.querySelector(".about-image");
      const aboutContent =
        aboutSectionRef.current.querySelector(".about-content");
      if (aboutImage) aboutObserver.observe(aboutImage);
      if (aboutContent) aboutObserver.observe(aboutContent);
    }
    return () => {
      /* cleanup */
    };
  }, []);

  // 🆕 NEW useEffect for Industries Section — ADD THIS ENTIRE BLOCK
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find all .industry-card children inside the observed container
            entry.target
              .querySelectorAll(".industry-card")
              .forEach((card, i) => {
                setTimeout(() => {
                  card.classList.add("animate-in");
                }, i * 120); // Stagger each card
              });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (industriesRef.current) {
      observer.observe(industriesRef.current);
    }

    return () => {
      if (industriesRef.current) {
        observer.unobserve(industriesRef.current);
      }
    };
  }, []); // Empty dependency array – runs once on mount

   // --- 4. UNIVERSAL SCROLL ANIMATION OBSERVER ---
  const animatedSectionsRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-in");
      });
    }, { threshold: 0.15 });
    if (animatedSectionsRef.current) {
      const targets = animatedSectionsRef.current.querySelectorAll(".feature-text, .quality-card, .industry-image-card, .featured-card, .testimonial-card");
      targets.forEach((item, i) => { item.style.transitionDelay = i * 0.1 + "s"; observer.observe(item); });
    }
    return () => { /* cleanup */ };
  }, []);
  
  return (
    <>
      {/* --- HERO SECTION (SYNCED ANIMATION + ARROWS) --- */}
      <section className="hero">
        <div className="hero-background">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            if (slide.linkTo) {
              return (
                <Link
                  key={index}
                  to={slide.linkTo}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    zIndex: 1,
                  }}
                >
                  <div
                    className={`hero-slide ${isActive ? "active" : ""}`}
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  ></div>
                </Link>
              );
            }
            return (
              <div
                key={index}
                className={`hero-slide ${isActive ? "active" : ""}`}
                style={{ backgroundImage: `url('${slide.image}')` }}
              ></div>
            );
          })}
        </div>

        <div className="hero-content">
          <h1 style={{ whiteSpace: "pre-line" }}>
            {slides[currentSlide].title.split("\n").map((line, idx) => {
              const isAboutUs =
                line.trim() === "ABOUT US" && slides[currentSlide].linkTo;
              if (isAboutUs) {
                return (
                  <React.Fragment key={idx}>
                    <br />
                    <Link
                      to={slides[currentSlide].linkTo}
                      className="about-slide-link"
                    >
                      ABOUT US
                    </Link>
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <br />}
                  {line}
                </React.Fragment>
              );
            })}
          </h1>
          <p key={currentSlide + "-desc"} className="hero-text-anim">
            {slides[currentSlide].desc}
          </p>
          {!slides[currentSlide].linkTo && (
            <Link to="/products" className="btn-primary">
              EXPLORE PRODUCTS →
            </Link>
          )}
        </div>

        <button className="hero-arrow hero-arrow-left" onClick={handlePrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="hero-arrow hero-arrow-right" onClick={handleNext}>
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="hero-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => {
                setCurrentSlide(index);
                resetTimer();
              }}
            ></span>
          ))}
        </div>

        {/* <a
          href="https://wa.me/919876543210"
          className="whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp" style={{ fontSize: "1.5rem" }}></i>{" "}
          Chat on WhatsApp
        </a> */}
      </section>

      {/* --- FLOATING SEARCH --- */}
      <div
        className="container"
        style={{ position: "relative", marginBottom: "30px" }}
      >
        <div className="search-container-floating">
          <div
            className="search-wrapper"
            style={{
              padding: "15px 20px",
              margin: 0,
              gap: "10px",
              background: "transparent",
              boxShadow: "none",
              justifyContent: "center", // Centers the keywords
            }}
          >
            <div
              className="search-features"
              style={{
                color: "#002D5A",
                fontSize: "0.9rem", // Slightly larger
                fontWeight: "600",
                width: "100%",
                justifyContent: "center", 
                gap: "35px", 
                flexWrap: "wrap",
              }}
            >
              <span className="keyword-item">
                <i className="fas fa-flask"></i> Wide Range
              </span>
              <span className="keyword-item">
                <i className="fas fa-check-circle"></i> Premium
              </span>
              <span className="keyword-item">
                <i className="fas fa-truck"></i> Fast Delivery
              </span>
              <span className="keyword-item">
                <i className="fas fa-headset"></i> Support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT CATEGORIES (GROUPED BY CATEGORY) --- */}
      {/*}
      <section
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        <div className="section-title">
          <p className="subtitle">OUR PRODUCT CATEGORIES</p>
          <h2>High Quality Chemical Solutions</h2>
        </div>

        {/* Category 1: Laboratory Chemicals */}
      {/* {labChemicals.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h3
              style={{
                color: "#002D5A",
                fontSize: "1.6rem",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <i className="fas fa-flask" style={{ marginRight: "10px" }}></i>{" "}
              Laboratory Chemicals
            </h3>
            <div className="product-grid">
              {labChemicals.map((item) => (
                <div className="product-card" key={item._id}>
                  <div className="icon-wrapper">
                    <i className="fas fa-flask"></i>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <Link to="/products" className="view-link">
                    VIEW PRODUCTS{" "}
                    <i
                      className="fas fa-arrow-right"
                      style={{ fontSize: "0.8rem", marginLeft: "5px" }}
                    ></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )} */}

      {/* Category 2: Laboratory Glasswares */}
      {/* {labGlasswares.length > 0 && (
          <div>
            <h3
              style={{
                color: "#002D5A",
                fontSize: "1.6rem",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <i className="fas fa-flask" style={{ marginRight: "10px" }}></i>{" "}
              Laboratory Glasswares
            </h3>
            <div className="product-grid">
              {labGlasswares.map((item) => (
                <div className="product-card" key={item._id}>
                  <div className="icon-wrapper">
                    <i className="fas fa-flask"></i>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <Link to="/products" className="view-link">
                    VIEW PRODUCTS{" "}
                    <i
                      className="fas fa-arrow-right"
                      style={{ fontSize: "0.8rem", marginLeft: "5px" }}
                    ></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback if no products exist in those exact categories */}
      {/* {labChemicals.length === 0 &&
          labGlasswares.length === 0 &&
          products.length > 0 && (
            <div
              style={{ textAlign: "center", color: "#666", marginTop: "30px" }}
            >
              No products found in "Laboratory Chemicals" or "Laboratory
              Glasswares" yet.
            </div>
          )}
      </section>  */}

      {/* ============================================================
          🆕  INDUSTRIES WE SERVE  — (your new section)
          ============================================================ */}
      <section className="industries-section">
        <div className="container">
          <div className="section-title">
            <p className="subtitle">INDUSTRIES WE SERVE</p>
            <h2>Trusted by Leading Industries Worldwide</h2>
            <p className="industries-subtitle">
              Our high-quality chemical solutions power innovation across
              diverse sectors
            </p>
          </div>

          <div className="industries-grid" ref={industriesRef}>
            {[
              {
                id: 1,
                image: "/image1.jpg",
                icon: "fa-pills",
                title: "Pharmaceuticals",
                desc: "High-purity solvents and reagents for drug discovery, development, and manufacturing.",
                color: "#0B3B5C",
              },
              {
                id: 2,
                image: "/image2.jpg",
                icon: "fa-oil-can",
                title: "Petrochemicals",
                desc: "Specialty chemicals and process aids for refining, polymer production, and fuel additives.",
                color: "#1A4A3A",
              },
              {
                id: 3,
                image: "/image3.jpg",
                icon: "fa-seedling",
                title: "Agriculture",
                desc: "Crop protection chemicals, fertilizers, and soil conditioners for sustainable farming.",
                color: "#2D5A27",
              },
              {
                id: 4,
                image: "/image4.jpg",
                icon: "fa-utensils",
                title: "Food & Beverage",
                desc: "Food-grade additives, preservatives, and sanitizing agents for safe production.",
                color: "#7A4A1A",
              },
              {
                id: 5,
                image: "/image6.jpg",
                icon: "fa-spa",
                title: "Cosmetics & Personal Care",
                desc: "Gentle surfactants, emollients, and active ingredients for premium beauty products.",
                color: "#6B3A5C",
              },
              {
                id: 6,
                image: "/image7.jpg",
                icon: "fa-microscope",
                title: "Research & Development",
                desc: "Ultra-pure lab chemicals and analytical standards for cutting-edge scientific research.",
                color: "#2A3A6B",
              },
            ].map((industry, index) => (
              <div
                key={industry.id}
                className={`industry-card ${index < 3 ? "delay-1" : "delay-2"}`}
                style={{ "--card-color": industry.color }}
              >
                <div
                  className="industry-bg"
                  style={{ backgroundImage: `url('${industry.image}')` }}
                />
                <div className="industry-overlay" />
                <div className="industry-content">
                  <div className="industry-icon-wrapper">
                    <i className={`fas ${industry.icon}`}></i>
                  </div>
                  <h3>{industry.title}</h3>
                  <p>{industry.desc}</p>
                  {/* <span className="industry-learn-more">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT PREVIEW (Completely Redesigned) --- */}

      <section className="about-section">
        <div className="about-card">
          {/* ================= LEFT IMAGE ================= */}
          <div className="about-image-wrapper">
            <img
              src="/image7.jpg"
              alt="CREST Biocorative Industrial Facility"
              className="about-image"
            />
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="about-content">
            <div className="about-heading-area">
              <p className="about-tag">
                ABOUT US
                <span className="about-tag-line"></span>
              </p>

              <h2>
                Reliable Partner.
                <br />
                Superior Solutions.
              </h2>

              <p className="about-description">
                CREST Biocorative is a leading manufacturer and supplier of high
                quality chemicals, solvents and specialty products.
              </p>
            </div>

            {/* ================= STATS ================= */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-award"></i>
                </div>

                <div className="stat-info">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years of Exp.</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>

                <div className="stat-info">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-flask"></i>
                </div>

                <div className="stat-info">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Product Variants</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-globe"></i>
                </div>

                <div className="stat-info">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Countries Served</span>
                </div>
              </div>
            </div>

            {/* ================= BUTTON ================= */}
            <Link to="/about" className="about-btn">
              KNOW MORE ABOUT US
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="why-choose-us-section">
        <div className="container">
          <span className="sub-heading">WHY CHOOSE US</span>
          <h2 className="main-heading">
            Commitment to Quality. Focused on You.
          </h2>
          <div className="features-list" ref={featuresListRef}>
            {[
              {
                icon: "fa-check",
                title: "Quality Assurance",
                desc: "Strict quality control and testing to deliver the best products.",
              },
              {
                icon: "fa-gears",
                title: "Advanced Technology",
                desc: "Modern infrastructure and advanced manufacturing processes.",
              },
              {
                icon: "fa-user-tie",
                title: "Expert Team",
                desc: "Experienced professionals ensuring customer satisfaction.",
              },
              {
                icon: "fa-leaf",
                title: "Sustainability",
                desc: "Committed to safe practices and a sustainable future.",
              },
            ].map((item, idx) => (
              <div className="feature-item" key={idx}>
                <div className="icon-wrapper">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <div className="feature-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PARTNERS & INSIGHTS SECTION --- */}
      <section className="partners-section">
        <div className="container">
          {/* CTA Banner */}
          <div className="cta-banner">
            <h2>Ready to Partner with Us?</h2>
            <p>Get in touch today for custom quotes, bulk orders, and technical support.</p>
            <Link to="/contact" className="btn-primary cta-btn">
              CONTACT SALES TEAM →
            </Link>
          </div>

          {/* Testimonials & Stats - 3 Column Layout */}
          <h3 className="main-section-title">Trusted by Scientists, Chosen Worldwide.</h3>
          <div className="testimonials-layout">
            
            {/* LEFT: Featured Testimonial */}
            <div className="featured-testimonial">
              <span className="quote-mark">“</span>
              <p>
                The product quality, documentation, and technical support provided
                by Crest Bioscientific are truly world-class. They understand our
                needs and deliver beyond expectations.
              </p>
              <div className="author">
                <img src="/image1.jpg" alt="Prof. David Miller" />
                <div>
                  <strong>Prof. David Miller <span className="flag">🇬🇧</span></strong>
                  <span>Head of Research, Research Institute</span>
                </div>
              </div>
            </div>

            {/* MIDDLE: Small Testimonials */}
            <div className="small-testimonials">
              <div className="small-testimonial">
                <img src="/image2.jpg" alt="Anika Sharma" className="author-img" />
                <div>
                  <span className="quote-mark">“</span>
                  <p>Reliable sourcing and timely shipments—exactly what we need for our lab operations.</p>
                  <div className="author">
                    <strong>Anika Sharma <span className="flag">🇮🇳</span></strong>
                    <span>Purchase Manager, Biotech Co.</span>
                  </div>
                </div>
              </div>
              <div className="small-testimonial">
                <img src="/image3.jpg" alt="James Lee" className="author-img" />
                <div>
                  <span className="quote-mark">“</span>
                  <p>Working with Crest has been a smooth and transparent experience from day one.</p>
                  <div className="author">
                    <strong>James Lee <span className="flag">🇰🇷</span></strong>
                    <span>Supply Chain Lead, Industrial Client</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Stats Panel */}
            <div className="stats-panel">
              <div>
                <h3>Trusted Across</h3>
                <div className="big-stat">25+</div>
                <div className="stat-label">Countries</div>
                <img src="/image23.jpg" alt="Globe" className="globe-img" />
                <p>Delivering quality chemicals to laboratories and industries worldwide.</p>
              </div>
              <div className="mini-stats">
                <div className="mini-stat">
                  <strong>5K+</strong>
                  <span>Products</span>
                </div>
                <div className="mini-stat">
                  <strong>1K+</strong>
                  <span>Happy Clients</span>
                </div>
                <div className="mini-stat">
                  <strong>99%</strong>
                  <span>On-time Delivery</span>
                </div>
              </div>
            </div>

          </div>

 {/* --- KNOWLEDGE HUB (REPLACED WITH API DATA) --- */}
           <section className="knowledge-hub">
        <div className="container">
          <div className="knowledge-hub-header">
            <h3 className="section-subtitle">Knowledge Hub</h3>
            <Link to="/blog" className="view-all-link">View All Articles →</Link>
          </div>

          <div className="knowledge-articles" ref={animatedSectionsRef}>
            {blogs.slice(0, 3).map((blog) => (
              <div className="knowledge-article-card" key={blog._id}>
                <div className="knowledge-top-row">
                  <span className="knowledge-number">0{blogs.indexOf(blog) + 1}</span>
                  <div className="knowledge-meta">
                    <span className="insight-tag">{blog.category}</span>
                    <span className="insight-date">{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <h4>{blog.title}</h4>
                <p>{blog.excerpt || "Read our latest article."}</p>
                <div className="knowledge-image">
                  <img src={blog.coverImage || '/image4.jpg'} alt={blog.title} />
                </div>
                <Link to={`/blog/${blog._id}`} className="knowledge-link">
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


        </div>
      </section>

      {/* --- EVENTS PREVIEW --- */}
      <section className="container events-section">
        <div className="events-header">
          <div>
            <p className="subtitle">UPCOMING EVENTS</p>
            <h2 className="section-heading">
              Meet Us at Industry Leading Events
            </h2>
          </div>
          <Link to="/events" className="view-all-link">
            VIEW ALL EVENTS <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="events-grid">
          {events.slice(0, 3).map((event) => (
            <div className="event-card" key={event._id}>
              <div className="event-logo-area">
                <img
                  src={event.imageUrl || "/placeholder.jpg"}
                  alt={event.title}
                />
              </div>
              <div className="event-details">
                <div className="event-meta">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <h4>{event.title}</h4>
                <div className="event-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
