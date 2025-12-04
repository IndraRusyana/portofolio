import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import DetailProject from './pages/DetailProject';

function App() {
  return (
      <Routes>
        {/* Halaman Public */}
        <Route path="/" element={<Home />} /> 
        <Route path="/projects/:id" element={<DetailProject />} />
        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />
        {/* Halaman Admin (Dashboard) */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add" element={<AddProject />} />
        <Route path="/admin/edit/:id" element={<EditProject />} />
      </Routes>
  );
}

export default App;