import React from "react";
import "../../styles/home.css";
import heroImg from "../../assets/images/bgimage2.jpg";

const Homepage = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h2>LearnFlow</h2>
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Courses</li>
          <li>
            <a href="/account/login" className="account-link">
              Account
            </a>
          </li>
          <li onClick={handleLogout} className="logout-btn">
            Logout
          </li>
        </ul>
      </nav>

      <section className="hero-section">
        <div className="overlay"></div>
        <img src={heroImg} alt="Graduation Celebration" className="hero-bg" />
        <div className="hero-content">
          <h1>
            A DAY TO <span>REMEMBER</span>
          </h1>
          <p className="subtitle">You Deserve This</p>
          <button className="cta-btn">Explore Courses</button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
