import React from 'react';

const Contact = () => {
    return (
    <>
        <section id="contact" className="py-5">
        <div className="container py-5">
            <div className="row justify-content-center text-center mb-5">
                <div className="col-lg-6">
                    <h6 className="fw-bold text-uppercase" style={{color:'#6610f2'}}>Kontak</h6>
                    <h2 className="fw-bold display-6 mb-3">Mari Bekerja Sama</h2>
                    <p className="text-muted">Tertarik untuk berkolaborasi atau punya pertanyaan seputar project? Jangan ragu untuk menghubungi saya.</p>
                </div>
            </div>

            <div className="row justify-content-center g-4">
                <div className="col-md-4 col-lg-3">
                    <a href="mailto:indrarusyana@gmail.com" className="text-decoration-none">
                        <div className="card h-100 border-0 shadow-sm text-center py-4 contact-card">
                            <div className="card-body">
                                <div className="contact-icon mx-auto">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <h5 className="fw-bold text-body">Email</h5>
                                <p className="text-muted small mb-0">indrarusyana@gmail.com</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-md-4 col-lg-3">
                    <a href="https://www.linkedin.com/in/indra-rusyana-89b8441b2/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <div className="card h-100 border-0 shadow-sm text-center py-4 contact-card">
                            <div className="card-body">
                                <div className="contact-icon mx-auto">
                                    <i className="fab fa-linkedin-in"></i>
                                </div>
                                <h5 className="fw-bold text-body">LinkedIn</h5>
                                <p className="text-muted small mb-0">Indra Rusyana</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-md-4 col-lg-3">
                    <a href="http://github.com/IndraRusyana/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <div className="card h-100 border-0 shadow-sm text-center py-4 contact-card">
                            <div className="card-body">
                                <div className="contact-icon mx-auto">
                                    <i className="fab fa-github"></i>
                                </div>
                                <h5 className="fw-bold text-body">GitHub</h5>
                                <p className="text-muted small mb-0">Lihat Source Code</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
    </>
    );
};

export default Contact;
