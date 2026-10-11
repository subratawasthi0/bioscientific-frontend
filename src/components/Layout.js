import React, { useState, useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import { api } from "../api";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false); 

const [categories, setCategories] = useState([]);
const [subCategories, setSubCategories] = useState({});

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await api.get("/dashboard/categories/list");

      const result = response?.data?.data ?? response?.data ?? [];
      const categoryList = Array.isArray(result) ? result : [];

      setCategories(categoryList);

      const subCategoryResults = await Promise.all(
        categoryList.map(async (category) => {
          try {
            const subResponse = await api.get(
              `/dashboard/subcategories/list?categoryId=${encodeURIComponent(
                category._id
              )}`
            );

            const subResult =
              subResponse?.data?.data ?? subResponse?.data ?? [];

            return [
              category._id,
              Array.isArray(subResult) ? subResult : [],
            ];
          } catch (error) {
            console.error(
              `Error loading subcategories for ${category.name}:`,
              error
            );

            return [category._id, []];
          }
        })
      );

      setSubCategories(Object.fromEntries(subCategoryResults));
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  fetchCategories();
}, []);

const closeMenu = () => {
  setIsMenuOpen(false);
  setIsProductsOpen(false);
};
  return (
    <div className="App">
      {/* --- NAVBAR --- */}
      <nav className="navbar container">
        <div className="logo">
          <img
            src="/logo_cb.png"
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span
            style={{ color: "#002D5A", fontWeight: "bold", fontSize: "1.4rem" }}
          >
            CREST
          </span>
          <span
            style={{
              color: "#0AA5AD",
              fontWeight: "normal",
              fontSize: "1.4rem",
            }}
          >
            &nbsp;BIOSCIENTIFIC
          </span>
        </div>

        {/* Hamburger Button */}
        <button
          className="menu-toggle-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        {/* Nav Links */}
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
          </li>

          {/* --- UPDATED: PRODUCTS DROPDOWN --- */}
        
{/* Dynamic Products Dropdown */}
<li
  className={`dropdown-li ${isProductsOpen ? "open" : ""}`}
>
  <span
    className="dropdown-trigger"
    onClick={() => setIsProductsOpen(!isProductsOpen)}
  >
    Products <i className="fas fa-chevron-down"></i>
  </span>

  <ul className="dropdown-menu">
    {/* Show all products */}
    <li>
      <Link to="/products" onClick={closeMenu}>
        All Products
      </Link>
    </li>

    {/* Categories from backend */}
    {categories.map((category) => (
      <li className="submenu-li" key={category._id}>
        <Link
          to={`/products?category=${encodeURIComponent(category._id)}`}
          onClick={closeMenu}
        >
          {category.name}
        </Link>

        {/* Subcategories from backend */}
        {subCategories[category._id]?.length > 0 && (
          <ul className="submenu">
            {subCategories[category._id].map((subCategory) => (
              <li key={subCategory._id}>
                <Link
                  to={`/products?category=${encodeURIComponent(
                    category._id
                  )}&subcategory=${encodeURIComponent(
                    subCategory._id
                  )}`}
                  onClick={closeMenu}
                >
                  {subCategory.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
</li>


          <li>
            <Link to="/packaging" onClick={() => setIsMenuOpen(false)}>
              Packaging
            </Link>
          </li>

          <li>
            <Link to="/downloads" onClick={() => setIsMenuOpen(false)}>
              Downloads
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* --- PAGE CONTENT --- */}
      <Outlet />

      {/* --- FOOTER --- */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div
                className="logo"
                style={{ color: "white", marginBottom: "15px" }}
              >
                CREST&nbsp;
                <span style={{ fontWeight: "normal" }}>BIOSCIENTIFIC</span>
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                Delivering high performance chemicals worldwide.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/packaging">Packaging</Link>
                </li>

                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt"></i> 123, Industrial
                  Area, Mumbai
                </li>
                <li>
                  <i className="fas fa-phone"></i> +91 7307426866
                </li>
                <li>
                  <i className="fas fa-envelope"></i> info@crestbioscientific.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
