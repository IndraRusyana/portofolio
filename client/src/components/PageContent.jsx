import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const PageContent = ({ theme, toggleTheme }) => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    // Cek apakah user sudah login saat halaman dimuat
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        navigate('/login'); // Tendang ke login jika tidak ada token
        } else {
        fetchProjects();
        }
    }, []);

    const fetchProjects = async () => {
        try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/projects`);
        setProjects(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Yakin ingin menghapus project ini?")) {
        try {
            const token = localStorage.getItem('token');
            // PENTING: Kirim token di header
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.delete(`${apiUrl}/api/projects/${id}`, {
            headers: { token: token }
            });
            // Refresh data setelah hapus
            fetchProjects(); 
        } catch (error) {
            alert("Gagal menghapus project (Mungkin token expired)");
            console.error(error);
        }
        }
    };  

    const getImageSrc = (url) => {
        if (!url) return '/placeholder.jpg'; // Gambar default jika kosong
        
        // Jika URL dimulai dengan 'http', berarti itu Absolute URL (S3 atau Localhost Backend)
        if (url.startsWith('http')) {
            return url;
        }
        
        // Jika tidak (Data lama/relative path), tambahkan Base URL Backend
        return `${import.meta.env.VITE_API_URL}${url}`;
    };

    return (
        <div id="page-content-wrapper">
        
        <nav className="navbar navbar-custom shadow-sm rounded-3 mb-4 px-3 d-flex justify-content-between align-items-center">
            
            <h4 className="mb-0 fw-bold">Dashboard Overview</h4>
            
            <div className="d-flex align-items-center gap-3">
                <button 
                        className="btn btn-outline-secondary rounded-circle" 
                        onClick={toggleTheme} 
                        title="Toggle Dark Mode"
                    >
                        {/* Ubah Icon sesuai tema */}
                        <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>

                <Link to="/admin/add" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i> New Project
                </Link>
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D6EFD&color=fff" className="rounded-circle" width="40" />
            </div>
        </nav>

        <div className="row g-3 mb-4">
            <div className="col-md-4">
                <div className="card stat-card p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted small mb-1">Total Projects</p>
                            <h3 className="fw-bold mb-0">12</h3>
                        </div>
                        <div className="icon-box bg-primary bg-opacity-10 text-primary">
                            <i className="fas fa-folder-open"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card stat-card p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted small mb-1">Total Views</p>
                            <h3 className="fw-bold mb-0">2.4k</h3>
                        </div>
                        <div className="icon-box bg-success bg-opacity-10 text-success">
                            <i className="fas fa-eye"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card stat-card p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted small mb-1">Tech Stack</p>
                            <h3 className="fw-bold mb-0">8</h3>
                        </div>
                        <div className="icon-box bg-warning bg-opacity-10 text-warning">
                            <i className="fas fa-code"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="card table-card">
            <div className="card-header py-3 bg-transparent border-bottom">
                <h5 className="mb-0 fw-bold">Recent Projects</h5>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4">Project Info</th>
                                <th>Tech Stack</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                            <tr key={project.id}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                        <img 
                                            src={getImageSrc(project.image_url)} 
                                            className="project-img me-3" 
                                            alt="Project" 
                                        />
                                        <div>
                                            <h6 className="mb-0 fw-bold">{project.title}</h6>
                                            <small className="text-muted">ID: {project.id}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {Array.isArray(project.tech_stack) && project.tech_stack.map((t, i) => (
                                            <span key={i} className="badge bg-primary bg-opacity-10 text-primary me-1">{t}</span>
                                    ))}
                                </td>
                                <td><span className="badge bg-success rounded-pill px-3">Live</span></td>
                                <td className="text-end pe-4">
                                    <Link to={`/admin/edit/${project.id}`} className="btn btn-sm btn-outline-secondary me-1">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(project.id)} 
                                        className="btn btn-sm btn-outline-danger">
                                            <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
    );
};

export default PageContent;
