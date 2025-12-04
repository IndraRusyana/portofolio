import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  // 1. State untuk menyimpan ID section yang sedang aktif
  const [activeSection, setActiveSection] = useState('home');

  // 2. useEffect untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Daftar ID section yang ada di halaman kamu
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];

      // Ambil posisi scroll saat ini + sedikit offset (misal 200px) 
      // agar aktif sedikit sebelum mencapai garis paling atas
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const element = document.getElementById(section);

        // Pastikan elemen ditemukan di DOM
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          // Cek apakah scroll kita berada di dalam area section tersebut
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    // Pasang event listener saat komponen dimuat
    window.addEventListener('scroll', handleScroll);

    // Bersihkan event listener saat komponen dilepas (unmount)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper function untuk menentukan class active
  const getNavLinkClass = (sectionName) => {
    return `nav-link ${activeSection === sectionName ? 'active fw-bold text-primary' : ''}`;
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top shadow-sm py-3 transition-colors ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold" to="/" style={{ color: '#6610f2' }}>
          DEV<span className={theme === 'dark' ? 'text-white' : 'text-dark'}>FOLIO.</span>
        </Link>

        {/* Tombol Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <a
                className={getNavLinkClass('home')}
                href="#home"
                onClick={() => setActiveSection('home')} // Agar langsung aktif saat diklik
              >
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className={getNavLinkClass('about')}
                href="#about"
                onClick={() => setActiveSection('about')}
              >
                Tentang
              </a>
            </li>

            <li className="nav-item">
              <a
                className={getNavLinkClass('projects')}
                href="#projects"
                onClick={() => setActiveSection('projects')}
              >
                Projects
              </a>
            </li>

            <li className="nav-item">
              <a
                className={getNavLinkClass('skills')}
                href="#skills"
                onClick={() => setActiveSection('skills')}
              >
                Tools
              </a>
            </li>

            {/* Tombol Theme */}
            <li className="nav-item ms-lg-3">
              <button
                onClick={toggleTheme}
                className={`btn btn-outline-secondary rounded-circle border-0 ${theme === 'dark' ? 'text-white' : ''}`}
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </li>

            {/* Tombol Contact */}
            <li className="nav-item">
              <a className="btn btn-primary text-white ms-lg-3 rounded-pill btn-contact-nav" href="#contact" style={{ borderColor: '#6610f2' }}>
                Hubungi Saya
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;