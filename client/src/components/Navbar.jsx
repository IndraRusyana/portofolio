import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');

  // --- LOGIC SCROLL (Sama seperti sebelumnya, sudah bagus) ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      // Offset disesuaikan agar highlight pindah pas di tengah layar atau sedikit di atas
      const scrollPosition = window.scrollY + 150; 

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- HELPER CLASS (Diperbaiki) ---
  // Kita pakai class custom 'active-link' yang sudah dibuat di CSS
  const getNavLinkClass = (sectionName) => {
    return `nav-link px-3 ${activeSection === sectionName ? 'active-link' : ''}`;
  };

  return (
    // HAPUS 'bg-dark/bg-light'. Gunakan 'navbar' saja agar CSS Glass Effect bekerja.
    // Gunakan 'navbar-expand-lg' standard.
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm py-3 transition-colors">
      <div className="container">
        
        {/* Logo - Gunakan text-primary (ungu) dari Bootstrap */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          DEV<span>FOLIO.</span>
        </Link>

        {/* Toggler Mobile */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
           {/* Icon toggler manual agar warnanya ikut tema text-body */}
           <i className="fas fa-bars fa-lg text-body"></i>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {['home', 'about', 'projects', 'skills'].map((item) => (
               <li className="nav-item" key={item}>
                 <a
                   className={getNavLinkClass(item)}
                   href={`#${item}`}
                   // Capitalize huruf pertama
                   onClick={() => setActiveSection(item)}
                 >
                   {item.charAt(0).toUpperCase() + item.slice(1)}
                 </a>
               </li>
            ))}

            {/* Tombol Theme */}
            <li className="nav-item ms-lg-2">
              <button
                onClick={toggleTheme}
                className="btn btn-link text-body text-decoration-none rounded-circle"
                style={{ width: '40px', height: '40px' }}
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </li>

            {/* Tombol Contact */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a className="btn btn-primary text-white rounded-pill px-4 btn-contact-nav" href="#contact">
                Contact Me
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;