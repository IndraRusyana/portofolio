import React, { useState } from 'react';

const About = () => {
    // 1. Definisikan Data Offer sebagai Array
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

    // 2. State untuk melacak kartu mana yang aktif (Default index 1 = Kartu Tengah/Fullstack)
    const [activeIndex, setActiveIndex] = useState(1);

    // 3. Logic untuk Tombol Next/Prev
    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % offers.length); // Loop kembali ke 0 jika sudah mentok
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length); // Loop ke akhir jika di 0
    };

    return (
        <section id="about" className="offer-section py-5">
            <div className="container py-5">
                
                {/* --- HEADER SECTION --- */}
                <div className="text-center mb-5 pb-3">
                    <h6 className="text-secondary text-uppercase ls-2 mb-2">What Do I Offer</h6>
                    <h2 className="fw-bold display-5 mb-4 section-title">
                        Building Scalable Solutions <br/> Oriented Towards Business Growth
                    </h2>
                    <div className="purple-line mx-auto rounded-pill"></div>
                </div>

                {/* --- CARDS SECTION (Mapping Data) --- */}
                <div className="row g-4 justify-content-center align-items-center">
                    
                    {offers.map((offer, index) => {
                        // Cek apakah kartu ini sedang aktif
                        const isActive = index === activeIndex;

                        return (
                            <div className="col-lg-4 col-md-6" key={offer.id}>
                                <div 
                                    className={`offer-card p-4 rounded-4 text-center position-relative ${isActive ? 'active shadow-lg p-5' : ''}`}
                                    onClick={() => setActiveIndex(index)} // Klik kartu untuk mengaktifkan
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* Efek Glow hanya jika Active */}
                                    {isActive && <div className="glow-effect"></div>}
                                    
                                    <div className="icon-wrapper mb-4 mx-auto">
                                        {/* Ubah warna icon: Putih jika Active, Gradient jika tidak */}
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

                {/* --- PAGINATION DOTS & ARROWS (Functional) --- */}
                <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
                    
                    {/* Tombol Kiri */}
                    <i 
                        className="fas fa-chevron-left text-secondary small cursor-pointer p-2" 
                        onClick={handlePrev}
                    ></i>

                    {/* Dots (Looping sesuai jumlah data) */}
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

                    {/* Tombol Kanan */}
                    <i 
                        className="fas fa-chevron-right text-secondary small cursor-pointer p-2" 
                        onClick={handleNext}
                    ></i>
                </div>

            </div>
        </section>
    );
};

export default About;