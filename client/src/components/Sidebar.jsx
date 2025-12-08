import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Terima props toggleSidebar
const Sidebar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };  

    // Fungsi kecil untuk menutup sidebar HANYA jika di mobile (lebar < 768)
    const handleMobileClick = () => {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    return (
    <div id="sidebar-wrapper">
        <div className="sidebar-heading">
            <i className="fas fa-layer-group me-2"></i> DevFolio<span className="text-primary">Admin</span>
            <button 
                className="btn btn-link text-white d-md-none btn-sm" 
                onClick={toggleSidebar}
            >
                <i className="fas fa-times fa-lg"></i>
            </button>
        </div>
        <div className="list-group list-group-flush mt-3">
            {/* Tambahkan onClick handleMobileClick di setiap Link */}
            
            <Link to="/admin" className="list-group-item list-group-item-action active" onClick={handleMobileClick}>
                <i className="fas fa-th-large me-3"></i> Dashboard
            </Link>
            
            <Link to="/admin/projects" className="list-group-item list-group-item-action" onClick={handleMobileClick}>
                <i className="fas fa-folder me-3"></i> Projects
            </Link>
            
            <Link to="#" className="list-group-item list-group-item-action" onClick={handleMobileClick}>
                <i className="fas fa-envelope me-3"></i> Messages
                <span className="badge bg-danger rounded-pill float-end">3</span>
            </Link>
            
            <button onClick={handleLogout} className="list-group-item list-group-item-action mt-5 text-danger bg-transparent border-0 text-start w-100">
                <i className="fas fa-sign-out-alt me-3"></i> Logout
            </button>
        </div>
    </div>
    );
};

export default Sidebar;