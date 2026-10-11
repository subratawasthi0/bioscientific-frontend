
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});

  // Fetch categories and their subcategories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/dashboard/categories/list");
        const data = response?.data?.data ?? response?.data ?? [];
        const categoryList = Array.isArray(data) ? data : [];

        setCategories(categoryList);

        const results = await Promise.all(
          categoryList.map(async (category) => {
            try {
              const subResponse = await api.get(
                `/dashboard/subcategories/list?categoryId=${category._id}`
              );

              const subData =
                subResponse?.data?.data ?? subResponse?.data ?? [];

              return [
                category._id,
                Array.isArray(subData) ? subData : [],
              ];
            } catch (error) {
              console.error(
                `Error fetching subcategories for ${category.name}:`,
                error
              );
              return [category._id, []];
            }
          })
        );

        setSubCategories(Object.fromEntries(results));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setIsProductsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        CREST <span>BIOSCIENTIFIC</span>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-bars"></i>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/about" onClick={closeMenu}>
          About Us
        </Link>

        {/* Products dropdown */}
        <div
          className={`dropdown-li ${isProductsOpen ? "open" : ""}`}
        >
          <span
            className="dropdown-trigger"
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            Products <i className="fas fa-chevron-down"></i>
          </span>

          <ul className="dropdown-menu">
            {/* All products */}
            <li>
              <Link to="/products" onClick={closeMenu}>
                All Products
              </Link>
            </li>

            {/* Dynamic categories */}
            {categories.map((category) => (
              <li className="submenu-li" key={category._id}>
                <Link
                  to={`/products?category=${encodeURIComponent(category._id)}`}
                  onClick={closeMenu}
                >
                  {category.name}
                </Link>

                {/* Dynamic subcategories */}
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
        </div>

        <Link to="/downloads" onClick={closeMenu}>
          Downloads
        </Link>

        <Link to="/service-support" onClick={closeMenu}>
          Service &amp; Support
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;