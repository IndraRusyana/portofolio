import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import PageContent from '../components/PageContent';
import '../Dashboard.css';

const Dashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // 1. STATE UNTUK SIDEBAR
  // Default false (tertutup) jika di mobile agar rapi, tapi logic CSS kita mengatur default CSS-nya.
  // Kita gunakan state ini untuk menambah class 'toggled' di wrapper.
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 2. FUNGSI TOGGLE SIDEBAR
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  return (
    <>
    {/* 3. Tambahkan class 'toggled' berdasarkan state */}
    <div id="wrapper" className={isSidebarToggled ? 'toggled' : ''}>
        
        {/* Kirim fungsi toggle ke Sidebar (opsional, jika ingin tutup saat klik menu di HP) */}
        <Sidebar toggleSidebar={toggleSidebar} />
        
        {/* Kirim fungsi toggle ke PageContent (untuk tombol Hamburger) */}
        <PageContent 
            theme={theme} 
            toggleTheme={toggleTheme} 
            toggleSidebar={toggleSidebar} 
        />
    </div>
    </>
  );
};

export default Dashboard;