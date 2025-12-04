import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
    
const NavDetailProject = ({theme, toggleTheme}) => {
    return(
        <nav class="navbar navbar-expand-lg fixed-top shadow-sm py-3">
            <div class="container">
                <Link class="navbar-brand text-primary fw-bold" to="/">DEV<span class="text-body">FOLIO.</span></Link>
                <button 
                    onClick={toggleTheme} 
                    className={`btn btn-outline-secondary rounded-circle border-0 ${theme === 'dark' ? 'text-white' : ''}`}
                >
                    <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
            </div>
        </nav>
    )    
}

export default NavDetailProject;