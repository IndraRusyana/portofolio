import React, { useState } from 'react';

const About = () => {
    // 1. Definisikan Data Offer
    const offers = [
        {
            id: 1,
            title: "Frontend",
            icon: "fa-laptop-code",
            desc: "Creating responsive and interactive UIs using React & Bootstrap with a focus on user experience."
        },
        {
            id: 2,
            title: "Fullstack",
            icon: "fa-layer-group",
            desc: "Bridging the gap between frontend and backend. Integrating APIs, databases, and DevOps."
        },
        {
            id: 3,
            title: "Backend",
            icon: "fa-server",
            desc: "Robust server-side logic using Node.js & Laravel. Secure database management with PostgreSQL."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(1);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % offers.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length);
    };

    return (
        <section id="about" className="offer-section py-5">
            <div className="container p-5">
                
                {/* --- HEADER --- */}
                <div className="text-center mb-5 pb-3">
                    <h6 className="text-secondary text-uppercase ls-2 mb-2">What Do I Offer</h6>
                    <h2 className="fw-bold display-5 mb-4 section-title">
                        Building Scalable Solutions <br className="d-none d-lg-block"/> Oriented Towards Business Growth
                    </h2>
                    <div className="purple-line mx-auto rounded-pill"></div>
                </div>

                {/* --- CARDS SECTION --- */}
                {/* Tambahkan min-height agar tidak 'melompat' saat ganti kartu di mobile */}
                <div className="row g-4 justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    
                    {offers.map((offer, index) => {
                        const isActive = index === activeIndex;

                        // LOGIC RESPONSIVE:
                        // Jika Active: Tampil di semua layar (col-12) dan desktop (col-lg-4)
                        // Jika Tidak Active: Sembunyi di mobile (d-none), Tampil di desktop (d-lg-block)
                        const visibilityClass = isActive ? 'col-12 col-lg-4 d-block' : 'col-lg-4 d-none d-lg-block';

                        return (
                            <div className={visibilityClass} key={offer.id}>
                                <div 
                                    className={`offer-card p-4 rounded-4 text-center position-relative ${isActive ? 'active shadow-lg p-5' : ''}`}
                                    onClick={() => setActiveIndex(index)}
                                    // Style transition agar animasi smooth
                                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                >
                                    {isActive && <div className="glow-effect"></div>}
                                    
                                    <div className="icon-wrapper mb-4 mx-auto">
                                        <i className={`fas ${offer.icon} ${isActive ? 'fa-4x text-white' : 'fa-3x text-gradient-purple'}`}></i>
                                    </div>
                                    
                                    <h4 className={`fw-bold mb-3 ${isActive ? 'text-white' : ''}`}>
                                        {offer.title}
                                    </h4>
                                    
                                    <p className={`small ${isActive ? 'text-white-50' : 'text-muted'}`}>
                                        {offer.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* --- PAGINATION --- */}
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                    <button className="btn btn-link text-secondary p-2 border-0" onClick={handlePrev}>
                         <i className="fas fa-chevron-left"></i>
                    </button>

                    <div className="d-flex gap-2">
                        {offers.map((_, index) => (
                            <div 
                                key={index}
                                className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                                style={{ cursor: 'pointer' }}
                            ></div>
                        ))}
                    </div>

                    <button className="btn btn-link text-secondary p-2 border-0" onClick={handleNext}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default About;