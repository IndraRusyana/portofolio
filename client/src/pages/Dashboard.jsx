import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Import Components
import Sidebar from '../components/Sidebar';
import PageContent from '../components/PageContent';

// Import CSS
import '../Dashboard.css';
// import '../Dashboard.js';

const Dashboard = () => {
  // Cek localStorage dulu agar saat refresh tema tidak kembali ke light
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Effect untuk update atribut HTML & LocalStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fungsi Toggle yang akan dikirim ke anak
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
    <div id="wrapper">
        <Sidebar />
        {/* KIRIM PROPS ke PageContent */}
        <PageContent theme={theme} toggleTheme={toggleTheme} />
    </div>
    </>
  );
};

export default Dashboard;