import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import "./styles/Admin.css";

// Import all public pages
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Events from "./components/Events";
import Contact from "./components/Contact";
import SubmitEvent from "./components/SubmitEvent";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import Packaging from "./components/Packaging"; 

// Import Admin pages
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Downloads from "./components/Downloads"; // Import the Downloads component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
           <Route path="packaging" element={<Packaging />} /> 
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetails />} />

          {/* 👈 ADD THIS ROUTE HERE */}
          <Route path="submit-event" element={<SubmitEvent />} />
        </Route>

        {/* --- ADMIN ROUTE --- */}
        <Route
          path="/admin"
          element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
