// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import "../styles/Blog.css";

// // Dummy data (In a real app, fetch this based on the ID)
// const blogPosts = [
//   {
//     id: 1,
//     tag: "Industry Trends",
//     date: "May 16, 2025",
//     author: "Admin",
//     title: "Sustainable Chemistry: Building a Greener Future",
//     image: "/image4.jpg",
//     content: [
//       {
//         type: "p",
//         text: "The chemical industry is undergoing a massive transformation. Sustainable practices are no longer just an option but a necessity for modern laboratories and manufacturing units. ",
//       },
//       { type: "h2", text: "1. Understanding the Core Principles" },
//       {
//         type: "p",
//         text: "Green chemistry focuses on designing products and processes that minimize the use and generation of hazardous substances. It is about efficiency, safety, and environmental stewardship.",
//       },
//       { type: "h2", text: "2. Using Proper PPE" },
//       {
//         type: "p",
//         text: "Wear appropriate personal protective equipment including gloves, goggles, lab coat, and face shield when necessary.",
//       },
//       {
//         type: "ul",
//         items: [
//           "Reduce waste",
//           "Use renewable feedstocks",
//           "Design for energy efficiency",
//           "Prevent accidents",
//         ],
//       },
//       {
//         type: "p",
//         text: "By integrating these principles, we can create a safer and more sustainable future for generations to come.",
//       },
//     ],
//   },
// ];

// function BlogDetails() {
//   const { id } = useParams();
//   const post = blogPosts.find((p) => p.id === parseInt(id)) || blogPosts[0];

//   return (
//     <div className="container">
//       <div className="blog-details-layout">
//         {/* Main Content */}
//         <div className="blog-details-main">
//           <div className="blog-details-breadcrumb">
//             <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{" "}
//             <span>{post.title}</span>
//           </div>

//           <h1 className="blog-details-title">{post.title}</h1>
//           <div className="blog-details-meta">
//             <span>
//               <i className="far fa-user"></i> {post.author}
//             </span>
//             <span>
//               <i className="far fa-calendar-alt"></i> {post.date}
//             </span>
//             <span>
//               <i className="far fa-folder-open"></i> {post.tag}
//             </span>
//           </div>

//           <div className="blog-details-featured-image">
//             <img src={post.image} alt={post.title} />
//           </div>

//           <div className="blog-details-content">
//             {post.content.map((block, index) => {
//               if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
//               if (block.type === "ul")
//                 return (
//                   <ul key={index}>
//                     {block.items.map((item, i) => (
//                       <li key={i}>{item}</li>
//                     ))}
//                   </ul>
//                 );
//               return <p key={index}>{block.text}</p>;
//             })}
//           </div>

//           {/* Share Section */}
//           {/* <div className="blog-share-section">
//             <span>Sharing:</span>
//             <a href="#" className="share-btn">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="#" className="share-btn">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="#" className="share-btn">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//             <a href="#" className="share-btn">
//               <i className="fas fa-link"></i>
//             </a>
//           </div> */}
//         </div>

//         {/* Sidebar */}
//         <div className="blog-sidebar">
//           {/* Categories */}
//           <div className="sidebar-widget sidebar-categories">
//             <h3>Categories</h3>
//             <ul>
//               <li>Industry Trends</li>
//               <li>Technical Guides</li>
//               <li>Regulatory Updates</li>
//               <li>Company News</li>
//               <li>Research Insights</li>
//             </ul>
//           </div>

//           {/* Recent Posts */}
//           <div className="sidebar-widget">
//             <h3>Recent Posts</h3>
//             {blogPosts.map((item) => (
//               <Link
//                 to={`/blog/${item.id}`}
//                 key={item.id}
//                 style={{ textDecoration: "none" }}
//               >
//                 <div className="recent-post">
//                   <img src={item.image} alt={item.title} />
//                   <div className="recent-post-info">
//                     <h4>{item.title}</h4>
//                     <span>{item.date}</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {/* Download Resources */}
//           <div className="sidebar-widget">
//             <h3>Download Resources</h3>
//             <div className="download-resource-box">
//               <i className="fas fa-file-pdf"></i>
//               <h4>Lab Safety Guidelines</h4>
//               {/* <a href="#">Download PDF</a> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogDetails;
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import "../styles/Blog.css";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/dashboard/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (isLoading)
    return <div className="blog-details-loading">Loading article...</div>;
  if (!blog)
    return <div className="blog-details-loading">Article not found.</div>;

  return (
    <div className="container">
      <div className="blog-details-layout">
        <div className="blog-details-main">
          <div className="blog-details-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{" "}
            <span>{blog.title}</span>
          </div>
          <h1 className="blog-details-title">{blog.title}</h1>
          <div className="blog-details-meta">
            <span>
              <i className="far fa-user"></i> {blog.author || "Admin"}
            </span>
            <span>
              <i className="far fa-calendar-alt"></i>{" "}
              {new Date(blog.publishedAt).toLocaleDateString()}
            </span>
            <span>
              <i className="far fa-folder-open"></i> {blog.category}
            </span>
          </div>
          <div className="blog-details-featured-image">
            <img src={blog.coverImage || "/image20.jpg"} alt={blog.title} />
          </div>

          {/* Content is stored as HTML string */}
          <div
            className="blog-details-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="blog-share-section">
            <span>Sharing:</span>
            <a href="#" className="share-btn">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="share-btn">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="share-btn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="share-btn">
              <i className="fas fa-link"></i>
            </a>
          </div>
        </div>

        {/* Sidebar (Keep static as before, or fetch recent posts) */}
        <div className="blog-sidebar">
          <div className="sidebar-widget sidebar-categories">
            <h3>Categories</h3>
            <ul>
              <li>Industry Trends</li>
              <li>Technical Guides</li>
              <li>Regulatory Updates</li>
            </ul>
          </div>
          <div className="sidebar-widget">
            <h3>Download Resources</h3>
            <div className="download-resource-box">
              <i className="fas fa-file-pdf"></i>
              <h4>Lab Safety Guidelines</h4>
              <a href="#">Download PDF</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogDetails;
