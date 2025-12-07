import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };  

    return (
    <div id="sidebar-wrapper">
        <div className="sidebar-heading">
            <i className="fas fa-layer-group me-2"></i> DevFolio<span className="text-primary">Admin</span>
        </div>
        <div className="list-group list-group-flush mt-3">
            <Link to="#" className="list-group-item list-group-item-action active">
                <i className="fas fa-th-large me-3"></i> Dashboard
            </Link>
            <Link to="#" className="list-group-item list-group-item-action">
                <i className="fas fa-folder me-3"></i> Projects
            </Link>
            <Link to="#" className="list-group-item list-group-item-action">
                <i className="fas fa-envelope me-3"></i> Messages
                <span className="badge bg-danger rounded-pill float-end">3</span>
            </Link>
            <button onClick={handleLogout} className="list-group-item list-group-item-action mt-5 text-danger">
                <i className="fas fa-sign-out-alt me-3"></i> Logout
            </button>
        </div>
    </div>
    );
};

export default Sidebar;
