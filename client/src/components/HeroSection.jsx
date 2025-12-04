import React from 'react';
// Pastikan path gambar benar
import myProfilePic from '../assets/images/WhatsApp Image 2024-12-27 at 07.11.05.jpeg';

const HeroSection = () => {
    return (
    <section id="home" className="hero-section min-vh-100 d-flex align-items-center">
        <div className="container">
            <div className="row align-items-center flex-column-reverse flex-lg-row">
                
                {/* --- TEKS (KIRI) --- */}
                <div className="col-lg-7 mt-5 mt-lg-0 pe-lg-5">
                    
                    {/* Sub-heading kecil & Rapi */}
                    <h6 className="text-secondary text-uppercase ls-2 mb-3 d-flex align-items-center gap-2">
                        <span className="line-dec"></span> Hello, I am
                    </h6>

                    {/* Nama dengan Gradient */}
                    <h1 className="display-3 fw-bold mb-3 lh-1">
                        <span className="text-body">Indra Rusyana</span>
                    </h1>

                    {/* Deskripsi - Diperbaiki Readability-nya */}
                    <div className="hero-description text-muted lh-lg mb-5">
                        <p className="mb-3 text-justify">
                            Building upon a deep mastery of <strong className="text-body">Laravel</strong> across various fullstack projects, 
                            I prioritize clean and maintainable code structures above all else. For me, 
                            code quality is the key to application sustainability. I never stop evolving, currently challenging myself with the modern stack 
                            (React, Node.js, Express, PostgreSQL). 
                            My skillset extends to operations, deploying applications from standard hosting to Cloud services like 
                            <strong className="text-body"> AWS and GCP</strong>.
                        </p>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="d-flex gap-3">
                        <a href="#projects" className="btn btn-primary text-white px-4 btn-projects" style={{ borderColor: '#6610f2'}}>
                            See Projects
                        </a>
                        <a href="#contact" className="btn btn-outline-secondary btn-contact px-4">
                            Contact Me
                        </a>
                    </div>

                </div>

                {/* --- GAMBAR (KANAN) --- */}
                <div className="col-lg-5 text-center position-relative">
                    {/* Blob Shape Background (Opsional, untuk estetika modern) */}
                    <div className="hero-blob"></div>
                    
                    <img 
                        src={myProfilePic} 
                        alt="Indra Rusyana" 
                        className="img-fluid hero-avatar position-relative z-2 rounded-4 shadow" 
                        style={{ maxWidth: '50%' }}
                    />
                </div>

            </div>
        </div>
    </section>
    );
};

export default HeroSection;