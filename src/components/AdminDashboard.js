import React, { useState, useEffect } from "react";
import { api } from "../api";
import "../styles/Admin.css";

// ==========================================
// REUSABLE FORM COMPONENTS
// ==========================================
function Field({ label, name, type = "text", defaultValue, required }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue || ""}
        data-field={name}
        required={required}
      />
    </div>
  );
}

function SelectField({ label, name, defaultValue, options, required }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        defaultValue={defaultValue || options[0]}
        data-field={name}
        required={required}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, name, defaultValue, rows = 4, required }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        defaultValue={defaultValue || ""}
        data-field={name}
        rows={rows}
        required={required}
      ></textarea>
    </div>
  );
}

function Modal({ title, children, onSave, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const formElements = e.target.elements;
    for (let el of formElements) {
      if (el.dataset.field) formData[el.dataset.field] = el.value;
    }
    const fileInput = document.getElementById("modalFileInput");
    onSave(e, formData, fileInput);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [packagings, setPackagings] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [events, setEvents] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  // --- 1. Fetch Data (USING /list) ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let endpoint = "";
        let setter = null;
        switch (activeTab) {
          case "products":
            endpoint = "/dashboard/products/list";
            setter = setProducts;
            break;
          case "packaging":
            endpoint = "/dashboard/packagings/list";
            setter = setPackagings;
            break;
          case "catalogue":
            endpoint = "/dashboard/catalogues/list";
            setter = setCatalogues;
            break;
          case "events":
            endpoint = "/dashboard/events/list";
            setter = setEvents;
            break;
          case "enquiries":
            endpoint = "/dashboard/enquiries/list";
            setter = setEnquiries;
            break;
          case "blogs":
            endpoint = "/dashboard/blogs/list";
            setter = setBlogs;
            break;
          default:
            break;
        }
        if (endpoint && setter) {
          const res = await api.get(endpoint);
          setter(res.data);
        }
      } catch (err) {
        alert("Failed to fetch data: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  // --- Filtering Logic for Products ---
  const filteredProducts =
    categoryFilter === "All"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  const openAddModal = () => {
    setModalType("add");
    setCurrentItem(null);
    setIsModalOpen(true);
  };
  const openEditModal = (item) => {
    setModalType("edit");
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  // --- 2. The Central Save Logic (USING /add and /update/:id) ---
  const handleSave = async (e, formData, fileInput) => {
    e.preventDefault();
    try {
      let finalPayload = { ...formData };
      let setter = null;

      // Step A: Upload Image if a file was selected
      // UPDATED TO USE YOUR EXACT UPLOAD API
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileFormData = new FormData();
        fileFormData.append("file", file);

        let folder = "general-uploads";
        if (activeTab === "catalogue") folder = "catalogues";
        else if (activeTab === "events") folder = "events";
        else if (activeTab === "packaging") folder = "packaging";
        else if (activeTab === "blogs") folder = "blogs";

        fileFormData.append("folder", folder);

        // ✅ CALLING YOUR EXACT UPLOAD API HERE
        const uploadRes = await api.post(
          "/dashboard/common/upload",
          fileFormData,
          true,
        );
        const fileUrl = uploadRes.data.url;

        if (activeTab === "catalogue") finalPayload.fileUrl = fileUrl;
        else if (activeTab === "events" || activeTab === "packaging")
          finalPayload.imageUrl = fileUrl;
        else if (activeTab === "blogs") finalPayload.coverImage = fileUrl;
      }

      // Step B: Determine endpoint
      let endpoint = "";
      switch (activeTab) {
        case "products":
          endpoint = "/dashboard/products";
          setter = setProducts;
          break;
        case "packaging":
          endpoint = "/dashboard/packagings";
          setter = setPackagings;
          break;
        case "catalogue":
          endpoint = "/dashboard/catalogues";
          setter = setCatalogues;
          break;
        case "events":
          endpoint = "/dashboard/events";
          setter = setEvents;
          break;
        case "enquiries":
          endpoint = "/dashboard/enquiries";
          setter = setEnquiries;
          break;
        case "blogs":
          endpoint = "/dashboard/blogs";
          setter = setBlogs;
          break;
        default:
          return;
      }

      // Step C: Call Add or Update API
      let res;
      if (modalType === "add") {
        // POST to /add
        res = await api.post(`${endpoint}/add`, finalPayload);
        setter((prev) => [...prev, res.data]);
      } else {
        // PUT to /update/:id
        res = await api.put(
          `${endpoint}/update/${currentItem._id}`,
          finalPayload,
        );
        setter((prev) =>
          prev.map((item) => (item._id === res.data._id ? res.data : item)),
        );
      }

      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to save item: " + err.message);
    }
  };

  // --- 3. Delete Logic (USING /:id) ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      let endpoint = "";
      let setter = null;
      switch (activeTab) {
        case "products":
          endpoint = "/dashboard/products";
          setter = setProducts;
          break;
        case "packaging":
          endpoint = "/dashboard/packagings";
          setter = setPackagings;
          break;
        case "catalogue":
          endpoint = "/dashboard/catalogues";
          setter = setCatalogues;
          break;
        case "events":
          endpoint = "/dashboard/events";
          setter = setEvents;
          break;
        case "enquiries":
          endpoint = "/dashboard/enquiries";
          setter = setEnquiries;
          break;
        case "blogs":
          endpoint = "/dashboard/blogs";
          setter = setBlogs;
          break;
        default:
          return;
      }
      await api.delete(`${endpoint}/${id}`);
      setter((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ textAlign: "center", padding: "40px" }}>
          Loading data...
        </div>
      );
    }

    const renderModal = (title, fields, extraFields = null) => (
      <Modal
        title={title}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      >
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              defaultValue={currentItem ? currentItem[field.name] || "" : ""}
              data-field={field.name}
              required={field.required}
            />
          </div>
        ))}
        {extraFields}
        <div className="form-group">
          <label>Upload File (Optional)</label>
          <input type="file" id="modalFileInput" />
        </div>
      </Modal>
    );

    // --- PRODUCTS TAB ---
    if (activeTab === "products") {
      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <button className="btn-primary-admin" onClick={openAddModal}>
              + Add Product
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#f8fafc",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  color: "#002D5A",
                }}
              >
                Filter by Category:
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #002D5A",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: "white",
                  color: "#002D5A",
                  fontWeight: "500",
                }}
              >
                <option value="All">All Categories</option>
                <option value="Laboratory Chemicals">
                  Laboratory Chemicals
                </option>
                <option value="Laboratory Glasswares">
                  Laboratory Glasswares
                </option>
              </select>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price}</td>
                    <td>{p.stockQuantity}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEditModal(p)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(modalType === "add" ? "Add Product" : "Edit Product", [
              { name: "name", label: "Product Name", required: true },
              { name: "category", label: "Category", required: true },
              { name: "price", label: "Price", type: "number", required: true },
              {
                name: "stockQuantity",
                label: "Stock Quantity",
                type: "number",
              },
              { name: "description", label: "Description" },
            ])}
        </div>
      );
    }

    // --- PACKAGING TAB ---
    if (activeTab === "packaging") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>
            + Add Packaging
          </button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packagings.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.imageUrl || "/placeholder.png"}
                        alt="Pack"
                        className="table-img"
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.type}</td>
                    <td>{p.capacity}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEditModal(p)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(
              modalType === "add" ? "Add Packaging" : "Edit Packaging",
              [
                { name: "name", label: "Packaging Name", required: true },
                {
                  name: "type",
                  label: "Type (e.g. Drum, Vial)",
                  required: true,
                },
                { name: "capacity", label: "Capacity", required: true },
                { name: "material", label: "Material" },
              ],
            )}
        </div>
      );
    }

    // --- CATALOGUE TAB ---
    if (activeTab === "catalogue") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>
            + Add Catalogue
          </button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>File URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {catalogues.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.productCategory}</td>
                    <td>
                      <a href={c.fileUrl} target="_blank" rel="noreferrer">
                        View PDF
                      </a>
                    </td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEditModal(c)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(c._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(
              modalType === "add" ? "Add Catalogue" : "Edit Catalogue",
              [
                { name: "title", label: "Catalogue Title", required: true },
                { name: "productCategory", label: "Product Category" },
                { name: "description", label: "Description" },
              ],
            )}
        </div>
      );
    }

    // --- EVENTS TAB ---
    if (activeTab === "events") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>
            + Add Event
          </button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <img
                        src={e.imageUrl || "/placeholder.png"}
                        alt="Event"
                        className="table-img"
                      />
                    </td>
                    <td>{e.title}</td>
                    <td>{new Date(e.eventDate).toLocaleDateString()}</td>
                    <td>{e.location}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEditModal(e)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(e._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen &&
            renderModal(modalType === "add" ? "Add Event" : "Edit Event", [
              { name: "title", label: "Event Title", required: true },
              {
                name: "eventDate",
                label: "Event Date",
                type: "date",
                required: true,
              },
              { name: "location", label: "Location", required: true },
              { name: "description", label: "Description" },
            ])}
        </div>
      );
    }

    // --- ENQUIRIES TAB ---
    if (activeTab === "enquiries") {
      return (
        <div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Updated By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <strong>{e.name}</strong>
                    </td>
                    <td>{e.email}</td>
                    <td>{e.message?.substring(0, 30)}...</td>
                    <td
                      style={{
                        color:
                          e.status === "New"
                            ? "#ff4d4f"
                            : e.status === "In Review"
                              ? "#faad14"
                              : "#52c41a",
                        fontWeight: "bold",
                      }}
                    >
                      {e.status}
                    </td>
                    <td>{e.updatedBy}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEditModal(e)}
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <Modal
              title="Update Enquiry"
              onSave={handleSave}
              onClose={() => setIsModalOpen(false)}
            >
              <div className="form-group">
                <label>Update Status</label>
                <select
                  defaultValue={currentItem?.status || "New"}
                  data-field="status"
                >
                  <option value="New">New</option>
                  <option value="Read">Mark as Read</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assign To / Update By</label>
                <input
                  type="text"
                  placeholder="e.g. Sales Team"
                  defaultValue={currentItem?.updatedBy || ""}
                  data-field="updatedBy"
                />
              </div>
            </Modal>
          )}
        </div>
      );
    }

    // --- BLOGS TAB ---
    if (activeTab === "blogs") {
      return (
        <div>
          <button className="btn-primary-admin" onClick={openAddModal}>
            + Add Blog
          </button>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <strong>{b.title}</strong>
                    </td>
                    <td>{b.category}</td>
                    <td>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          backgroundColor:
                            b.status === "published"
                              ? "#d4edda"
                              : b.status === "draft"
                                ? "#fff3cd"
                                : "#f8d7da",
                          color:
                            b.status === "published"
                              ? "#155724"
                              : b.status === "draft"
                                ? "#856404"
                                : "#721c24",
                        }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEditModal(b)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(b._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <Modal
              title={modalType === "add" ? "Add Blog" : "Edit Blog"}
              onSave={handleSave}
              onClose={() => setIsModalOpen(false)}
            >
              <Field
                label="Blog Title"
                name="title"
                defaultValue={currentItem?.title}
                required
              />
              <SelectField
                label="Category"
                name="category"
                defaultValue={currentItem?.category}
                options={[
                  "Industry Trends",
                  "Technical Guide",
                  "Regulatory Update",
                  "Company News",
                ]}
                required
              />
              <SelectField
                label="Status"
                name="status"
                defaultValue={currentItem?.status || "draft"}
                options={["draft", "published", "archived"]}
                required
              />
              <Field
                label="Cover Image URL (Optional - will be overridden if you upload)"
                name="coverImage"
                defaultValue={currentItem?.coverImage}
              />
              <div className="form-group">
                <label>Upload Blog Image (to MinIO)</label>
                <input type="file" id="modalFileInput" accept="image/*" />
              </div>
              <Field
                label="Excerpt"
                name="excerpt"
                defaultValue={currentItem?.excerpt}
              />
              <TextAreaField
                label="Content"
                name="content"
                defaultValue={currentItem?.content}
                required
                rows={8}
              />
            </Modal>
          )}
        </div>
      );
    }
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="admin-logo">
          <i className="fas fa-cube"></i> CREST Admin
        </div>
        <ul className="admin-menu">
          {[
            "products",
            "packaging",
            "catalogue",
            "events",
            "enquiries",
            "blogs",
          ].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
            >
              <i
                className={`fas fa-${tab === "products" ? "box" : tab === "packaging" ? "box-open" : tab === "catalogue" ? "file-pdf" : tab === "events" ? "calendar-alt" : tab === "blogs" ? "blog" : "envelope"}`}
              ></i>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <button
              className="menu-toggle-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <h2>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>
          <div className="admin-user">
            <span>
              <i className="fas fa-user-circle"></i> Admin
            </span>
            <button onClick={onLogout}>Logout</button>
          </div>
        </header>
        <div className="admin-content">{renderContent()}</div>
      </main>
    </div>
  );
}

export default AdminDashboard;
