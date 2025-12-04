import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import Components
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Project from '../components/Projects';
import Skill from '../components/Skills';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar'; // Import Navbar yg dibuat tadi
import Footer from '../components/Footer';

// Import CSS
import '../Home.css';

const Home = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const { hash } = useLocation(); // Ambil hash dari URL (misal: #projects)

  useEffect(() => {
    // Jika ada hash di URL (contoh: #projects)
    if (hash) {
      // Cari elemen dengan ID tersebut (hapus tanda #)
      const element = document.getElementById(hash.replace('#', ''));

      if (element) {
        // Scroll ke elemen tersebut dengan mulus
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Opsional: Jika tidak ada hash, scroll ke paling atas
      window.scrollTo(0, 0);
    }
  }, [hash]); // Jalankan setiap kali hash berubah
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HeroSection />
      <About />
      <Project />
      <Skill />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;